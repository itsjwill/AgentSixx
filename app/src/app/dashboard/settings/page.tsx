"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  User,
  Building2,
  Bot,
  Bell,
  Link2,
  CreditCard,
  Users,
  Shield,
  Settings,
  Check,
  AlertTriangle,
  Clock,
  FileText,
  Lock,
  Trash2,
  Download,
  Upload,
  Play,
  Pause,
  VolumeX,
  ChevronRight,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  Mail,
  MessageSquare,
  Calendar,
  Zap,
  Globe,
  Crown,
  Sparkles,
  TrendingUp,
  Phone,
  Mic,
  Target,
  Brain,
  X,
  Plus,
  MoreVertical,
  CheckCircle2,
  Info,
} from "lucide-react";

// Types
interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "manager" | "agent";
  avatar: string;
  status: "active" | "pending" | "inactive";
  lastActive?: string;
}

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "crm" | "calendar" | "lead_source" | "phone" | "automation";
  connected: boolean;
  lastSync?: string;
  status?: "healthy" | "warning" | "error";
}

interface Voice {
  id: string;
  name: string;
  gender: "male" | "female";
  accent: string;
  description: string;
  audioUrl: string;
  premium?: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "failed";
  description?: string;
}

// Mock Data
const mockVoices: Voice[] = [
  { id: "kate", name: "Kate", gender: "female", accent: "American", description: "Professional & Confident", audioUrl: "/voices/kate.mp3" },
  { id: "james", name: "James", gender: "male", accent: "American", description: "Warm & Trustworthy", audioUrl: "/voices/james.mp3" },
  { id: "lily", name: "Lily", gender: "female", accent: "American", description: "Friendly & Approachable", audioUrl: "/voices/lily.mp3" },
  { id: "michael", name: "Michael", gender: "male", accent: "British", description: "Sophisticated & Clear", audioUrl: "/voices/michael.mp3", premium: true },
  { id: "sophia", name: "Sophia", gender: "female", accent: "Australian", description: "Energetic & Engaging", audioUrl: "/voices/sophia.mp3", premium: true },
  { id: "custom", name: "Custom Clone", gender: "female", accent: "Your Voice", description: "Voice-cloned from your recordings", audioUrl: "/voices/custom.mp3", premium: true },
];

const mockTeamMembers: TeamMember[] = [
  { id: "1", name: "John Doe", email: "john@premierrealty.com", role: "owner", avatar: "JD", status: "active", lastActive: "Now" },
  { id: "2", name: "Sarah Mitchell", email: "sarah@premierrealty.com", role: "admin", avatar: "SM", status: "active", lastActive: "2h ago" },
  { id: "3", name: "Mike Johnson", email: "mike@premierrealty.com", role: "manager", avatar: "MJ", status: "active", lastActive: "1d ago" },
  { id: "4", name: "Emily Chen", email: "emily@premierrealty.com", role: "agent", avatar: "EC", status: "pending", lastActive: "Invited" },
];

const mockIntegrations: Integration[] = [
  { id: "fub", name: "Follow Up Boss", description: "Sync leads bidirectionally with FUB", icon: "FUB", category: "crm", connected: true, lastSync: "2 min ago", status: "healthy" },
  { id: "kvcore", name: "KVCore", description: "Native KVCore lead management", icon: "KV", category: "crm", connected: false },
  { id: "salesforce", name: "Salesforce", description: "Enterprise CRM integration", icon: "SF", category: "crm", connected: false },
  { id: "hubspot", name: "HubSpot", description: "Marketing & sales platform", icon: "HS", category: "crm", connected: true, lastSync: "15 min ago", status: "healthy" },
  { id: "gcal", name: "Google Calendar", description: "Auto-sync appointments", icon: "GC", category: "calendar", connected: true, lastSync: "Just now", status: "healthy" },
  { id: "outlook", name: "Outlook Calendar", description: "Microsoft calendar sync", icon: "OL", category: "calendar", connected: false },
  { id: "calendly", name: "Calendly", description: "Booking integration", icon: "CL", category: "calendar", connected: false },
  { id: "zillow", name: "Zillow", description: "Zillow Premier Agent leads", icon: "Z", category: "lead_source", connected: true, lastSync: "5 min ago", status: "healthy" },
  { id: "realtor", name: "Realtor.com", description: "Realtor.com lead import", icon: "R", category: "lead_source", connected: true, lastSync: "10 min ago", status: "warning" },
  { id: "facebook", name: "Facebook Lead Ads", description: "Import Facebook leads", icon: "f", category: "lead_source", connected: false },
  { id: "google", name: "Google Ads", description: "Google campaign leads", icon: "G", category: "lead_source", connected: false },
  { id: "twilio", name: "Twilio", description: "SMS & voice infrastructure", icon: "TW", category: "phone", connected: true, lastSync: "Active", status: "healthy" },
  { id: "zapier", name: "Zapier", description: "Connect 5,000+ apps", icon: "ZP", category: "automation", connected: false },
  { id: "make", name: "Make", description: "Advanced automation", icon: "MK", category: "automation", connected: false },
];

const mockInvoices: Invoice[] = [
  { id: "INV-2026-004", date: "Apr 1, 2026", amount: "$1,497.00", status: "paid" },
  { id: "INV-2026-003", date: "Mar 1, 2026", amount: "$1,497.00", status: "paid" },
  { id: "INV-2026-002", date: "Feb 1, 2026", amount: "$1,497.00", status: "paid" },
  { id: "INV-2026-001", date: "Jan 1, 2026", amount: "$4,997.00", status: "paid", description: "Setup + First Month" },
];

// Navigation tabs configuration
const settingsTabs = [
  { id: "profile", label: "Profile", icon: User, description: "Personal information" },
  { id: "account", label: "Account", icon: Settings, description: "Security & preferences" },
  { id: "ai-agent", label: "Agent", icon: Bot, description: "Voice & behavior" },
  { id: "notifications", label: "Notifications", icon: Bell, description: "Alerts & digests" },
  { id: "integrations", label: "Integrations", icon: Link2, description: "Connected apps" },
  { id: "billing", label: "Billing", icon: CreditCard, description: "Plans & invoices" },
  { id: "team", label: "Team", icon: Users, description: "Members & roles" },
  { id: "data-privacy", label: "Data & Privacy", icon: Shield, description: "Export & compliance" },
];

// Reusable Components
const ToggleSwitch = ({ enabled, onChange, size = "default" }: { enabled: boolean; onChange?: () => void; size?: "small" | "default" }) => {
  const sizes = {
    small: { track: "w-9 h-5", thumb: "w-3.5 h-3.5", translate: enabled ? "translate-x-4" : "translate-x-0.5" },
    default: { track: "w-11 h-6", thumb: "w-4 h-4", translate: enabled ? "translate-x-5" : "translate-x-1" },
  };
  const s = sizes[size];

  return (
    <button
      onClick={onChange}
      className={cn(
        "relative rounded-full transition-colors duration-200",
        s.track,
        enabled ? "bg-emerald-500" : "bg-zinc-700"
      )}
    >
      <span
        className={cn(
          "absolute top-1 rounded-full bg-white transition-transform duration-200",
          s.thumb,
          s.translate
        )}
      />
    </button>
  );
};

const SectionCard = ({
  title,
  description,
  children,
  badge,
  action,
  className
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={cn("p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-sm", className)}
  >
    <div className="flex items-start justify-between mb-6">
      <div>
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {badge}
        </div>
        {description && <p className="text-sm text-zinc-500 mt-1">{description}</p>}
      </div>
      {action}
    </div>
    {children}
  </motion.div>
);

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled,
  icon: Icon,
}: {
  label: string;
  type?: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  icon?: React.ElementType;
}) => (
  <div>
    <label className="block text-sm text-zinc-400 mb-2">{label}</label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "w-full px-4 py-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700/80 text-white text-sm",
          "focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50",
          "transition-all duration-200 placeholder:text-zinc-600",
          disabled && "opacity-50 cursor-not-allowed",
          Icon && "pl-10"
        )}
      />
    </div>
  </div>
);

const SelectField = ({
  label,
  value,
  onChange,
  options,
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  options: { value: string; label: string }[];
  icon?: React.ElementType;
}) => (
  <div>
    <label className="block text-sm text-zinc-400 mb-2">{label}</label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
      )}
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "w-full px-4 py-2.5 rounded-lg bg-zinc-800/80 border border-zinc-700/80 text-white text-sm appearance-none",
          "focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50",
          "transition-all duration-200 cursor-pointer",
          Icon && "pl-10"
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 rotate-90 pointer-events-none" />
    </div>
  </div>
);

const StatusBadge = ({ status, size = "default" }: { status: "healthy" | "warning" | "error" | "active" | "pending" | "inactive"; size?: "small" | "default" }) => {
  const configs = {
    healthy: { bg: "bg-emerald-500/10", text: "text-emerald-400", label: "Connected" },
    active: { bg: "bg-emerald-500/10", text: "text-emerald-400", label: "Active" },
    warning: { bg: "bg-amber-500/10", text: "text-amber-400", label: "Warning" },
    pending: { bg: "bg-cyan-500/10", text: "text-cyan-400", label: "Pending" },
    error: { bg: "bg-red-500/10", text: "text-red-400", label: "Error" },
    inactive: { bg: "bg-zinc-700", text: "text-zinc-400", label: "Inactive" },
  };
  const config = configs[status];

  return (
    <span className={cn(
      "px-2.5 py-1 rounded-full font-medium",
      config.bg,
      config.text,
      size === "small" ? "text-xs" : "text-xs"
    )}>
      {config.label}
    </span>
  );
};

const PrimaryButton = ({ children, onClick, disabled, variant = "primary", size = "default", className }: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "small" | "default" | "large";
  className?: string;
}) => {
  const variants = {
    primary: "bg-emerald-500 text-white hover:bg-emerald-400",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700",
    danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30",
    ghost: "text-zinc-400 hover:text-white hover:bg-zinc-800",
  };
  const sizes = {
    small: "px-3 py-1.5 text-xs",
    default: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-sm",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-lg font-medium transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </button>
  );
};

// Main Component
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@premierrealty.com",
    phone: "(602) 555-0123",
    company: "Premier Realty Group",
    licenseNumber: "SA12345678",
    serviceArea: "Phoenix Metro Area, Scottsdale, Tempe",
    timezone: "America/Phoenix",
  });

  // Voice ISA state
  const [agentSettings, setAgentSettings] = useState({
    voice: "kate",
    speed: "1.05",
    personality: "professional",
    responsiveness: "0.9",
    interruptionSensitivity: "0.8",
    voicemailDetection: "smart",
    maxCallDuration: "10",
  });

  // Notification state
  const [notifications, setNotifications] = useState({
    emailNewLead: true,
    emailAppointment: true,
    emailHotLead: true,
    emailCallCompleted: false,
    emailDailyDigest: true,
    emailWeeklyReport: true,
    smsHotLead: true,
    smsAppointment: true,
    smsCompliance: true,
    pushEnabled: true,
    pushHotLead: true,
    digestFrequency: "daily",
  });

  const toggleVoicePreview = (voiceId: string) => {
    if (playingVoice === voiceId) {
      setPlayingVoice(null);
    } else {
      setPlayingVoice(voiceId);
    }
  };

  const getRoleColor = (role: TeamMember["role"]) => {
    const colors = {
      owner: "bg-violet-500/10 text-violet-400",
      admin: "bg-cyan-500/10 text-cyan-400",
      manager: "bg-amber-500/10 text-amber-400",
      agent: "bg-zinc-700 text-zinc-400",
    };
    return colors[role];
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-zinc-500">Manage your account, autonomous agent, and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="sticky top-6 space-y-1">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200",
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive && "text-emerald-400")} />
                  <div className="flex-1 min-w-0">
                    <p className={cn("font-medium", isActive ? "text-emerald-400" : "text-white")}>{tab.label}</p>
                    <p className="text-xs text-zinc-500 truncate hidden lg:block">{tab.description}</p>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <>
                  {/* Avatar & Basic Info */}
                  <SectionCard title="Profile Information" description="Your personal and contact details">
                    <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                      <div className="relative group">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border-2 border-zinc-700 overflow-hidden">
                          <span className="text-3xl font-bold text-white">JD</span>
                        </div>
                        <button className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                          <Upload className="w-6 h-6 text-white" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-white font-semibold text-lg">{profile.firstName} {profile.lastName}</h4>
                        <p className="text-zinc-400 text-sm">{profile.company}</p>
                        <div className="flex items-center gap-2">
                          <PrimaryButton variant="secondary" size="small">
                            <Upload className="w-3.5 h-3.5 mr-1.5" />
                            Upload Photo
                          </PrimaryButton>
                          <PrimaryButton variant="ghost" size="small">Remove</PrimaryButton>
                        </div>
                        <p className="text-xs text-zinc-500">JPG, PNG or GIF. Max 5MB</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="First Name"
                        value={profile.firstName}
                        onChange={(v) => setProfile({ ...profile, firstName: v })}
                        icon={User}
                      />
                      <InputField
                        label="Last Name"
                        value={profile.lastName}
                        onChange={(v) => setProfile({ ...profile, lastName: v })}
                        icon={User}
                      />
                      <InputField
                        label="Email Address"
                        type="email"
                        value={profile.email}
                        onChange={(v) => setProfile({ ...profile, email: v })}
                        icon={Mail}
                      />
                      <InputField
                        label="Phone Number"
                        type="tel"
                        value={profile.phone}
                        onChange={(v) => setProfile({ ...profile, phone: v })}
                        icon={Phone}
                      />
                    </div>

                    <div className="mt-6 flex justify-end">
                      <PrimaryButton>Save Changes</PrimaryButton>
                    </div>
                  </SectionCard>

                  {/* Company Information */}
                  <SectionCard title="Company Information" description="Your brokerage and business details">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Company / Brokerage Name"
                        value={profile.company}
                        onChange={(v) => setProfile({ ...profile, company: v })}
                        icon={Building2}
                      />
                      <InputField
                        label="License Number"
                        value={profile.licenseNumber}
                        onChange={(v) => setProfile({ ...profile, licenseNumber: v })}
                        icon={FileText}
                      />
                      <div className="md:col-span-2">
                        <InputField
                          label="Service Area"
                          value={profile.serviceArea}
                          onChange={(v) => setProfile({ ...profile, serviceArea: v })}
                          icon={Globe}
                          placeholder="Enter cities, counties, or regions you serve"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <PrimaryButton>Save Changes</PrimaryButton>
                    </div>
                  </SectionCard>

                  {/* Time Zone */}
                  <SectionCard title="Time Zone" description="Used for scheduling and lead timezone detection">
                    <div className="max-w-md">
                      <SelectField
                        label="Your Time Zone"
                        value={profile.timezone}
                        onChange={(v) => setProfile({ ...profile, timezone: v })}
                        icon={Clock}
                        options={[
                          { value: "America/Phoenix", label: "America/Phoenix (MST)" },
                          { value: "America/Los_Angeles", label: "America/Los Angeles (PST)" },
                          { value: "America/Denver", label: "America/Denver (MST)" },
                          { value: "America/Chicago", label: "America/Chicago (CST)" },
                          { value: "America/New_York", label: "America/New York (EST)" },
                        ]}
                      />
                      <p className="mt-2 text-xs text-zinc-500 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5" />
                        All calls respect the lead&apos;s local timezone for TCPA compliance
                      </p>
                    </div>
                  </SectionCard>
                </>
              )}

              {/* Account Tab */}
              {activeTab === "account" && (
                <>
                  {/* Security Settings */}
                  <SectionCard title="Security" description="Password and authentication settings">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-zinc-700/50 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-zinc-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">Password</h4>
                            <p className="text-sm text-zinc-500">Last changed 30 days ago</p>
                          </div>
                        </div>
                        <PrimaryButton variant="secondary" size="small">Change Password</PrimaryButton>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-emerald-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                            <p className="text-sm text-zinc-500">Add an extra layer of security</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <StatusBadge status="active" />
                          <PrimaryButton variant="ghost" size="small">Configure</PrimaryButton>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-zinc-700/50 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-zinc-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">Session Timeout</h4>
                            <p className="text-sm text-zinc-500">Auto logout after inactivity</p>
                          </div>
                        </div>
                        <select className="px-3 py-1.5 rounded-lg bg-zinc-700 border border-zinc-600 text-white text-sm">
                          <option>30 minutes</option>
                          <option>1 hour</option>
                          <option>4 hours</option>
                          <option>8 hours</option>
                        </select>
                      </div>
                    </div>
                  </SectionCard>

                  {/* API Access */}
                  <SectionCard
                    title="API Access"
                    description="Manage API keys for external integrations"
                    badge={<span className="px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 text-xs">Developer</span>}
                  >
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-white font-medium">Production API Key</p>
                            <p className="text-xs text-zinc-500">Created Jan 15, 2026</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setShowApiKey(!showApiKey)}
                              className="p-2 rounded-lg hover:bg-zinc-700 transition-colors"
                            >
                              {showApiKey ? <EyeOff className="w-4 h-4 text-zinc-400" /> : <Eye className="w-4 h-4 text-zinc-400" />}
                            </button>
                            <button className="p-2 rounded-lg hover:bg-zinc-700 transition-colors">
                              <Copy className="w-4 h-4 text-zinc-400" />
                            </button>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-zinc-900/50 font-mono text-sm">
                          {showApiKey ? "sk_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6" : "sk_live_••••••••••••••••••••••••••••••••"}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <PrimaryButton variant="secondary" size="small">
                          <Plus className="w-3.5 h-3.5 mr-1.5" />
                          Create New Key
                        </PrimaryButton>
                        <PrimaryButton variant="danger" size="small">
                          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                          Regenerate
                        </PrimaryButton>
                      </div>

                      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />
                          <div>
                            <p className="text-sm text-white font-medium">Keep your API keys secure</p>
                            <p className="text-xs text-zinc-400 mt-1">
                              Never share your API keys in public repositories or client-side code.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SectionCard>

                  {/* Login Activity */}
                  <SectionCard title="Recent Login Activity" description="Monitor account access">
                    <div className="space-y-3">
                      {[
                        { device: "Chrome on MacOS", location: "Phoenix, AZ", time: "Now", current: true },
                        { device: "Safari on iPhone", location: "Phoenix, AZ", time: "2 hours ago", current: false },
                        { device: "Chrome on Windows", location: "Scottsdale, AZ", time: "Yesterday", current: false },
                      ].map((session, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-2 h-2 rounded-full",
                              session.current ? "bg-emerald-400" : "bg-zinc-600"
                            )} />
                            <div>
                              <p className="text-white text-sm">{session.device}</p>
                              <p className="text-xs text-zinc-500">{session.location} - {session.time}</p>
                            </div>
                          </div>
                          {session.current ? (
                            <span className="text-xs text-emerald-400">Current Session</span>
                          ) : (
                            <button className="text-xs text-red-400 hover:text-red-300">Revoke</button>
                          )}
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                </>
              )}

              {/* Voice ISA Tab */}
              {activeTab === "ai-agent" && (
                <>
                  {/* Voice Selection */}
                  <SectionCard
                    title="Voice Selection"
                    description="Choose the voice for your Voice ISA calling agent"
                    badge={<span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs">6 Voices</span>}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mockVoices.map((voice) => (
                        <motion.div
                          key={voice.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setAgentSettings({ ...agentSettings, voice: voice.id })}
                          className={cn(
                            "relative p-4 rounded-xl cursor-pointer transition-all duration-200",
                            agentSettings.voice === voice.id
                              ? "bg-emerald-500/10 border-2 border-emerald-500/50"
                              : "bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600"
                          )}
                        >
                          {voice.premium && (
                            <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 text-xs font-medium flex items-center gap-1">
                              <Crown className="w-3 h-3" /> Premium
                            </span>
                          )}
                          <div className="flex items-center gap-3 mb-3">
                            <div className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center",
                              voice.gender === "female" ? "bg-pink-500/10" : "bg-blue-500/10"
                            )}>
                              <Mic className={cn("w-6 h-6", voice.gender === "female" ? "text-pink-400" : "text-blue-400")} />
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{voice.name}</h4>
                              <p className="text-xs text-zinc-500">{voice.accent}</p>
                            </div>
                          </div>
                          <p className="text-sm text-zinc-400 mb-3">{voice.description}</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleVoicePreview(voice.id);
                            }}
                            className={cn(
                              "w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors",
                              playingVoice === voice.id
                                ? "bg-emerald-500 text-white"
                                : "bg-zinc-700/50 text-zinc-300 hover:bg-zinc-700"
                            )}
                          >
                            {playingVoice === voice.id ? (
                              <>
                                <Pause className="w-4 h-4" /> Playing...
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4" /> Preview
                              </>
                            )}
                          </button>
                          {agentSettings.voice === voice.id && (
                            <div className="absolute top-2 left-2">
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </SectionCard>

                  {/* Voice Settings */}
                  <SectionCard title="Voice Settings" description="Fine-tune how your autonomous agent speaks">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-zinc-400 mb-3">Speaking Speed</label>
                        <div className="space-y-2">
                          <input
                            type="range"
                            min="0.8"
                            max="1.2"
                            step="0.05"
                            value={agentSettings.speed}
                            onChange={(e) => setAgentSettings({ ...agentSettings, speed: e.target.value })}
                            className="w-full accent-emerald-500"
                          />
                          <div className="flex justify-between text-xs text-zinc-500">
                            <span>Slower</span>
                            <span className="text-white font-medium">{agentSettings.speed}x</span>
                            <span>Faster</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-zinc-400 mb-3">Responsiveness</label>
                        <div className="space-y-2">
                          <input
                            type="range"
                            min="0.5"
                            max="1.0"
                            step="0.1"
                            value={agentSettings.responsiveness}
                            onChange={(e) => setAgentSettings({ ...agentSettings, responsiveness: e.target.value })}
                            className="w-full accent-emerald-500"
                          />
                          <div className="flex justify-between text-xs text-zinc-500">
                            <span>Thoughtful</span>
                            <span className="text-white font-medium">{agentSettings.responsiveness}</span>
                            <span>Quick</span>
                          </div>
                        </div>
                      </div>

                      <SelectField
                        label="Personality / Tone"
                        value={agentSettings.personality}
                        onChange={(v) => setAgentSettings({ ...agentSettings, personality: v })}
                        icon={Brain}
                        options={[
                          { value: "professional", label: "Professional & Helpful" },
                          { value: "friendly", label: "Friendly & Casual" },
                          { value: "energetic", label: "Energetic & Enthusiastic" },
                          { value: "calm", label: "Calm & Reassuring" },
                        ]}
                      />

                      <SelectField
                        label="Max Call Duration"
                        value={agentSettings.maxCallDuration}
                        onChange={(v) => setAgentSettings({ ...agentSettings, maxCallDuration: v })}
                        icon={Clock}
                        options={[
                          { value: "5", label: "5 minutes" },
                          { value: "10", label: "10 minutes (Recommended)" },
                          { value: "15", label: "15 minutes" },
                          { value: "20", label: "20 minutes" },
                        ]}
                      />
                    </div>
                  </SectionCard>

                  {/* Voicemail Settings */}
                  <SectionCard
                    title="Voicemail Settings"
                    description="Configure voicemail detection and scripts"
                    badge={<span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs">6 Scripts Active</span>}
                  >
                    <div className="space-y-4">
                      <SelectField
                        label="Voicemail Detection"
                        value={agentSettings.voicemailDetection}
                        onChange={(v) => setAgentSettings({ ...agentSettings, voicemailDetection: v })}
                        icon={VolumeX}
                        options={[
                          { value: "smart", label: "Smart - Leave voicemail after 2nd attempt" },
                          { value: "always", label: "Always - Leave voicemail when detected" },
                          { value: "never", label: "Never - Hang up on voicemail" },
                        ]}
                      />

                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">Current Voicemail Script Preview</label>
                        <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                          <p className="text-sm text-zinc-300 italic leading-relaxed">
                            &quot;Hey {"{firstName}"}, this is {"{agentName}"} from {"{companyName}"}. I was hoping to connect with you about your property needs in the {"{serviceArea}"} area. I&apos;ll try you again soon, but feel free to call or text me back at this number. Talk soon!&quot;
                          </p>
                          <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500">
                            <span>Duration: ~15 seconds</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-600" />
                            <span>Variables: 4</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <PrimaryButton variant="secondary" className="flex-1">
                          <Play className="w-4 h-4 mr-2" />
                          Preview Audio
                        </PrimaryButton>
                        <PrimaryButton className="flex-1">
                          <FileText className="w-4 h-4 mr-2" />
                          Edit Scripts
                        </PrimaryButton>
                      </div>
                    </div>
                  </SectionCard>

                  {/* Objection Handling */}
                  <SectionCard
                    title="Objection Handling"
                    description="Configure how the Voice ISA responds to common objections"
                    badge={<span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs">13 Objections</span>}
                  >
                    <div className="space-y-3">
                      {[
                        { objection: "I'm not interested", response: "Acknowledge & soft close", enabled: true },
                        { objection: "I'm working with another agent", response: "Value differentiation", enabled: true },
                        { objection: "Just browsing", response: "Engagement question", enabled: true },
                        { objection: "Call me later", response: "Book callback", enabled: true },
                        { objection: "How did you get my number?", response: "Lead source explanation", enabled: true },
                        { objection: "Is this a real person?", response: "system disclosure", enabled: true },
                      ].map((item) => (
                        <div key={item.objection} className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                          <div className="flex-1">
                            <p className="text-white text-sm font-medium">&quot;{item.objection}&quot;</p>
                            <p className="text-xs text-zinc-500 mt-0.5">{item.response}</p>
                          </div>
                          <ToggleSwitch enabled={item.enabled} size="small" />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <PrimaryButton variant="secondary" size="small">
                        <Plus className="w-3.5 h-3.5 mr-1.5" />
                        Add Custom Objection
                      </PrimaryButton>
                    </div>
                  </SectionCard>
                </>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <>
                  {/* Email Notifications */}
                  <SectionCard title="Email Notifications" description="Control what emails you receive">
                    <div className="space-y-4">
                      {[
                        { key: "emailNewLead", label: "New Lead Alerts", description: "Get notified when a new lead comes in", icon: Target },
                        { key: "emailAppointment", label: "Appointment Booked", description: "Alert when the system books an appointment", icon: Calendar },
                        { key: "emailHotLead", label: "Hot Lead Alert", description: "Immediate notification for high-intent leads", icon: Sparkles },
                        { key: "emailCallCompleted", label: "Call Completed", description: "Summary after each call", icon: Phone },
                        { key: "emailDailyDigest", label: "Daily Digest", description: "Daily summary of all activity at 6 PM", icon: FileText },
                        { key: "emailWeeklyReport", label: "Weekly Report", description: "Weekly performance report every Monday", icon: TrendingUp },
                      ].map((item) => {
                        const Icon = item.icon;
                        const enabled = notifications[item.key as keyof typeof notifications] as boolean;
                        return (
                          <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-zinc-700/50 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-zinc-400" />
                              </div>
                              <div>
                                <h4 className="text-white font-medium">{item.label}</h4>
                                <p className="text-sm text-zinc-500">{item.description}</p>
                              </div>
                            </div>
                            <ToggleSwitch
                              enabled={enabled}
                              onChange={() => setNotifications({ ...notifications, [item.key]: !enabled })}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </SectionCard>

                  {/* SMS Notifications */}
                  <SectionCard title="SMS Notifications" description="Instant text alerts for critical events">
                    <div className="space-y-4">
                      {[
                        { key: "smsHotLead", label: "Hot Lead SMS", description: "Text alert for high-priority leads" },
                        { key: "smsAppointment", label: "Appointment Reminder", description: "Reminder 1 hour before appointments" },
                        { key: "smsCompliance", label: "Compliance Alerts", description: "Important compliance notifications" },
                      ].map((item) => {
                        const enabled = notifications[item.key as keyof typeof notifications] as boolean;
                        return (
                          <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-zinc-700/50 flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-zinc-400" />
                              </div>
                              <div>
                                <h4 className="text-white font-medium">{item.label}</h4>
                                <p className="text-sm text-zinc-500">{item.description}</p>
                              </div>
                            </div>
                            <ToggleSwitch
                              enabled={enabled}
                              onChange={() => setNotifications({ ...notifications, [item.key]: !enabled })}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </SectionCard>

                  {/* Push Notifications */}
                  <SectionCard title="Push Notifications" description="Browser and mobile push alerts">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                            <Bell className="w-5 h-5 text-emerald-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">Enable Push Notifications</h4>
                            <p className="text-sm text-zinc-500">Receive real-time alerts on this device</p>
                          </div>
                        </div>
                        <ToggleSwitch
                          enabled={notifications.pushEnabled}
                          onChange={() => setNotifications({ ...notifications, pushEnabled: !notifications.pushEnabled })}
                        />
                      </div>

                      {notifications.pushEnabled && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="pl-14"
                        >
                          <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/30">
                            <span className="text-sm text-zinc-300">Hot Lead Push Alerts</span>
                            <ToggleSwitch
                              enabled={notifications.pushHotLead}
                              onChange={() => setNotifications({ ...notifications, pushHotLead: !notifications.pushHotLead })}
                              size="small"
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </SectionCard>

                  {/* Digest Frequency */}
                  <SectionCard title="Digest Settings" description="Configure notification digest delivery">
                    <div className="max-w-md">
                      <SelectField
                        label="Digest Frequency"
                        value={notifications.digestFrequency}
                        onChange={(v) => setNotifications({ ...notifications, digestFrequency: v })}
                        icon={Clock}
                        options={[
                          { value: "realtime", label: "Real-time (No batching)" },
                          { value: "hourly", label: "Hourly Digest" },
                          { value: "daily", label: "Daily Digest (6 PM)" },
                          { value: "weekly", label: "Weekly Summary Only" },
                        ]}
                      />
                    </div>
                  </SectionCard>
                </>
              )}

              {/* Integrations Tab */}
              {activeTab === "integrations" && (
                <>
                  {/* Integration Status Overview */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                      { label: "Connected", value: mockIntegrations.filter(i => i.connected).length, color: "emerald" },
                      { label: "Available", value: mockIntegrations.filter(i => !i.connected).length, color: "zinc" },
                      { label: "Healthy", value: mockIntegrations.filter(i => i.status === "healthy").length, color: "cyan" },
                      { label: "Needs Attention", value: mockIntegrations.filter(i => i.status === "warning" || i.status === "error").length, color: "amber" },
                    ].map((stat) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                      >
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className={cn("text-sm", `text-${stat.color}-400`)}>{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* CRM Integrations */}
                  <SectionCard title="CRM Integrations" description="Connect your customer relationship management tools">
                    <div className="space-y-3">
                      {mockIntegrations.filter(i => i.category === "crm").map((integration, idx) => (
                        <motion.div
                          key={integration.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-zinc-700/50 flex items-center justify-center">
                              <span className="text-lg font-bold text-zinc-400">{integration.icon}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-white font-medium">{integration.name}</h4>
                                {integration.connected && integration.status && (
                                  <StatusBadge status={integration.status} size="small" />
                                )}
                              </div>
                              <p className="text-sm text-zinc-500">{integration.description}</p>
                              {integration.lastSync && (
                                <p className="text-xs text-zinc-600 mt-1">Last sync: {integration.lastSync}</p>
                              )}
                            </div>
                          </div>
                          <PrimaryButton
                            variant={integration.connected ? "secondary" : "primary"}
                            size="small"
                          >
                            {integration.connected ? "Configure" : "Connect"}
                          </PrimaryButton>
                        </motion.div>
                      ))}
                    </div>
                  </SectionCard>

                  {/* Calendar Integrations */}
                  <SectionCard title="Calendar Sync" description="Connect your calendar for appointment scheduling">
                    <div className="space-y-3">
                      {mockIntegrations.filter(i => i.category === "calendar").map((integration, idx) => (
                        <motion.div
                          key={integration.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-zinc-700/50 flex items-center justify-center">
                              <Calendar className="w-6 h-6 text-zinc-400" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-white font-medium">{integration.name}</h4>
                                {integration.connected && <StatusBadge status="healthy" size="small" />}
                              </div>
                              <p className="text-sm text-zinc-500">{integration.description}</p>
                            </div>
                          </div>
                          <PrimaryButton
                            variant={integration.connected ? "secondary" : "primary"}
                            size="small"
                          >
                            {integration.connected ? "Configure" : "Connect"}
                          </PrimaryButton>
                        </motion.div>
                      ))}
                    </div>
                  </SectionCard>

                  {/* Lead Source Integrations */}
                  <SectionCard title="Lead Sources" description="Import leads from advertising platforms">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {mockIntegrations.filter(i => i.category === "lead_source").map((integration, idx) => (
                        <motion.div
                          key={integration.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-zinc-700/50 flex items-center justify-center">
                              <span className="text-sm font-bold text-zinc-400">{integration.icon}</span>
                            </div>
                            <div>
                              <h4 className="text-white font-medium text-sm">{integration.name}</h4>
                              {integration.connected ? (
                                <p className="text-xs text-emerald-400">Connected</p>
                              ) : (
                                <p className="text-xs text-zinc-500">Not connected</p>
                              )}
                            </div>
                          </div>
                          <PrimaryButton
                            variant={integration.connected ? "ghost" : "secondary"}
                            size="small"
                          >
                            {integration.connected ? "Manage" : "Connect"}
                          </PrimaryButton>
                        </motion.div>
                      ))}
                    </div>
                  </SectionCard>

                  {/* Automation Integrations */}
                  <SectionCard title="Automation Platforms" description="Connect to automation tools">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {mockIntegrations.filter(i => i.category === "automation").map((integration) => (
                        <div
                          key={integration.id}
                          className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-zinc-700/50 flex items-center justify-center">
                              <Zap className="w-5 h-5 text-zinc-400" />
                            </div>
                            <div>
                              <h4 className="text-white font-medium text-sm">{integration.name}</h4>
                              <p className="text-xs text-zinc-500">{integration.description}</p>
                            </div>
                          </div>
                          <PrimaryButton variant="secondary" size="small">Connect</PrimaryButton>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                </>
              )}

              {/* Billing Tab */}
              {activeTab === "billing" && (
                <>
                  {/* Current Plan Banner */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-violet-500/10 border border-emerald-500/20"
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">Current Plan</span>
                          <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-400 text-xs font-medium flex items-center gap-1">
                            <Crown className="w-3 h-3" /> Pro
                          </span>
                        </div>
                        <h3 className="text-3xl font-bold text-white">$1,497<span className="text-lg text-zinc-400">/month</span></h3>
                        <p className="text-zinc-400 mt-1">2,000 Voice ISA Minutes included</p>
                      </div>

                      <div className="flex flex-col gap-3">
                        <PrimaryButton className="bg-white text-zinc-900 hover:bg-zinc-100">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Upgrade to Growth
                        </PrimaryButton>
                        <p className="text-xs text-zinc-500 text-center">Get 5,000 minutes + priority support</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Usage Meters */}
                  <SectionCard title="Current Usage" description="Your usage this billing cycle (resets May 1, 2026)">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-zinc-400">Voice Minutes</span>
                          <span className="text-sm text-white font-medium">847 / 2,000</span>
                        </div>
                        <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "42%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                          />
                        </div>
                        <p className="text-xs text-zinc-500 mt-1">42% used</p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-zinc-400">SMS Messages</span>
                          <span className="text-sm text-white font-medium">1,247 / 5,000</span>
                        </div>
                        <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "25%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
                          />
                        </div>
                        <p className="text-xs text-zinc-500 mt-1">25% used</p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-zinc-400">Leads Processed</span>
                          <span className="text-sm text-white font-medium">342 / Unlimited</span>
                        </div>
                        <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-violet-500 to-violet-400 rounded-full"
                          />
                        </div>
                        <p className="text-xs text-emerald-400 mt-1">Unlimited</p>
                      </div>
                    </div>
                  </SectionCard>

                  {/* Plan Comparison */}
                  <SectionCard title="Available Plans" description="Choose the plan that fits your needs">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          name: "Starter",
                          price: "$797",
                          minutes: "500",
                          features: ["Basic Voice ISA", "SMS Follow-up", "Email Support", "1 Team Member", "Basic Analytics"],
                          cta: "Downgrade"
                        },
                        {
                          name: "Pro",
                          price: "$1,497",
                          minutes: "2,000",
                          features: ["Advanced Voice ISA", "Priority Support", "CRM Integrations", "5 Team Members", "Advanced Analytics", "Custom Scripts"],
                          current: true,
                          cta: "Current Plan"
                        },
                        {
                          name: "Growth",
                          price: "$2,497",
                          minutes: "5,000",
                          features: ["Custom Voice Clone", "Dedicated Manager", "API Access", "Unlimited Team", "White-label Options", "Priority Queue"],
                          recommended: true,
                          cta: "Upgrade"
                        },
                      ].map((plan) => (
                        <motion.div
                          key={plan.name}
                          whileHover={{ scale: plan.current ? 1 : 1.02 }}
                          className={cn(
                            "relative p-6 rounded-xl border transition-all duration-200",
                            plan.current
                              ? "bg-emerald-500/10 border-emerald-500/30"
                              : plan.recommended
                                ? "bg-gradient-to-b from-violet-500/5 to-transparent border-violet-500/30"
                                : "bg-zinc-800/50 border-zinc-700/50"
                          )}
                        >
                          {plan.recommended && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-violet-500 text-white text-xs font-medium">
                              Recommended
                            </span>
                          )}
                          {plan.current && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-medium">
                              Current
                            </span>
                          )}

                          <h4 className="text-white font-semibold text-lg">{plan.name}</h4>
                          <p className="text-3xl font-bold text-white mt-2">
                            {plan.price}<span className="text-sm text-zinc-500">/mo</span>
                          </p>
                          <p className="text-sm text-zinc-500 mb-4">{plan.minutes} Voice ISA minutes</p>

                          <ul className="space-y-2 mb-6">
                            {plan.features.map((f) => (
                              <li key={f} className="text-sm text-zinc-400 flex items-center gap-2">
                                <Check className="w-4 h-4 text-emerald-400" /> {f}
                              </li>
                            ))}
                          </ul>

                          <PrimaryButton
                            variant={plan.current ? "secondary" : plan.recommended ? "primary" : "secondary"}
                            className="w-full"
                            disabled={plan.current}
                          >
                            {plan.cta}
                          </PrimaryButton>
                        </motion.div>
                      ))}
                    </div>
                  </SectionCard>

                  {/* Payment Method */}
                  <SectionCard title="Payment Method" description="Manage your payment information">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">VISA</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">Visa ending in 4242</p>
                          <p className="text-xs text-zinc-500">Expires 12/2027</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <PrimaryButton variant="ghost" size="small">Update</PrimaryButton>
                        <PrimaryButton variant="secondary" size="small">
                          <Plus className="w-3.5 h-3.5 mr-1" />
                          Add Card
                        </PrimaryButton>
                      </div>
                    </div>
                  </SectionCard>

                  {/* Invoice History */}
                  <SectionCard
                    title="Invoice History"
                    description="Download past invoices"
                    action={
                      <PrimaryButton variant="ghost" size="small">
                        <Download className="w-4 h-4 mr-1.5" />
                        Export All
                      </PrimaryButton>
                    }
                  >
                    <div className="space-y-2">
                      {mockInvoices.map((invoice) => (
                        <div key={invoice.id} className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600 transition-colors">
                          <div className="flex items-center gap-4">
                            <FileText className="w-5 h-5 text-zinc-500" />
                            <div>
                              <p className="text-white font-medium">{invoice.date}</p>
                              {invoice.description && (
                                <p className="text-xs text-zinc-500">{invoice.description}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-white font-medium">{invoice.amount}</span>
                            <StatusBadge status={invoice.status === "paid" ? "healthy" : invoice.status === "pending" ? "warning" : "error"} size="small" />
                            <button className="p-2 rounded-lg hover:bg-zinc-700 transition-colors">
                              <Download className="w-4 h-4 text-zinc-400" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                </>
              )}

              {/* Team Tab */}
              {activeTab === "team" && (
                <>
                  {/* Team Overview */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                      { label: "Total Members", value: mockTeamMembers.length, icon: Users },
                      { label: "Active", value: mockTeamMembers.filter(m => m.status === "active").length, icon: CheckCircle2 },
                      { label: "Pending Invites", value: mockTeamMembers.filter(m => m.status === "pending").length, icon: Clock },
                      { label: "Seats Available", value: 1, icon: Plus },
                    ].map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                        >
                          <Icon className="w-5 h-5 text-zinc-500 mb-2" />
                          <p className="text-2xl font-bold text-white">{stat.value}</p>
                          <p className="text-sm text-zinc-500">{stat.label}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Team Members List */}
                  <SectionCard
                    title="Team Members"
                    description="Manage your team and their permissions"
                    action={
                      <PrimaryButton size="small">
                        <Plus className="w-4 h-4 mr-1.5" />
                        Invite Member
                      </PrimaryButton>
                    }
                  >
                    <div className="space-y-3">
                      {mockTeamMembers.map((member, idx) => (
                        <motion.div
                          key={member.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                                <span className="text-sm font-bold text-white">{member.avatar}</span>
                              </div>
                              <div className={cn(
                                "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-zinc-800",
                                member.status === "active" ? "bg-emerald-400" : member.status === "pending" ? "bg-amber-400" : "bg-zinc-500"
                              )} />
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{member.name}</h4>
                              <p className="text-sm text-zinc-500">{member.email}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs text-zinc-500">{member.lastActive}</span>
                            <span className={cn(
                              "px-2.5 py-1 rounded-full text-xs font-medium capitalize",
                              getRoleColor(member.role)
                            )}>
                              {member.role}
                            </span>
                            <button className="p-2 rounded-lg hover:bg-zinc-700 transition-colors">
                              <MoreVertical className="w-4 h-4 text-zinc-400" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </SectionCard>

                  {/* Roles & Permissions */}
                  <SectionCard title="Roles & Permissions" description="Define what each role can access">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left border-b border-zinc-800">
                            <th className="pb-3 text-sm font-medium text-zinc-400">Permission</th>
                            <th className="pb-3 text-sm font-medium text-zinc-400 text-center">Owner</th>
                            <th className="pb-3 text-sm font-medium text-zinc-400 text-center">Admin</th>
                            <th className="pb-3 text-sm font-medium text-zinc-400 text-center">Manager</th>
                            <th className="pb-3 text-sm font-medium text-zinc-400 text-center">Agent</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {[
                            { permission: "View Dashboard", owner: true, admin: true, manager: true, agent: true },
                            { permission: "Manage Leads", owner: true, admin: true, manager: true, agent: true },
                            { permission: "View Reports", owner: true, admin: true, manager: true, agent: false },
                            { permission: "Manage Team", owner: true, admin: true, manager: false, agent: false },
                            { permission: "Configure Agent", owner: true, admin: true, manager: false, agent: false },
                            { permission: "Manage Billing", owner: true, admin: false, manager: false, agent: false },
                            { permission: "Delete Account", owner: true, admin: false, manager: false, agent: false },
                          ].map((row) => (
                            <tr key={row.permission} className="border-b border-zinc-800/50">
                              <td className="py-3 text-zinc-300">{row.permission}</td>
                              {["owner", "admin", "manager", "agent"].map((role) => (
                                <td key={role} className="py-3 text-center">
                                  {row[role as keyof typeof row] ? (
                                    <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                                  ) : (
                                    <X className="w-4 h-4 text-zinc-600 mx-auto" />
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </SectionCard>
                </>
              )}

              {/* Data & Privacy Tab */}
              {activeTab === "data-privacy" && (
                <>
                  {/* GDPR Status */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-emerald-500/20">
                        <Shield className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg">Privacy Compliance Active</h4>
                        <p className="text-sm text-zinc-400 mt-1">
                          Your account is fully GDPR, CCPA, and TCPA compliant. All consent records are being maintained.
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">GDPR Compliant</span>
                          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">CCPA Compliant</span>
                          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">TCPA Compliant</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Data Export */}
                  <SectionCard title="Export Your Data" description="Download a copy of all your data">
                    <div className="space-y-4">
                      <p className="text-sm text-zinc-400">
                        You can request a full export of your data at any time. This includes all leads, call recordings,
                        transcripts, and account information. The export will be prepared and sent to your email.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { label: "Leads & Contacts", icon: Users, description: "All lead data and contact info" },
                          { label: "Call Recordings", icon: Mic, description: "Audio files of all calls" },
                          { label: "Transcripts & Logs", icon: FileText, description: "Call transcripts and activity" },
                        ].map((item) => {
                          const Icon = item.icon;
                          return (
                            <div key={item.label} className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                              <Icon className="w-5 h-5 text-zinc-400 mb-2" />
                              <h4 className="text-white font-medium text-sm">{item.label}</h4>
                              <p className="text-xs text-zinc-500 mt-1">{item.description}</p>
                            </div>
                          );
                        })}
                      </div>

                      <PrimaryButton variant="secondary">
                        <Download className="w-4 h-4 mr-2" />
                        Request Data Export
                      </PrimaryButton>
                    </div>
                  </SectionCard>

                  {/* Consent Records */}
                  <SectionCard
                    title="Consent Records"
                    description="View and manage consent documentation"
                    action={
                      <PrimaryButton variant="ghost" size="small">
                        <Download className="w-4 h-4 mr-1.5" />
                        Export Records
                      </PrimaryButton>
                    }
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div className="p-4 rounded-xl bg-zinc-800/50 text-center">
                        <p className="text-2xl font-bold text-white">1,247</p>
                        <p className="text-xs text-zinc-500">Total Records</p>
                      </div>
                      <div className="p-4 rounded-xl bg-zinc-800/50 text-center">
                        <p className="text-2xl font-bold text-emerald-400">1,189</p>
                        <p className="text-xs text-zinc-500">Active Consents</p>
                      </div>
                      <div className="p-4 rounded-xl bg-zinc-800/50 text-center">
                        <p className="text-2xl font-bold text-red-400">58</p>
                        <p className="text-xs text-zinc-500">Revoked</p>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Records retained for 4 years per TCPA requirements
                    </p>
                  </SectionCard>

                  {/* Data Retention */}
                  <SectionCard title="Data Retention Settings" description="Configure how long data is stored">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                        <div>
                          <h4 className="text-white font-medium">Call Recordings</h4>
                          <p className="text-sm text-zinc-500">Audio files of all calls</p>
                        </div>
                        <select className="px-3 py-1.5 rounded-lg bg-zinc-700 border border-zinc-600 text-white text-sm">
                          <option>90 days</option>
                          <option>1 year</option>
                          <option>2 years</option>
                          <option>Forever</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                        <div>
                          <h4 className="text-white font-medium">Lead Data</h4>
                          <p className="text-sm text-zinc-500">Contact information and notes</p>
                        </div>
                        <select className="px-3 py-1.5 rounded-lg bg-zinc-700 border border-zinc-600 text-white text-sm">
                          <option>1 year</option>
                          <option>2 years</option>
                          <option>5 years</option>
                          <option>Forever</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                        <div>
                          <h4 className="text-white font-medium">Activity Logs</h4>
                          <p className="text-sm text-zinc-500">System and user activity</p>
                        </div>
                        <select className="px-3 py-1.5 rounded-lg bg-zinc-700 border border-zinc-600 text-white text-sm">
                          <option>30 days</option>
                          <option>90 days</option>
                          <option>1 year</option>
                        </select>
                      </div>
                    </div>
                  </SectionCard>

                  {/* Danger Zone */}
                  <SectionCard
                    title="Danger Zone"
                    description="Irreversible actions"
                    className="border-red-500/20"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                        <div>
                          <h4 className="text-white font-medium">Delete All Data</h4>
                          <p className="text-sm text-zinc-500">Permanently delete all leads, recordings, and history</p>
                        </div>
                        <PrimaryButton variant="danger" size="small">
                          <Trash2 className="w-4 h-4 mr-1.5" />
                          Delete Data
                        </PrimaryButton>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                        <div>
                          <h4 className="text-white font-medium">Delete Account</h4>
                          <p className="text-sm text-zinc-500">Permanently delete your account and all associated data</p>
                        </div>
                        <PrimaryButton variant="danger" size="small">
                          <Trash2 className="w-4 h-4 mr-1.5" />
                          Delete Account
                        </PrimaryButton>
                      </div>

                      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />
                          <div>
                            <p className="text-sm text-white font-medium">These actions cannot be undone</p>
                            <p className="text-xs text-zinc-400 mt-1">
                              Once you delete your account or data, there is no way to recover it.
                              Please export your data first if you need a backup.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SectionCard>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
