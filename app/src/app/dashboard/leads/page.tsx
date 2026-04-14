"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, type ComponentType } from "react";
import { cn } from "@/lib/utils";
import {
  Search,
  Plus,
  Download,
  Upload,
  MoreVertical,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  CheckCircle,
  DollarSign,
  Filter,
  ChevronRight,
  Star,
  MapPin,
  Activity,
  AlertCircle,
  Brain,
  Sparkles,
  Edit3,
  Trash2,
  RefreshCw,
  Check,
  ArrowUpRight,
  Flame,
  Thermometer,
  Snowflake,
  UserPlus,
  PhoneCall,
  FileSpreadsheet,
  Tag,
  ExternalLink,
  Globe,
  Handshake,
  Home,
  type LucideProps,
} from "lucide-react";

type LucideIcon = ComponentType<LucideProps>;

type LeadSourceIcon =
  | { type: "brand"; src: string; alt: string }
  | { type: "lucide"; Icon: LucideIcon };

// Lead source data with comprehensive metrics
const leadSources: Array<{
  id: string;
  name: string;
  icon: LeadSourceIcon;
  tileBg: string;
  textColor: string;
  borderColor: string;
  leads: number;
  leadsChange: number;
  costPerLead: number;
  conversionRate: number;
  revenueGenerated: number;
  roi: number;
  trend: string;
  avgResponseTime: string;
  qualityScore: number;
  bestPerforming: boolean;
}> = [
  {
    id: "zillow",
    name: "Zillow",
    icon: { type: "brand", src: "/brand-icons/zillow.svg", alt: "Zillow" },
    tileBg: "bg-white",
    textColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    leads: 247,
    leadsChange: +18,
    costPerLead: 42,
    conversionRate: 3.2,
    revenueGenerated: 312500,
    roi: 2.8,
    trend: "up",
    avgResponseTime: "4.2 hrs",
    qualityScore: 8.4,
    bestPerforming: false,
  },
  {
    id: "facebook",
    name: "Facebook Ads",
    icon: { type: "brand", src: "/brand-icons/facebook.svg", alt: "Facebook Ads" },
    tileBg: "bg-white",
    textColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    leads: 189,
    leadsChange: +24,
    costPerLead: 38,
    conversionRate: 2.6,
    revenueGenerated: 245000,
    roi: 3.4,
    trend: "up",
    avgResponseTime: "2.8 hrs",
    qualityScore: 7.2,
    bestPerforming: false,
  },
  {
    id: "realtor",
    name: "Realtor.com",
    icon: { type: "brand", src: "/brand-icons/realtor.png", alt: "Realtor.com" },
    tileBg: "bg-white",
    textColor: "text-red-400",
    borderColor: "border-red-500/30",
    leads: 156,
    leadsChange: +12,
    conversionRate: 3.8,
    costPerLead: 55,
    revenueGenerated: 285000,
    roi: 2.1,
    trend: "up",
    avgResponseTime: "5.1 hrs",
    qualityScore: 8.1,
    bestPerforming: false,
  },
  {
    id: "google",
    name: "Google Ads",
    icon: { type: "brand", src: "/brand-icons/googleads.svg", alt: "Google Ads" },
    tileBg: "bg-white",
    textColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    leads: 98,
    leadsChange: -5,
    costPerLead: 85,
    conversionRate: 2.0,
    revenueGenerated: 98000,
    roi: 0.9,
    trend: "down",
    avgResponseTime: "3.5 hrs",
    qualityScore: 6.5,
    bestPerforming: false,
  },
  {
    id: "website",
    name: "Website",
    icon: { type: "lucide", Icon: Globe },
    tileBg: "bg-gradient-to-br from-cyan-500 to-cyan-600",
    textColor: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    leads: 134,
    leadsChange: +8,
    costPerLead: 15,
    conversionRate: 5.2,
    revenueGenerated: 420000,
    roi: 12.5,
    trend: "up",
    avgResponseTime: "1.2 hrs",
    qualityScore: 9.2,
    bestPerforming: true,
  },
  {
    id: "referral",
    name: "Referral",
    icon: { type: "lucide", Icon: Handshake },
    tileBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    textColor: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    leads: 67,
    leadsChange: +3,
    costPerLead: 0,
    conversionRate: 17.9,
    revenueGenerated: 545000,
    roi: 999,
    trend: "up",
    avgResponseTime: "0.8 hrs",
    qualityScore: 9.8,
    bestPerforming: false,
  },
  {
    id: "coldcall",
    name: "Cold Call",
    icon: { type: "lucide", Icon: Phone },
    tileBg: "bg-gradient-to-br from-orange-500 to-orange-600",
    textColor: "text-orange-400",
    borderColor: "border-orange-500/30",
    leads: 82,
    leadsChange: +15,
    costPerLead: 28,
    conversionRate: 4.1,
    revenueGenerated: 178000,
    roi: 4.2,
    trend: "up",
    avgResponseTime: "0.5 hrs",
    qualityScore: 7.8,
    bestPerforming: false,
  },
  {
    id: "openhouse",
    name: "Open House",
    icon: { type: "lucide", Icon: Home },
    tileBg: "bg-gradient-to-br from-pink-500 to-pink-600",
    textColor: "text-pink-400",
    borderColor: "border-pink-500/30",
    leads: 45,
    leadsChange: +7,
    costPerLead: 120,
    conversionRate: 8.5,
    revenueGenerated: 225000,
    roi: 3.8,
    trend: "up",
    avgResponseTime: "2.0 hrs",
    qualityScore: 8.9,
    bestPerforming: false,
  },
];

// Pipeline stages with detailed metrics
const pipelineStages = [
  {
    id: "new",
    name: "New",
    count: 124,
    value: 45200000,
    color: "bg-zinc-500",
    textColor: "text-zinc-400",
    conversionToNext: 72,
    avgTimeInStage: "1.2 days",
  },
  {
    id: "contacted",
    name: "Contacted",
    count: 89,
    value: 32100000,
    color: "bg-blue-500",
    textColor: "text-blue-400",
    conversionToNext: 75,
    avgTimeInStage: "2.5 days",
  },
  {
    id: "qualified",
    name: "Qualified",
    count: 67,
    value: 28400000,
    color: "bg-cyan-500",
    textColor: "text-cyan-400",
    conversionToNext: 51,
    avgTimeInStage: "4.8 days",
  },
  {
    id: "showing",
    name: "Showing",
    count: 34,
    value: 15800000,
    color: "bg-violet-500",
    textColor: "text-violet-400",
    conversionToNext: 53,
    avgTimeInStage: "7.2 days",
  },
  {
    id: "offer",
    name: "Offer",
    count: 18,
    value: 8200000,
    color: "bg-amber-500",
    textColor: "text-amber-400",
    conversionToNext: 78,
    avgTimeInStage: "5.5 days",
  },
  {
    id: "negotiation",
    name: "Negotiation",
    count: 14,
    value: 6400000,
    color: "bg-orange-500",
    textColor: "text-orange-400",
    conversionToNext: 86,
    avgTimeInStage: "8.3 days",
  },
  {
    id: "closed",
    name: "Closed",
    count: 40,
    value: 18500000,
    color: "bg-emerald-500",
    textColor: "text-emerald-400",
    conversionToNext: 100,
    avgTimeInStage: "N/A",
  },
];

// Enhanced lead data with comprehensive fields
const leads = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(602) 555-0123",
    source: "Zillow",
    sourceId: "zillow",
    sourceIcon: "🏠",
    status: "hot",
    score: 92,
    aiProbability: 87,
    lastContact: "2 min ago",
    lastContactDate: new Date(Date.now() - 2 * 60000),
    nextAction: "Call scheduled 2:00 PM",
    nextActionDate: new Date(Date.now() + 3600000),
    timeline: "1-3 months",
    budget: "$350K-$450K",
    budgetMin: 350000,
    budgetMax: 450000,
    location: "Phoenix, AZ",
    zipCode: "85001",
    propertyType: "Single Family",
    notes: "First-time buyer, pre-approved for $400K. Very motivated. Looking for 3BR/2BA minimum.",
    tags: ["Pre-Approved", "First-Time Buyer", "Motivated"],
    activities: 12,
    calls: 3,
    emails: 5,
    sms: 4,
    stage: "Showing",
    assignedTo: "You",
    assignedAvatar: null,
    createdAt: new Date(Date.now() - 7 * 24 * 3600000),
    lastActivityType: "call",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(480) 555-0456",
    source: "Facebook Ads",
    sourceId: "facebook",
    sourceIcon: "📘",
    status: "warm",
    score: 74,
    aiProbability: 62,
    lastContact: "1 hour ago",
    lastContactDate: new Date(Date.now() - 3600000),
    nextAction: "Follow-up SMS #2",
    nextActionDate: new Date(Date.now() + 7200000),
    timeline: "3-6 months",
    budget: "$500K-$650K",
    budgetMin: 500000,
    budgetMax: 650000,
    location: "Scottsdale, AZ",
    zipCode: "85251",
    propertyType: "Single Family",
    notes: "Looking for 4BR in good school district. Has 2 kids. Prefers newer construction.",
    tags: ["School District", "Family", "New Construction"],
    activities: 8,
    calls: 2,
    emails: 3,
    sms: 3,
    stage: "Qualified",
    assignedTo: "You",
    assignedAvatar: null,
    createdAt: new Date(Date.now() - 14 * 24 * 3600000),
    lastActivityType: "email",
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike.wilson@email.com",
    phone: "(623) 555-0789",
    source: "Realtor.com",
    sourceId: "realtor",
    sourceIcon: "🔑",
    status: "hot",
    score: 88,
    aiProbability: 91,
    lastContact: "3 hours ago",
    lastContactDate: new Date(Date.now() - 3 * 3600000),
    nextAction: "Send contract",
    nextActionDate: new Date(Date.now() + 1800000),
    timeline: "Immediate",
    budget: "$275K-$325K",
    budgetMin: 275000,
    budgetMax: 325000,
    location: "Glendale, AZ",
    zipCode: "85301",
    propertyType: "Condo",
    notes: "Relocating for work, needs to close in 45 days. URGENT. Cash buyer.",
    tags: ["Relocation", "Urgent", "Cash Buyer"],
    activities: 15,
    calls: 5,
    emails: 6,
    sms: 4,
    stage: "Negotiation",
    assignedTo: "You",
    assignedAvatar: null,
    createdAt: new Date(Date.now() - 3 * 24 * 3600000),
    lastActivityType: "sms",
  },
  {
    id: 4,
    name: "Lisa Brown",
    email: "lisa.b@email.com",
    phone: "(520) 555-0321",
    source: "Website",
    sourceId: "website",
    sourceIcon: "🌐",
    status: "cold",
    score: 35,
    aiProbability: 18,
    lastContact: "2 days ago",
    lastContactDate: new Date(Date.now() - 2 * 24 * 3600000),
    nextAction: "Re-engagement campaign",
    nextActionDate: new Date(Date.now() + 24 * 3600000),
    timeline: "6+ months",
    budget: "$400K-$500K",
    budgetMin: 400000,
    budgetMax: 500000,
    location: "Tucson, AZ",
    zipCode: "85701",
    propertyType: "Single Family",
    notes: "Just browsing, not ready to commit. Check back in 3 months.",
    tags: ["Long-Term", "Browsing"],
    activities: 4,
    calls: 1,
    emails: 2,
    sms: 1,
    stage: "New",
    assignedTo: "You",
    assignedAvatar: null,
    createdAt: new Date(Date.now() - 21 * 24 * 3600000),
    lastActivityType: "email",
  },
  {
    id: 5,
    name: "David Lee",
    email: "david.lee@email.com",
    phone: "(928) 555-0654",
    source: "Referral",
    sourceId: "referral",
    sourceIcon: "🤝",
    status: "hot",
    score: 95,
    aiProbability: 94,
    lastContact: "5 hours ago",
    lastContactDate: new Date(Date.now() - 5 * 3600000),
    nextAction: "Property showing tomorrow",
    nextActionDate: new Date(Date.now() + 18 * 3600000),
    timeline: "1-3 months",
    budget: "$600K+",
    budgetMin: 600000,
    budgetMax: 1000000,
    location: "Paradise Valley, AZ",
    zipCode: "85253",
    propertyType: "Luxury",
    notes: "Investor looking for rental properties. Has cash ready. Repeat buyer - 3rd property.",
    tags: ["Investor", "Cash Ready", "Repeat Buyer", "Luxury"],
    activities: 18,
    calls: 6,
    emails: 7,
    sms: 5,
    stage: "Showing",
    assignedTo: "You",
    assignedAvatar: null,
    createdAt: new Date(Date.now() - 5 * 24 * 3600000),
    lastActivityType: "call",
  },
  {
    id: 6,
    name: "Jennifer Adams",
    email: "jen.adams@email.com",
    phone: "(602) 555-9876",
    source: "Google Ads",
    sourceId: "google",
    sourceIcon: "🔍",
    status: "warm",
    score: 62,
    aiProbability: 45,
    lastContact: "6 hours ago",
    lastContactDate: new Date(Date.now() - 6 * 3600000),
    nextAction: "Send listing matches",
    nextActionDate: new Date(Date.now() + 4 * 3600000),
    timeline: "3-6 months",
    budget: "$300K-$400K",
    budgetMin: 300000,
    budgetMax: 400000,
    location: "Mesa, AZ",
    zipCode: "85201",
    propertyType: "Townhouse",
    notes: "Downsizing from current home. Needs to sell first. Has equity in current home.",
    tags: ["Downsizing", "Contingent Sale"],
    activities: 6,
    calls: 2,
    emails: 2,
    sms: 2,
    stage: "Qualified",
    assignedTo: "You",
    assignedAvatar: null,
    createdAt: new Date(Date.now() - 10 * 24 * 3600000),
    lastActivityType: "email",
  },
  {
    id: 7,
    name: "Robert Chen",
    email: "r.chen@techcorp.com",
    phone: "(480) 555-1234",
    source: "Cold Call",
    sourceId: "coldcall",
    sourceIcon: "📞",
    status: "warm",
    score: 68,
    aiProbability: 55,
    lastContact: "4 hours ago",
    lastContactDate: new Date(Date.now() - 4 * 3600000),
    nextAction: "Follow-up call scheduled",
    nextActionDate: new Date(Date.now() + 24 * 3600000),
    timeline: "1-3 months",
    budget: "$450K-$550K",
    budgetMin: 450000,
    budgetMax: 550000,
    location: "Chandler, AZ",
    zipCode: "85224",
    propertyType: "Single Family",
    notes: "Tech exec relocating from Bay Area. Looking for smart home features.",
    tags: ["Tech Buyer", "Relocation", "Smart Home"],
    activities: 5,
    calls: 3,
    emails: 1,
    sms: 1,
    stage: "Contacted",
    assignedTo: "Alex M.",
    assignedAvatar: "AM",
    createdAt: new Date(Date.now() - 2 * 24 * 3600000),
    lastActivityType: "call",
  },
  {
    id: 8,
    name: "Maria Garcia",
    email: "maria.g@email.com",
    phone: "(623) 555-5678",
    source: "Open House",
    sourceId: "openhouse",
    sourceIcon: "🏡",
    status: "hot",
    score: 85,
    aiProbability: 78,
    lastContact: "Yesterday",
    lastContactDate: new Date(Date.now() - 24 * 3600000),
    nextAction: "Second showing requested",
    nextActionDate: new Date(Date.now() + 48 * 3600000),
    timeline: "Immediate",
    budget: "$375K-$425K",
    budgetMin: 375000,
    budgetMax: 425000,
    location: "Peoria, AZ",
    zipCode: "85345",
    propertyType: "Single Family",
    notes: "Loved the property at open house. Pre-approved. Looking to close quickly.",
    tags: ["Pre-Approved", "Motivated", "Open House Lead"],
    activities: 9,
    calls: 4,
    emails: 3,
    sms: 2,
    stage: "Showing",
    assignedTo: "You",
    assignedAvatar: null,
    createdAt: new Date(Date.now() - 4 * 24 * 3600000),
    lastActivityType: "sms",
  },
  {
    id: 9,
    name: "James Thompson",
    email: "j.thompson@email.com",
    phone: "(520) 555-8765",
    source: "Website",
    sourceId: "website",
    sourceIcon: "🌐",
    status: "cold",
    score: 28,
    aiProbability: 12,
    lastContact: "5 days ago",
    lastContactDate: new Date(Date.now() - 5 * 24 * 3600000),
    nextAction: "Drip campaign active",
    nextActionDate: new Date(Date.now() + 7 * 24 * 3600000),
    timeline: "6+ months",
    budget: "$200K-$300K",
    budgetMin: 200000,
    budgetMax: 300000,
    location: "Tucson, AZ",
    zipCode: "85719",
    propertyType: "Condo",
    notes: "Recent divorce, selling current home. Not ready yet. Follow up in 90 days.",
    tags: ["Life Change", "Future Buyer"],
    activities: 3,
    calls: 1,
    emails: 2,
    sms: 0,
    stage: "New",
    assignedTo: "Alex M.",
    assignedAvatar: "AM",
    createdAt: new Date(Date.now() - 30 * 24 * 3600000),
    lastActivityType: "email",
  },
  {
    id: 10,
    name: "Amanda Foster",
    email: "amanda.foster@email.com",
    phone: "(602) 555-4321",
    source: "Facebook Ads",
    sourceId: "facebook",
    sourceIcon: "📘",
    status: "warm",
    score: 71,
    aiProbability: 58,
    lastContact: "8 hours ago",
    lastContactDate: new Date(Date.now() - 8 * 3600000),
    nextAction: "Schedule property tour",
    nextActionDate: new Date(Date.now() + 12 * 3600000),
    timeline: "1-3 months",
    budget: "$325K-$375K",
    budgetMin: 325000,
    budgetMax: 375000,
    location: "Gilbert, AZ",
    zipCode: "85234",
    propertyType: "Single Family",
    notes: "Young professional, first-time buyer. Looking for starter home with growth potential.",
    tags: ["First-Time Buyer", "Young Professional"],
    activities: 7,
    calls: 2,
    emails: 3,
    sms: 2,
    stage: "Qualified",
    assignedTo: "You",
    assignedAvatar: null,
    createdAt: new Date(Date.now() - 8 * 24 * 3600000),
    lastActivityType: "email",
  },
  {
    id: 11,
    name: "William Parker",
    email: "w.parker@investco.com",
    phone: "(480) 555-9999",
    source: "Referral",
    sourceId: "referral",
    sourceIcon: "🤝",
    status: "hot",
    score: 89,
    aiProbability: 85,
    lastContact: "30 min ago",
    lastContactDate: new Date(Date.now() - 30 * 60000),
    nextAction: "Send investment analysis",
    nextActionDate: new Date(Date.now() + 2 * 3600000),
    timeline: "Immediate",
    budget: "$800K+",
    budgetMin: 800000,
    budgetMax: 1500000,
    location: "Scottsdale, AZ",
    zipCode: "85260",
    propertyType: "Multi-Family",
    notes: "Portfolio investor, looking for multi-family properties. Has multiple LLCs.",
    tags: ["Investor", "Multi-Family", "Portfolio Buyer", "High Value"],
    activities: 11,
    calls: 5,
    emails: 4,
    sms: 2,
    stage: "Offer",
    assignedTo: "You",
    assignedAvatar: null,
    createdAt: new Date(Date.now() - 6 * 24 * 3600000),
    lastActivityType: "call",
  },
  {
    id: 12,
    name: "Emily Martinez",
    email: "emily.m@email.com",
    phone: "(623) 555-2222",
    source: "Zillow",
    sourceId: "zillow",
    sourceIcon: "🏠",
    status: "warm",
    score: 65,
    aiProbability: 48,
    lastContact: "Yesterday",
    lastContactDate: new Date(Date.now() - 28 * 3600000),
    nextAction: "Send market report",
    nextActionDate: new Date(Date.now() + 6 * 3600000),
    timeline: "3-6 months",
    budget: "$275K-$350K",
    budgetMin: 275000,
    budgetMax: 350000,
    location: "Surprise, AZ",
    zipCode: "85374",
    propertyType: "Single Family",
    notes: "Empty nester looking to downsize. Wants single-story only. No rush.",
    tags: ["Empty Nester", "Downsizing", "Single Story"],
    activities: 6,
    calls: 2,
    emails: 3,
    sms: 1,
    stage: "Contacted",
    assignedTo: "Alex M.",
    assignedAvatar: "AM",
    createdAt: new Date(Date.now() - 12 * 24 * 3600000),
    lastActivityType: "sms",
  },
  {
    id: 13,
    name: "Kevin O'Brien",
    email: "k.obrien@email.com",
    phone: "(480) 555-7777",
    source: "Google Ads",
    sourceId: "google",
    sourceIcon: "🔍",
    status: "cold",
    score: 42,
    aiProbability: 25,
    lastContact: "3 days ago",
    lastContactDate: new Date(Date.now() - 3 * 24 * 3600000),
    nextAction: "Re-engage with new listings",
    nextActionDate: new Date(Date.now() + 48 * 3600000),
    timeline: "6+ months",
    budget: "$500K-$600K",
    budgetMin: 500000,
    budgetMax: 600000,
    location: "Tempe, AZ",
    zipCode: "85281",
    propertyType: "Single Family",
    notes: "Professor at ASU. Looking near campus. Lease doesn't end for 6 months.",
    tags: ["Academic", "Future Buyer", "Near Campus"],
    activities: 4,
    calls: 1,
    emails: 2,
    sms: 1,
    stage: "New",
    assignedTo: "You",
    assignedAvatar: null,
    createdAt: new Date(Date.now() - 18 * 24 * 3600000),
    lastActivityType: "email",
  },
  {
    id: 14,
    name: "Rachel Kim",
    email: "rachel.kim@email.com",
    phone: "(602) 555-3333",
    source: "Cold Call",
    sourceId: "coldcall",
    sourceIcon: "📞",
    status: "hot",
    score: 81,
    aiProbability: 72,
    lastContact: "2 hours ago",
    lastContactDate: new Date(Date.now() - 2 * 3600000),
    nextAction: "Prepare offer documents",
    nextActionDate: new Date(Date.now() + 1 * 3600000),
    timeline: "Immediate",
    budget: "$425K-$475K",
    budgetMin: 425000,
    budgetMax: 475000,
    location: "Phoenix, AZ",
    zipCode: "85016",
    propertyType: "Townhouse",
    notes: "Medical professional, relocating from Chicago. Needs to be close to hospital.",
    tags: ["Medical Professional", "Relocation", "Urgent"],
    activities: 10,
    calls: 5,
    emails: 3,
    sms: 2,
    stage: "Offer",
    assignedTo: "You",
    assignedAvatar: null,
    createdAt: new Date(Date.now() - 9 * 24 * 3600000),
    lastActivityType: "call",
  },
  {
    id: 15,
    name: "Thomas Wright",
    email: "t.wright@email.com",
    phone: "(520) 555-4444",
    source: "Open House",
    sourceId: "openhouse",
    sourceIcon: "🏡",
    status: "warm",
    score: 58,
    aiProbability: 42,
    lastContact: "Yesterday",
    lastContactDate: new Date(Date.now() - 32 * 3600000),
    nextAction: "Follow-up with new listings",
    nextActionDate: new Date(Date.now() + 24 * 3600000),
    timeline: "3-6 months",
    budget: "$350K-$400K",
    budgetMin: 350000,
    budgetMax: 400000,
    location: "Oro Valley, AZ",
    zipCode: "85737",
    propertyType: "Single Family",
    notes: "Retiring military, using VA loan. Looking for golf course community.",
    tags: ["VA Loan", "Military", "Golf Community"],
    activities: 5,
    calls: 2,
    emails: 2,
    sms: 1,
    stage: "Contacted",
    assignedTo: "Alex M.",
    assignedAvatar: "AM",
    createdAt: new Date(Date.now() - 15 * 24 * 3600000),
    lastActivityType: "email",
  },
];

// Geographic distribution data
const geoDistribution = [
  { area: "Phoenix", zipCode: "85001-85099", leads: 187, deals: 12, avgValue: 385000, growth: 15 },
  { area: "Scottsdale", zipCode: "85250-85260", leads: 145, deals: 18, avgValue: 625000, growth: 22 },
  { area: "Mesa/Gilbert", zipCode: "85200-85234", leads: 112, deals: 8, avgValue: 345000, growth: 8 },
  { area: "Chandler", zipCode: "85224-85249", leads: 98, deals: 6, avgValue: 412000, growth: 12 },
  { area: "Glendale/Peoria", zipCode: "85301-85345", leads: 78, deals: 5, avgValue: 298000, growth: 5 },
  { area: "Tucson", zipCode: "85700-85750", leads: 65, deals: 4, avgValue: 275000, growth: -3 },
];

// Activity feed data
const activityFeed = [
  { id: 1, type: "new_lead", lead: "John Smith", message: "New lead from Zillow", time: "2 min ago", icon: UserPlus },
  { id: 2, type: "call", lead: "David Lee", message: "Call completed - 8 min", time: "15 min ago", icon: PhoneCall },
  { id: 3, type: "email", lead: "Sarah Johnson", message: "Email opened", time: "32 min ago", icon: Mail },
  { id: 4, type: "status_change", lead: "Mike Wilson", message: "Moved to Negotiation", time: "1 hr ago", icon: ArrowUpRight },
  { id: 5, type: "sms", lead: "Jennifer Adams", message: "SMS replied", time: "1.5 hr ago", icon: MessageSquare },
  { id: 6, type: "appointment", lead: "Maria Garcia", message: "Showing scheduled", time: "2 hr ago", icon: Calendar },
  { id: 7, type: "new_lead", lead: "Robert Chen", message: "New lead from Cold Call", time: "3 hr ago", icon: UserPlus },
  { id: 8, type: "score_change", lead: "Amanda Foster", message: "Score increased to 71", time: "4 hr ago", icon: TrendingUp },
];

// Import history
const importHistory = [
  { id: 1, filename: "zillow_leads_apr.csv", rows: 47, success: 45, failed: 2, date: "Today, 9:30 AM", status: "completed" },
  { id: 2, filename: "facebook_batch_12.csv", rows: 123, success: 123, failed: 0, date: "Yesterday", status: "completed" },
  { id: 3, filename: "openhouse_mar28.csv", rows: 18, success: 18, failed: 0, date: "Mar 28", status: "completed" },
];

// Status configuration
const statusConfig: Record<string, { bg: string; text: string; dot: string; label: string; icon: typeof Flame }> = {
  hot: { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-500", label: "Hot", icon: Flame },
  warm: { bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-500", label: "Warm", icon: Thermometer },
  cold: { bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-500", label: "Cold", icon: Snowflake },
};

// Scoring factors
const scoringFactors = [
  { name: "Response Time", weight: 20, description: "How quickly they respond" },
  { name: "Budget Match", weight: 25, description: "Budget aligned with available inventory" },
  { name: "Timeline Urgency", weight: 20, description: "How soon they want to buy" },
  { name: "Engagement Level", weight: 15, description: "Opens, clicks, replies" },
  { name: "Pre-Approval", weight: 10, description: "Financing ready status" },
  { name: "Source Quality", weight: 10, description: "Historical source performance" },
];

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState<number | null>(1);
  const [search, setSearch] = useState("");
  const [filterSource, setFilterSource] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterAgent, setFilterAgent] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<"score" | "date" | "name">("score");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [expandedLead] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "activity" | "notes">("overview");
  const [activityFilter, setActivityFilter] = useState("all");

  // Calculate overview stats
  const totalLeads = leadSources.reduce((acc, s) => acc + s.leads, 0);
  const hotLeadsCount = leads.filter(l => l.status === "hot").length;
  const avgResponseRate = leadSources.length > 0 ? (leadSources.reduce((acc, s) => acc + s.conversionRate, 0) / leadSources.length) : 0;
  const appointmentsBooked = pipelineStages.find(s => s.id === "showing")?.count || 0;
  const totalPipelineValue = pipelineStages.reduce((acc, s) => acc + s.value, 0);
  const closedDeals = pipelineStages.find(s => s.id === "closed")?.count || 0;
  const conversionRate = totalLeads > 0 ? ((closedDeals / totalLeads) * 100) : 0;

  // Filter and sort leads
  const filteredLeads = leads
    .filter(lead => {
      const matchesSearch = lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search);
      const matchesSource = filterSource === "all" || lead.sourceId === filterSource;
      const matchesStatus = filterStatus === "all" || lead.status === filterStatus;
      const matchesAgent = filterAgent === "all" || lead.assignedTo === filterAgent;
      return matchesSearch && matchesSource && matchesStatus && matchesAgent;
    })
    .sort((a, b) => {
      if (sortBy === "score") return sortOrder === "desc" ? b.score - a.score : a.score - b.score;
      if (sortBy === "date") return sortOrder === "desc"
        ? b.createdAt.getTime() - a.createdAt.getTime()
        : a.createdAt.getTime() - b.createdAt.getTime();
      return sortOrder === "desc"
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name);
    });

  const selectedLeadData = leads.find(l => l.id === selectedLead);

  // Score distribution calculation
  const scoreDistribution = {
    hot: leads.filter(l => l.score >= 80).length,
    warm: leads.filter(l => l.score >= 50 && l.score < 80).length,
    cold: leads.filter(l => l.score < 50).length,
  };

  const toggleLeadSelection = (id: number) => {
    setSelectedLeads(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAllLeads = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map(l => l.id));
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl xs:text-2xl font-bold text-white flex items-center gap-2 xs:gap-3 flex-wrap">
            Lead Management
            <span className="px-2 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 rounded-full">
              {totalLeads} Total
            </span>
          </h1>
          <p className="text-zinc-400 text-xs xs:text-sm mt-1">Track, manage, and convert your real estate leads with AI-powered insights</p>
        </div>
        <div className="flex items-center gap-2 xs:gap-3 flex-wrap">
          <button className="px-2 xs:px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs xs:text-sm text-zinc-300 flex items-center gap-1.5 xs:gap-2 transition-colors border border-zinc-700">
            <Upload className="w-4 h-4" /> <span className="hidden xs:inline">Import</span>
          </button>
          <button className="px-2 xs:px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs xs:text-sm text-zinc-300 flex items-center gap-1.5 xs:gap-2 transition-colors border border-zinc-700">
            <Download className="w-4 h-4" /> <span className="hidden xs:inline">Export</span>
          </button>
          <button className="px-3 xs:px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-lg text-xs xs:text-sm text-black font-semibold flex items-center gap-1.5 xs:gap-2 transition-all shadow-lg shadow-emerald-500/20">
            <Plus className="w-4 h-4" /> <span className="hidden xs:inline">Add Lead</span><span className="xs:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Overview Stats Row - 6 Cards */}
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 xs:gap-3 sm:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 xs:w-8 h-7 xs:h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
              <Users className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-zinc-400" />
            </div>
          </div>
          <p className="text-[10px] xs:text-xs text-zinc-500 mb-1">Total Leads</p>
          <div className="flex items-baseline gap-1 xs:gap-2">
            <span className="text-lg xs:text-2xl font-bold text-white">{totalLeads}</span>
            <span className="text-[10px] xs:text-xs text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-2.5 xs:w-3 h-2.5 xs:h-3" /> +67
            </span>
          </div>
          <p className="text-[10px] xs:text-xs text-zinc-600 mt-1">This week</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-xl border border-red-500/30 bg-zinc-900/80 p-4 backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 xs:w-8 h-7 xs:h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                <Flame className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-red-400" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-red-500"
              />
            </div>
            <p className="text-[10px] xs:text-xs text-zinc-500 mb-1">Hot Leads</p>
            <div className="flex items-baseline gap-1 xs:gap-2">
              <span className="text-lg xs:text-2xl font-bold text-white">{hotLeadsCount}</span>
              <span className="text-[10px] xs:text-xs text-red-400 font-medium">URGENT</span>
            </div>
            <p className="text-[10px] xs:text-xs text-zinc-600 mt-1">Need attention</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 xs:w-8 h-7 xs:h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
              <MessageSquare className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-zinc-400" />
            </div>
          </div>
          <p className="text-[10px] xs:text-xs text-zinc-500 mb-1">Response Rate</p>
          <div className="flex items-baseline gap-1 xs:gap-2">
            <span className="text-lg xs:text-2xl font-bold text-white">{avgResponseRate.toFixed(1)}%</span>
            <span className="text-[10px] xs:text-xs text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-2.5 xs:w-3 h-2.5 xs:h-3" /> +2.3%
            </span>
          </div>
          <p className="text-[10px] xs:text-xs text-zinc-600 mt-1">Avg across sources</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 xs:w-8 h-7 xs:h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
              <Calendar className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-zinc-400" />
            </div>
          </div>
          <p className="text-[10px] xs:text-xs text-zinc-500 mb-1">Appointments</p>
          <div className="flex items-baseline gap-1 xs:gap-2">
            <span className="text-lg xs:text-2xl font-bold text-white">{appointmentsBooked}</span>
            <span className="text-[10px] xs:text-xs text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-2.5 xs:w-3 h-2.5 xs:h-3" /> +8
            </span>
          </div>
          <p className="text-[10px] xs:text-xs text-zinc-600 mt-1">Showings booked</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 xs:w-8 h-7 xs:h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
              <Target className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-zinc-400" />
            </div>
          </div>
          <p className="text-[10px] xs:text-xs text-zinc-500 mb-1">Conversion Rate</p>
          <div className="flex items-baseline gap-1 xs:gap-2">
            <span className="text-lg xs:text-2xl font-bold text-white">{conversionRate.toFixed(1)}%</span>
            <span className="text-[10px] xs:text-xs text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-2.5 xs:w-3 h-2.5 xs:h-3" /> +0.8%
            </span>
          </div>
          <p className="text-[10px] xs:text-xs text-zinc-600 mt-1">Lead to close</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-xl border border-emerald-500/30 bg-zinc-900/80 p-4 backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 xs:w-8 h-7 xs:h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <DollarSign className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-emerald-400" />
              </div>
            </div>
            <p className="text-[10px] xs:text-xs text-zinc-500 mb-1">Pipeline Value</p>
            <div className="flex items-baseline gap-1 xs:gap-2">
              <span className="text-lg xs:text-2xl font-bold text-white">{formatCurrency(totalPipelineValue)}</span>
            </div>
            <p className="text-[10px] xs:text-xs text-emerald-400 mt-1">+23% this month</p>
          </div>
        </motion.div>
      </div>

      {/* Lead Source Analytics */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3 xs:p-4 sm:p-5 backdrop-blur-sm">
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 xs:gap-4 mb-4 xs:mb-6">
          <div>
            <h2 className="text-base xs:text-lg font-semibold text-white flex items-center gap-2 flex-wrap">
              Lead Source Analytics
              <span className="px-2 py-0.5 text-[10px] xs:text-xs bg-zinc-800 text-zinc-400 rounded-full">{leadSources.length} sources</span>
            </h2>
            <p className="text-zinc-500 text-xs xs:text-sm mt-1">Performance metrics by acquisition channel</p>
          </div>
          <select className="px-2 xs:px-3 py-1.5 xs:py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-xs xs:text-sm text-zinc-300 focus:outline-none focus:border-emerald-500 w-full xs:w-auto">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
            <option>This Year</option>
          </select>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 xs:gap-4">
          {leadSources.map((source, index) => (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className={cn(
                "p-4 rounded-xl border bg-zinc-800/30 hover:bg-zinc-800/50 transition-all cursor-pointer group relative overflow-hidden",
                source.borderColor,
                source.bestPerforming && "ring-2 ring-emerald-500/50"
              )}
            >
              {source.bestPerforming && (
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-emerald-500 text-black text-[10px] font-bold rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" /> BEST
                </div>
              )}

              <div className="flex items-start gap-3 mb-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden shrink-0",
                  source.tileBg
                )}>
                  {source.icon.type === "brand" ? (
                    <Image
                      src={source.icon.src}
                      alt={source.icon.alt}
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  ) : (
                    <source.icon.Icon className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm">{source.name}</h3>
                  <p className="text-xs text-zinc-500">{source.leads} leads</p>
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  source.trend === "up" ? "text-emerald-400" : "text-red-400"
                )}>
                  {source.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {source.leadsChange > 0 ? "+" : ""}{source.leadsChange}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Cost/Lead</p>
                  <p className={cn("text-sm font-semibold", source.textColor)}>
                    {source.costPerLead === 0 ? "FREE" : `$${source.costPerLead}`}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Conv. Rate</p>
                  <p className={cn("text-sm font-semibold", source.textColor)}>{source.conversionRate}%</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Revenue</p>
                  <p className="text-sm font-semibold text-white">{formatCurrency(source.revenueGenerated)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">ROI</p>
                  <div className="flex items-center gap-1">
                    <p className={cn(
                      "text-sm font-semibold",
                      source.roi >= 3 ? "text-emerald-400" : source.roi >= 1 ? "text-amber-400" : "text-red-400"
                    )}>
                      {source.roi === 999 ? "N/A" : `${source.roi}x`}
                    </p>
                    {source.roi >= 3 && <CheckCircle className="w-3 h-3 text-emerald-400" />}
                    {source.roi < 1 && <AlertCircle className="w-3 h-3 text-red-400" />}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      source.qualityScore >= 8.5 ? "bg-emerald-400" :
                      source.qualityScore >= 7 ? "bg-amber-400" : "bg-red-400"
                    )} />
                    <span className="text-xs text-zinc-500">Quality: {source.qualityScore}/10</span>
                  </div>
                  <span className="text-xs text-zinc-500">{source.avgResponseTime} avg</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Sales Pipeline - Kanban Style */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3 xs:p-4 sm:p-5 backdrop-blur-sm">
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 xs:gap-4 mb-4 xs:mb-6">
          <div>
            <h2 className="text-base xs:text-lg font-semibold text-white flex items-center gap-2 flex-wrap">
              Sales Pipeline
              <span className="px-2 py-0.5 text-[10px] xs:text-xs bg-emerald-500/10 text-emerald-400 rounded-full">
                {formatCurrency(totalPipelineValue)} Total
              </span>
            </h2>
            <p className="text-zinc-500 text-xs xs:text-sm mt-1">Drag and drop leads between stages (visual only)</p>
          </div>
          <button className="text-xs xs:text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors">
            View Full Board <ExternalLink className="w-3.5 xs:w-4 h-3.5 xs:h-4" />
          </button>
        </div>

        <div className="flex gap-2 xs:gap-3 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory">
          {pipelineStages.map((stage, index) => (
            <div key={stage.id} className="flex items-center snap-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0 w-[140px] xs:w-[160px] sm:w-[180px] bg-zinc-800/50 rounded-xl border border-zinc-700/50 overflow-hidden"
              >
                <div className={cn("h-1", stage.color)} />
                <div className="p-2.5 xs:p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2 xs:mb-3">
                    <div className="flex items-center gap-1.5 xs:gap-2">
                      <span className={cn("text-xs xs:text-sm font-medium", stage.textColor)}>{stage.name}</span>
                      <span className="w-5 xs:w-6 h-5 xs:h-6 rounded-full bg-zinc-700 flex items-center justify-center text-[10px] xs:text-xs font-medium text-white">
                        {stage.count}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 xs:space-y-3">
                    <div>
                      <p className="text-[10px] xs:text-xs text-zinc-500 mb-0.5 xs:mb-1">Value</p>
                      <p className="text-sm xs:text-base sm:text-lg font-bold text-white">{formatCurrency(stage.value)}</p>
                    </div>

                    {stage.conversionToNext < 100 && (
                      <div>
                        <p className="text-[10px] xs:text-xs text-zinc-500 mb-0.5 xs:mb-1">Conversion</p>
                        <div className="flex items-center gap-1.5 xs:gap-2">
                          <div className="flex-1 h-1 xs:h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                            <div
                              className={cn("h-full rounded-full", stage.color)}
                              style={{ width: `${stage.conversionToNext}%` }}
                            />
                          </div>
                          <span className="text-[10px] xs:text-xs text-zinc-400">{stage.conversionToNext}%</span>
                        </div>
                      </div>
                    )}

                    <div>
                      <p className="text-[10px] xs:text-xs text-zinc-500 mb-0.5 xs:mb-1">Avg Time</p>
                      <p className="text-xs xs:text-sm text-zinc-300">{stage.avgTimeInStage}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {index < pipelineStages.length - 1 && (
                <div className="flex-shrink-0 mx-1 xs:mx-2">
                  <ChevronRight className="w-4 xs:w-5 h-4 xs:h-5 text-zinc-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Lead Scoring + Geographic Distribution */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xs:gap-6">
        {/* Lead Scoring System */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3 xs:p-4 sm:p-5 backdrop-blur-sm">
          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 xs:gap-4 mb-4 xs:mb-6">
            <div>
              <h2 className="text-base xs:text-lg font-semibold text-white flex items-center gap-2">
                <Brain className="w-4 xs:w-5 h-4 xs:h-5 text-violet-400" />
                AI Lead Scoring
              </h2>
              <p className="text-zinc-500 text-xs xs:text-sm mt-1">Predictive scoring based on 6 factors</p>
            </div>
            <button className="px-2 xs:px-3 py-1 xs:py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-[10px] xs:text-xs text-zinc-300 flex items-center gap-1 xs:gap-1.5 transition-colors w-fit">
              <RefreshCw className="w-3 h-3" /> Recalculate
            </button>
          </div>

          {/* Score Distribution */}
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 xs:gap-3 mb-4 xs:mb-6">
            <div className="p-2 xs:p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-1.5 xs:gap-2 mb-1.5 xs:mb-2">
                <Flame className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-red-400" />
                <span className="text-[10px] xs:text-xs text-red-400 font-medium">Hot <span className="hidden xs:inline">(80-100)</span></span>
              </div>
              <p className="text-lg xs:text-2xl font-bold text-white">{scoreDistribution.hot}</p>
              <p className="text-[10px] xs:text-xs text-zinc-500">{leads.length > 0 ? ((scoreDistribution.hot / leads.length) * 100).toFixed(0) : 0}% of leads</p>
            </div>
            <div className="p-2 xs:p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-1.5 xs:gap-2 mb-1.5 xs:mb-2">
                <Thermometer className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-amber-400" />
                <span className="text-[10px] xs:text-xs text-amber-400 font-medium">Warm <span className="hidden xs:inline">(50-79)</span></span>
              </div>
              <p className="text-lg xs:text-2xl font-bold text-white">{scoreDistribution.warm}</p>
              <p className="text-[10px] xs:text-xs text-zinc-500">{leads.length > 0 ? ((scoreDistribution.warm / leads.length) * 100).toFixed(0) : 0}% of leads</p>
            </div>
            <div className="p-2 xs:p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-1.5 xs:gap-2 mb-1.5 xs:mb-2">
                <Snowflake className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-blue-400" />
                <span className="text-[10px] xs:text-xs text-blue-400 font-medium">Cold <span className="hidden xs:inline">(0-49)</span></span>
              </div>
              <p className="text-lg xs:text-2xl font-bold text-white">{scoreDistribution.cold}</p>
              <p className="text-[10px] xs:text-xs text-zinc-500">{leads.length > 0 ? ((scoreDistribution.cold / leads.length) * 100).toFixed(0) : 0}% of leads</p>
            </div>
          </div>

          {/* Scoring Factors */}
          <div className="space-y-2 xs:space-y-3">
            <h4 className="text-xs xs:text-sm font-medium text-white">Scoring Factors</h4>
            {scoringFactors.map((factor) => (
              <div key={factor.name} className="flex items-center gap-2 xs:gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5 xs:mb-1">
                    <span className="text-xs xs:text-sm text-zinc-300">{factor.name}</span>
                    <span className="text-[10px] xs:text-xs text-zinc-500">{factor.weight}%</span>
                  </div>
                  <div className="h-1 xs:h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                      style={{ width: `${factor.weight * 4}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Prediction */}
          <div className="mt-4 xs:mt-6 p-3 xs:p-4 rounded-lg bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20">
            <div className="flex items-center gap-1.5 xs:gap-2 mb-1.5 xs:mb-2">
              <Sparkles className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-violet-400" />
              <span className="text-xs xs:text-sm font-medium text-violet-400">AI Insight</span>
            </div>
            <p className="text-xs xs:text-sm text-zinc-300">
              Based on current scoring, <span className="text-white font-medium">4 leads</span> are predicted to close within 14 days.
              Focus on leads with score above 85 for highest conversion probability.
            </p>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3 xs:p-4 sm:p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4 xs:mb-6">
            <div>
              <h2 className="text-base xs:text-lg font-semibold text-white flex items-center gap-2">
                <MapPin className="w-4 xs:w-5 h-4 xs:h-5 text-teal-400" />
                Geographic Distribution
              </h2>
              <p className="text-zinc-500 text-xs xs:text-sm mt-1">Leads by area and market performance</p>
            </div>
          </div>

          <div className="space-y-2 xs:space-y-3">
            {geoDistribution.map((area, index) => (
              <motion.div
                key={area.area}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-2 xs:p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1.5 xs:mb-2">
                  <div className="flex items-center gap-2 xs:gap-3">
                    <div className="w-7 xs:w-8 h-7 xs:h-8 rounded-lg bg-teal-500/20 flex items-center justify-center">
                      <MapPin className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-teal-400" />
                    </div>
                    <div>
                      <p className="text-xs xs:text-sm font-medium text-white">{area.area}</p>
                      <p className="text-[10px] xs:text-xs text-zinc-500">{area.zipCode}</p>
                    </div>
                  </div>
                  <div className={cn(
                    "flex items-center gap-0.5 xs:gap-1 text-[10px] xs:text-xs font-medium",
                    area.growth >= 0 ? "text-emerald-400" : "text-red-400"
                  )}>
                    {area.growth >= 0 ? <TrendingUp className="w-2.5 xs:w-3 h-2.5 xs:h-3" /> : <TrendingDown className="w-2.5 xs:w-3 h-2.5 xs:h-3" />}
                    {area.growth > 0 ? "+" : ""}{area.growth}%
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 xs:gap-4 mt-2 xs:mt-3 text-center xs:text-left">
                  <div>
                    <p className="text-[10px] xs:text-xs text-zinc-500">Leads</p>
                    <p className="text-xs xs:text-sm font-semibold text-white">{area.leads}</p>
                  </div>
                  <div>
                    <p className="text-[10px] xs:text-xs text-zinc-500">Deals</p>
                    <p className="text-xs xs:text-sm font-semibold text-emerald-400">{area.deals}</p>
                  </div>
                  <div>
                    <p className="text-[10px] xs:text-xs text-zinc-500">Avg Value</p>
                    <p className="text-xs xs:text-sm font-semibold text-white">{formatCurrency(area.avgValue)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Filters Bar */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3 xs:p-4 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row gap-3 xs:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 xs:py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-xs xs:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2 xs:gap-3">
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="flex-1 xs:flex-none px-2 xs:px-3 py-2 xs:py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-xs xs:text-sm text-zinc-300 focus:outline-none focus:border-emerald-500 transition-colors min-w-0"
            >
              <option value="all">All Sources</option>
              {leadSources.map(s => (
                <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 xs:flex-none px-2 xs:px-3 py-2 xs:py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-xs xs:text-sm text-zinc-300 focus:outline-none focus:border-emerald-500 transition-colors min-w-0"
            >
              <option value="all">All Status</option>
              <option value="hot">Hot</option>
              <option value="warm">Warm</option>
              <option value="cold">Cold</option>
            </select>

            <select
              value={filterAgent}
              onChange={(e) => setFilterAgent(e.target.value)}
              className="flex-1 xs:flex-none px-2 xs:px-3 py-2 xs:py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-xs xs:text-sm text-zinc-300 focus:outline-none focus:border-emerald-500 transition-colors min-w-0"
            >
              <option value="all">All Agents</option>
              <option value="You">You</option>
              <option value="Alex M.">Alex M.</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "px-2 xs:px-3 py-2 xs:py-2.5 rounded-lg text-xs xs:text-sm flex items-center gap-1.5 xs:gap-2 transition-colors border whitespace-nowrap",
                showFilters
                  ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
                  : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700"
              )}
            >
              <Filter className="w-3.5 xs:w-4 h-3.5 xs:h-4" />
              <span className="hidden xs:inline">More</span> Filters
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 mt-3 xs:mt-4 pt-3 xs:pt-4 border-t border-zinc-700/50">
                <div>
                  <label className="text-[10px] xs:text-xs text-zinc-500 mb-1 xs:mb-1.5 block">Date Range</label>
                  <select className="w-full px-2 xs:px-3 py-1.5 xs:py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-xs xs:text-sm text-zinc-300">
                    <option>All Time</option>
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] xs:text-xs text-zinc-500 mb-1 xs:mb-1.5 block">Pipeline Stage</label>
                  <select className="w-full px-2 xs:px-3 py-1.5 xs:py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-xs xs:text-sm text-zinc-300">
                    <option>All Stages</option>
                    {pipelineStages.map(s => (
                      <option key={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] xs:text-xs text-zinc-500 mb-1 xs:mb-1.5 block">Budget Range</label>
                  <select className="w-full px-2 xs:px-3 py-1.5 xs:py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-xs xs:text-sm text-zinc-300">
                    <option>Any Budget</option>
                    <option>Under $300K</option>
                    <option>$300K - $500K</option>
                    <option>$500K - $750K</option>
                    <option>$750K+</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] xs:text-xs text-zinc-500 mb-1 xs:mb-1.5 block">Property Type</label>
                  <select className="w-full px-2 xs:px-3 py-1.5 xs:py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-xs xs:text-sm text-zinc-300">
                    <option>All Types</option>
                    <option>Single Family</option>
                    <option>Condo</option>
                    <option>Townhouse</option>
                    <option>Multi-Family</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content: Lead Table + Detail Panel + Activity Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Lead Table */}
        <div className="min-w-0">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm overflow-hidden w-full">
            {/* Table Header */}
            <div className="p-3 xs:p-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2 xs:gap-3">
                <button
                  onClick={toggleAllLeads}
                  className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                    selectedLeads.length === filteredLeads.length && filteredLeads.length > 0
                      ? "bg-emerald-500 border-emerald-500 text-black"
                      : "border-zinc-600 hover:border-zinc-500"
                  )}
                >
                  {selectedLeads.length === filteredLeads.length && filteredLeads.length > 0 && (
                    <Check className="w-3 h-3" />
                  )}
                </button>
                <span className="text-xs xs:text-sm text-zinc-400">
                  {selectedLeads.length > 0
                    ? `${selectedLeads.length} selected`
                    : `${filteredLeads.length} leads`
                  }
                </span>
              </div>

              {selectedLeads.length > 0 && (
                <div className="flex items-center gap-1 xs:gap-2">
                  <button className="px-2 xs:px-3 py-1 xs:py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-[10px] xs:text-xs text-zinc-300 flex items-center gap-1 xs:gap-1.5">
                    <Tag className="w-3 h-3" /> <span className="hidden xs:inline">Tag</span>
                  </button>
                  <button className="px-2 xs:px-3 py-1 xs:py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-[10px] xs:text-xs text-zinc-300 flex items-center gap-1 xs:gap-1.5">
                    <Mail className="w-3 h-3" /> <span className="hidden xs:inline">Email All</span>
                  </button>
                  <button className="px-2 xs:px-3 py-1 xs:py-1.5 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-[10px] xs:text-xs text-red-400 flex items-center gap-1 xs:gap-1.5">
                    <Trash2 className="w-3 h-3" /> <span className="hidden xs:inline">Delete</span>
                  </button>
                </div>
              )}

              {selectedLeads.length === 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSortBy("score");
                      setSortOrder(prev => prev === "desc" ? "asc" : "desc");
                    }}
                    className={cn(
                      "px-2 py-1 rounded text-xs transition-colors",
                      sortBy === "score" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-white"
                    )}
                  >
                    Score {sortBy === "score" && (sortOrder === "desc" ? "↓" : "↑")}
                  </button>
                  <button
                    onClick={() => {
                      setSortBy("date");
                      setSortOrder(prev => prev === "desc" ? "asc" : "desc");
                    }}
                    className={cn(
                      "px-2 py-1 rounded text-xs transition-colors",
                      sortBy === "date" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-white"
                    )}
                  >
                    Date {sortBy === "date" && (sortOrder === "desc" ? "↓" : "↑")}
                  </button>
                </div>
              )}
            </div>

            {/* Lead List */}
            <div className="divide-y divide-zinc-800 max-h-[500px] xs:max-h-[600px] sm:max-h-[700px] overflow-y-auto">
              {filteredLeads.map((lead) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group"
                >
                  <div
                    className={cn(
                      "p-2.5 xs:p-3 sm:p-4 hover:bg-zinc-800/30 transition-colors cursor-pointer",
                      selectedLead === lead.id && "bg-zinc-800/50 border-l-2 border-emerald-500"
                    )}
                    onClick={() => setSelectedLead(lead.id)}
                  >
                    <div className="flex items-start gap-2 xs:gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLeadSelection(lead.id);
                        }}
                        className={cn(
                          "w-5 h-5 rounded border flex-shrink-0 mt-1 flex items-center justify-center transition-colors",
                          selectedLeads.includes(lead.id)
                            ? "bg-emerald-500 border-emerald-500 text-black"
                            : "border-zinc-600 hover:border-zinc-500"
                        )}
                      >
                        {selectedLeads.includes(lead.id) && <Check className="w-3 h-3" />}
                      </button>

                      {/* Avatar with Score */}
                      <div className="relative flex-shrink-0">
                        <div className="w-8 xs:w-10 h-8 xs:h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs xs:text-sm font-medium">
                          {lead.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className={cn(
                          "absolute -bottom-0.5 xs:-bottom-1 -right-0.5 xs:-right-1 w-4 xs:w-5 h-4 xs:h-5 rounded-full flex items-center justify-center text-[8px] xs:text-[9px] font-bold border-2 border-zinc-900",
                          lead.score >= 80 ? "bg-emerald-500 text-black" :
                          lead.score >= 50 ? "bg-amber-500 text-black" :
                          "bg-zinc-600 text-white"
                        )}>
                          {lead.score}
                        </div>
                      </div>

                      {/* Lead Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 xs:gap-2 mb-0.5 xs:mb-1">
                          <h3 className="font-medium text-white text-xs xs:text-sm truncate">{lead.name}</h3>
                          <span className={cn(
                            "px-1 xs:px-1.5 py-0.5 rounded text-[9px] xs:text-[10px] font-medium flex items-center gap-0.5 flex-shrink-0",
                            statusConfig[lead.status].bg,
                            statusConfig[lead.status].text
                          )}>
                            {lead.status === "hot" && <Flame className="w-2 xs:w-2.5 h-2 xs:h-2.5" />}
                            {statusConfig[lead.status].label}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs text-zinc-500 mb-1 xs:mb-1.5">
                          <span className="flex items-center gap-0.5 xs:gap-1">
                            <span>{lead.sourceIcon}</span>
                            <span className="truncate hidden xs:inline">{lead.source}</span>
                          </span>
                          <span className="text-zinc-700 hidden xs:inline">|</span>
                          <span className="truncate">{lead.budget}</span>
                        </div>

                        <div className="flex items-center gap-2 xs:gap-3">
                          <span className="text-[9px] xs:text-[10px] text-zinc-500 flex items-center gap-0.5 xs:gap-1">
                            <Clock className="w-2.5 xs:w-3 h-2.5 xs:h-3" /> {lead.lastContact}
                          </span>
                          <span className="text-[9px] xs:text-[10px] text-emerald-400 truncate hidden xs:inline">
                            {lead.nextAction}
                          </span>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <button className="p-1 xs:p-1.5 rounded hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors">
                          <Phone className="w-3 xs:w-3.5 h-3 xs:h-3.5" />
                        </button>
                        <button className="p-1 xs:p-1.5 rounded hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors hidden xs:block">
                          <MessageSquare className="w-3 xs:w-3.5 h-3 xs:h-3.5" />
                        </button>
                        <button className="p-1 xs:p-1.5 rounded hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors hidden xs:block">
                          <Mail className="w-3 xs:w-3.5 h-3 xs:h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Row Details */}
                  <AnimatePresence>
                    {expandedLead === lead.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-zinc-800/30 border-t border-zinc-700/50"
                      >
                        <div className="p-2.5 xs:p-4 grid grid-cols-1 xs:grid-cols-3 gap-2 xs:gap-4">
                          <div>
                            <p className="text-[10px] xs:text-xs text-zinc-500">Timeline</p>
                            <p className="text-xs xs:text-sm text-white">{lead.timeline}</p>
                          </div>
                          <div>
                            <p className="text-[10px] xs:text-xs text-zinc-500">Location</p>
                            <p className="text-xs xs:text-sm text-white">{lead.location}</p>
                          </div>
                          <div>
                            <p className="text-[10px] xs:text-xs text-zinc-500">AI Probability</p>
                            <p className="text-xs xs:text-sm text-emerald-400">{lead.aiProbability}%</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <div className="p-3 xs:p-4 border-t border-zinc-800 text-center">
              <button className="text-xs xs:text-sm text-zinc-400 hover:text-white transition-colors">
                Load more leads...
              </button>
            </div>
          </div>
        </div>

        {/* Lead Detail Panel */}
        <div className="min-w-0">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm sticky top-4">
            {selectedLeadData ? (
              <div>
                {/* Header */}
                <div className="p-3 xs:p-4 sm:p-5 border-b border-zinc-800">
                  <div className="flex items-start justify-between mb-3 xs:mb-4">
                    <div className="flex items-center gap-2.5 xs:gap-3 sm:gap-4">
                      <div className="relative">
                        <div className="w-10 xs:w-12 sm:w-14 h-10 xs:h-12 sm:h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-semibold text-sm xs:text-base sm:text-lg">
                          {selectedLeadData.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className={cn(
                          "absolute -bottom-0.5 xs:-bottom-1 -right-0.5 xs:-right-1 w-5 xs:w-6 sm:w-7 h-5 xs:h-6 sm:h-7 rounded-full flex items-center justify-center text-[10px] xs:text-xs font-bold border-2 border-zinc-900",
                          selectedLeadData.score >= 80 ? "bg-emerald-500 text-black" :
                          selectedLeadData.score >= 50 ? "bg-amber-500 text-black" :
                          "bg-zinc-600 text-white"
                        )}>
                          {selectedLeadData.score}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm xs:text-base sm:text-lg">{selectedLeadData.name}</h3>
                        <p className="text-xs xs:text-sm text-zinc-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {selectedLeadData.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 xs:gap-1">
                      <button className="p-1.5 xs:p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                        <Edit3 className="w-3.5 xs:w-4 h-3.5 xs:h-4" />
                      </button>
                      <button className="p-1.5 xs:p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                        <MoreVertical className="w-3.5 xs:w-4 h-3.5 xs:h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 xs:gap-2 flex-wrap">
                    <span className={cn(
                      "px-2 xs:px-2.5 py-0.5 xs:py-1 rounded-full text-[10px] xs:text-xs font-medium flex items-center gap-0.5 xs:gap-1",
                      statusConfig[selectedLeadData.status].bg,
                      statusConfig[selectedLeadData.status].text
                    )}>
                      {selectedLeadData.status === "hot" && <Flame className="w-2.5 xs:w-3 h-2.5 xs:h-3" />}
                      {statusConfig[selectedLeadData.status].label}
                    </span>
                    <span className="px-2 xs:px-2.5 py-0.5 xs:py-1 rounded-full text-[10px] xs:text-xs font-medium bg-zinc-800 text-zinc-300">
                      {selectedLeadData.stage}
                    </span>
                    <span className="px-2 xs:px-2.5 py-0.5 xs:py-1 rounded-full text-[10px] xs:text-xs font-medium bg-violet-500/10 text-violet-400 flex items-center gap-0.5 xs:gap-1">
                      <Brain className="w-2.5 xs:w-3 h-2.5 xs:h-3" /> {selectedLeadData.aiProbability}% <span className="hidden xs:inline">probability</span>
                    </span>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-zinc-800">
                  {(["overview", "activity", "notes"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "flex-1 px-2 xs:px-4 py-2.5 xs:py-3 text-xs xs:text-sm font-medium transition-colors relative",
                        activeTab === tab ? "text-white" : "text-zinc-400 hover:text-zinc-300"
                      )}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="p-3 xs:p-4 sm:p-5">
                  {activeTab === "overview" && (
                    <div className="space-y-4 xs:space-y-5">
                      {/* Contact Info */}
                      <div className="space-y-2 xs:space-y-3">
                        <h4 className="text-[10px] xs:text-xs text-zinc-500 uppercase tracking-wider font-medium">Contact</h4>
                        <div className="grid grid-cols-1 gap-1.5 xs:gap-2">
                          <a href={`tel:${selectedLeadData.phone}`} className="flex items-center gap-2 xs:gap-3 p-2 xs:p-2.5 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors group">
                            <div className="w-7 xs:w-8 h-7 xs:h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                              <Phone className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-emerald-400" />
                            </div>
                            <span className="text-xs xs:text-sm text-white flex-1">{selectedLeadData.phone}</span>
                            <span className="text-[10px] xs:text-xs text-emerald-400 opacity-0 group-hover:opacity-100 hidden xs:inline">Click to call</span>
                          </a>
                          <a href={`mailto:${selectedLeadData.email}`} className="flex items-center gap-2 xs:gap-3 p-2 xs:p-2.5 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors group">
                            <div className="w-7 xs:w-8 h-7 xs:h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                              <Mail className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-blue-400" />
                            </div>
                            <span className="text-xs xs:text-sm text-white flex-1 truncate">{selectedLeadData.email}</span>
                            <span className="text-[10px] xs:text-xs text-blue-400 opacity-0 group-hover:opacity-100 hidden xs:inline">Send email</span>
                          </a>
                          <a href={`sms:${selectedLeadData.phone}`} className="flex items-center gap-2 xs:gap-3 p-2 xs:p-2.5 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors group">
                            <div className="w-7 xs:w-8 h-7 xs:h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                              <MessageSquare className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-violet-400" />
                            </div>
                            <span className="text-xs xs:text-sm text-white flex-1">Send SMS</span>
                            <span className="text-[10px] xs:text-xs text-violet-400 opacity-0 group-hover:opacity-100 hidden xs:inline">Click to text</span>
                          </a>
                        </div>
                      </div>

                      {/* Lead Details */}
                      <div className="space-y-2 xs:space-y-3">
                        <h4 className="text-[10px] xs:text-xs text-zinc-500 uppercase tracking-wider font-medium">Details</h4>
                        <div className="grid grid-cols-2 gap-2 xs:gap-3">
                          <div className="p-2 xs:p-3 rounded-lg bg-zinc-800/50">
                            <p className="text-[10px] xs:text-xs text-zinc-500 mb-0.5 xs:mb-1">Budget</p>
                            <p className="text-xs xs:text-sm font-semibold text-white">{selectedLeadData.budget}</p>
                          </div>
                          <div className="p-2 xs:p-3 rounded-lg bg-zinc-800/50">
                            <p className="text-[10px] xs:text-xs text-zinc-500 mb-0.5 xs:mb-1">Timeline</p>
                            <p className="text-xs xs:text-sm font-semibold text-white">{selectedLeadData.timeline}</p>
                          </div>
                          <div className="p-2 xs:p-3 rounded-lg bg-zinc-800/50">
                            <p className="text-[10px] xs:text-xs text-zinc-500 mb-0.5 xs:mb-1">Property Type</p>
                            <p className="text-xs xs:text-sm font-semibold text-white">{selectedLeadData.propertyType}</p>
                          </div>
                          <div className="p-2 xs:p-3 rounded-lg bg-zinc-800/50">
                            <p className="text-[10px] xs:text-xs text-zinc-500 mb-0.5 xs:mb-1">Source</p>
                            <p className="text-xs xs:text-sm font-semibold text-white flex items-center gap-1">
                              <span>{selectedLeadData.sourceIcon}</span> {selectedLeadData.source}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Deal Probability Meter */}
                      <div className="p-3 xs:p-4 rounded-lg bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/20">
                        <div className="flex items-center justify-between mb-1.5 xs:mb-2">
                          <span className="text-xs xs:text-sm font-medium text-white flex items-center gap-1.5 xs:gap-2">
                            <Target className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-emerald-400" />
                            Deal Probability
                          </span>
                          <span className="text-sm xs:text-lg font-bold text-emerald-400">{selectedLeadData.aiProbability}%</span>
                        </div>
                        <div className="h-1.5 xs:h-2 bg-zinc-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedLeadData.aiProbability}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                          />
                        </div>
                      </div>

                      {/* Tags */}
                      {selectedLeadData.tags.length > 0 && (
                        <div className="space-y-1.5 xs:space-y-2">
                          <h4 className="text-[10px] xs:text-xs text-zinc-500 uppercase tracking-wider font-medium">Tags</h4>
                          <div className="flex flex-wrap gap-1.5 xs:gap-2">
                            {selectedLeadData.tags.map((tag) => (
                              <span key={tag} className="px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full text-[10px] xs:text-xs bg-zinc-800 text-zinc-300 border border-zinc-700">
                                {tag}
                              </span>
                            ))}
                            <button className="px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full text-[10px] xs:text-xs bg-zinc-800 text-zinc-500 hover:text-zinc-300 border border-dashed border-zinc-700 flex items-center gap-0.5 xs:gap-1">
                              <Plus className="w-2.5 xs:w-3 h-2.5 xs:h-3" /> Add
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Activity Summary */}
                      <div className="space-y-2">
                        <h4 className="text-[10px] xs:text-xs text-zinc-500 uppercase tracking-wider font-medium">Activity</h4>
                        <div className="grid grid-cols-2 xs:grid-cols-4 gap-1.5 xs:gap-2">
                          <div className="p-2 xs:p-3 rounded-lg bg-zinc-800/50 text-center">
                            <Phone className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-emerald-400 mx-auto mb-0.5 xs:mb-1" />
                            <p className="text-sm xs:text-lg font-bold text-white">{selectedLeadData.calls}</p>
                            <p className="text-[9px] xs:text-[10px] text-zinc-500">Calls</p>
                          </div>
                          <div className="p-2 xs:p-3 rounded-lg bg-zinc-800/50 text-center">
                            <Mail className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-blue-400 mx-auto mb-0.5 xs:mb-1" />
                            <p className="text-sm xs:text-lg font-bold text-white">{selectedLeadData.emails}</p>
                            <p className="text-[9px] xs:text-[10px] text-zinc-500">Emails</p>
                          </div>
                          <div className="p-2 xs:p-3 rounded-lg bg-zinc-800/50 text-center">
                            <MessageSquare className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-violet-400 mx-auto mb-0.5 xs:mb-1" />
                            <p className="text-sm xs:text-lg font-bold text-white">{selectedLeadData.sms}</p>
                            <p className="text-[9px] xs:text-[10px] text-zinc-500">SMS</p>
                          </div>
                          <div className="p-2 xs:p-3 rounded-lg bg-zinc-800/50 text-center">
                            <Activity className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-amber-400 mx-auto mb-0.5 xs:mb-1" />
                            <p className="text-sm xs:text-lg font-bold text-white">{selectedLeadData.activities}</p>
                            <p className="text-[9px] xs:text-[10px] text-zinc-500">Total</p>
                          </div>
                        </div>
                      </div>

                      {/* AI Recommendations */}
                      <div className="p-3 xs:p-4 rounded-lg bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20">
                        <div className="flex items-center gap-1.5 xs:gap-2 mb-1.5 xs:mb-2">
                          <Sparkles className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-violet-400" />
                          <span className="text-xs xs:text-sm font-medium text-violet-400">AI Recommendation</span>
                        </div>
                        <p className="text-xs xs:text-sm text-zinc-300">
                          {selectedLeadData.score >= 80
                            ? "High priority lead! Schedule a showing within 24 hours. Response time is critical for hot leads."
                            : selectedLeadData.score >= 50
                            ? "Follow up with personalized property recommendations. Consider a phone call to understand needs better."
                            : "Add to drip campaign for long-term nurturing. Set a reminder to check back in 30 days."
                          }
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "activity" && (
                    <div className="space-y-3 xs:space-y-4">
                      <p className="text-xs xs:text-sm text-zinc-400">Recent activity timeline for this lead.</p>
                      <div className="space-y-2 xs:space-y-3">
                        <div className="flex items-start gap-2 xs:gap-3">
                          <div className="w-7 xs:w-8 h-7 xs:h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                            <Phone className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-emerald-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs xs:text-sm text-white">Call completed - 8 min</p>
                            <p className="text-[10px] xs:text-xs text-zinc-500">{selectedLeadData.lastContact}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 xs:gap-3">
                          <div className="w-7 xs:w-8 h-7 xs:h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                            <Mail className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs xs:text-sm text-white">Email sent - Property matches</p>
                            <p className="text-[10px] xs:text-xs text-zinc-500">Yesterday</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 xs:gap-3">
                          <div className="w-7 xs:w-8 h-7 xs:h-8 rounded-full bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                            <MessageSquare className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-violet-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs xs:text-sm text-white">SMS replied - Interested in showing</p>
                            <p className="text-[10px] xs:text-xs text-zinc-500">2 days ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "notes" && (
                    <div className="space-y-3 xs:space-y-4">
                      <div className="p-3 xs:p-4 rounded-lg bg-zinc-800/50">
                        <p className="text-xs xs:text-sm text-zinc-300">{selectedLeadData.notes}</p>
                        <p className="text-[10px] xs:text-xs text-zinc-500 mt-1.5 xs:mt-2">Added on {selectedLeadData.createdAt.toLocaleDateString()}</p>
                      </div>
                      <textarea
                        placeholder="Add a note..."
                        className="w-full h-20 xs:h-24 px-2.5 xs:px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-xs xs:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 resize-none"
                      />
                      <button className="w-full py-1.5 xs:py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs xs:text-sm text-zinc-300 transition-colors">
                        Save Note
                      </button>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="p-3 xs:p-4 sm:p-5 border-t border-zinc-800">
                  <div className="grid grid-cols-2 gap-2 xs:gap-3">
                    <button className="px-2 xs:px-4 py-2 xs:py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-lg text-xs xs:text-sm font-semibold text-black flex items-center justify-center gap-1.5 xs:gap-2 transition-all shadow-lg shadow-emerald-500/20">
                      <Phone className="w-3.5 xs:w-4 h-3.5 xs:h-4" /> <span className="hidden xs:inline">Call</span> Now
                    </button>
                    <button className="px-2 xs:px-4 py-2 xs:py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs xs:text-sm font-medium text-white flex items-center justify-center gap-1.5 xs:gap-2 transition-colors border border-zinc-700">
                      <MessageSquare className="w-3.5 xs:w-4 h-3.5 xs:h-4" /> <span className="hidden xs:inline">Send</span> SMS
                    </button>
                    <button className="px-2 xs:px-4 py-2 xs:py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs xs:text-sm font-medium text-white flex items-center justify-center gap-1.5 xs:gap-2 transition-colors border border-zinc-700">
                      <Mail className="w-3.5 xs:w-4 h-3.5 xs:h-4" /> Email
                    </button>
                    <button className="px-2 xs:px-4 py-2 xs:py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs xs:text-sm font-medium text-white flex items-center justify-center gap-1.5 xs:gap-2 transition-colors border border-zinc-700">
                      <Calendar className="w-3.5 xs:w-4 h-3.5 xs:h-4" /> Schedule
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 xs:p-12 text-center">
                <div className="w-12 xs:w-16 h-12 xs:h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-3 xs:mb-4">
                  <Users className="w-6 xs:w-8 h-6 xs:h-8 text-zinc-600" />
                </div>
                <p className="text-zinc-400 text-xs xs:text-sm mb-1.5 xs:mb-2">Select a lead to view details</p>
                <p className="text-zinc-600 text-[10px] xs:text-xs">Click on any lead from the list</p>
              </div>
            )}
          </div>
        </div>

        {/* Activity Feed + Import/Export */}
        <div className="min-w-0 space-y-6">
          {/* Activity Feed */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm overflow-hidden">
            <div className="p-3 xs:p-4 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="font-semibold text-white text-sm xs:text-base flex items-center gap-1.5 xs:gap-2">
                <Activity className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-emerald-400" />
                Activity Feed
              </h3>
              <select
                value={activityFilter}
                onChange={(e) => setActivityFilter(e.target.value)}
                className="px-1.5 xs:px-2 py-0.5 xs:py-1 bg-zinc-800 border border-zinc-700 rounded text-[10px] xs:text-xs text-zinc-300"
              >
                <option value="all">All</option>
                <option value="new_lead">New Leads</option>
                <option value="call">Calls</option>
                <option value="email">Emails</option>
                <option value="sms">SMS</option>
              </select>
            </div>
            <div className="divide-y divide-zinc-800 max-h-[250px] xs:max-h-[300px] overflow-y-auto">
              {activityFeed
                .filter(a => activityFilter === "all" || a.type === activityFilter)
                .map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-2 xs:p-3 hover:bg-zinc-800/30 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-2 xs:gap-3">
                        <div className={cn(
                          "w-7 xs:w-8 h-7 xs:h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                          activity.type === "new_lead" ? "bg-emerald-500/10" :
                          activity.type === "call" ? "bg-green-500/10" :
                          activity.type === "email" ? "bg-blue-500/10" :
                          activity.type === "sms" ? "bg-violet-500/10" :
                          "bg-zinc-800"
                        )}>
                          <Icon className={cn(
                            "w-3.5 xs:w-4 h-3.5 xs:h-4",
                            activity.type === "new_lead" ? "text-emerald-400" :
                            activity.type === "call" ? "text-green-400" :
                            activity.type === "email" ? "text-blue-400" :
                            activity.type === "sms" ? "text-violet-400" :
                            "text-zinc-400"
                          )} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs xs:text-sm text-white truncate">{activity.lead}</p>
                          <p className="text-[10px] xs:text-xs text-zinc-500 truncate">{activity.message}</p>
                        </div>
                        <span className="text-[9px] xs:text-[10px] text-zinc-600 flex-shrink-0">{activity.time}</span>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
            <div className="p-2 xs:p-3 border-t border-zinc-800 text-center">
              <button className="text-[10px] xs:text-xs text-zinc-400 hover:text-white transition-colors">
                View all activity
              </button>
            </div>
          </div>

          {/* Import/Export Section */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
            <div className="p-3 xs:p-4 border-b border-zinc-800">
              <h3 className="font-semibold text-white text-sm xs:text-base flex items-center gap-1.5 xs:gap-2">
                <FileSpreadsheet className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-teal-400" />
                Import / Export
              </h3>
            </div>
            <div className="p-3 xs:p-4 space-y-3 xs:space-y-4">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2">
                <button className="p-2 xs:p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 transition-colors text-center">
                  <Upload className="w-4 xs:w-5 h-4 xs:h-5 text-emerald-400 mx-auto mb-0.5 xs:mb-1" />
                  <p className="text-[10px] xs:text-xs text-white">Import CSV</p>
                </button>
                <button className="p-2 xs:p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 transition-colors text-center">
                  <Download className="w-4 xs:w-5 h-4 xs:h-5 text-blue-400 mx-auto mb-0.5 xs:mb-1" />
                  <p className="text-[10px] xs:text-xs text-white">Export All</p>
                </button>
              </div>

              {/* Recent Imports */}
              <div>
                <h4 className="text-[10px] xs:text-xs text-zinc-500 uppercase tracking-wider font-medium mb-1.5 xs:mb-2">Recent Imports</h4>
                <div className="space-y-1.5 xs:space-y-2">
                  {importHistory.map((imp) => (
                    <div key={imp.id} className="p-1.5 xs:p-2 rounded-lg bg-zinc-800/30 border border-zinc-700/50">
                      <div className="flex items-center justify-between mb-0.5 xs:mb-1">
                        <span className="text-[10px] xs:text-xs text-white truncate flex-1">{imp.filename}</span>
                        <span className={cn(
                          "px-1 xs:px-1.5 py-0.5 rounded text-[9px] xs:text-[10px] font-medium ml-1",
                          imp.status === "completed" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                        )}>
                          {imp.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[9px] xs:text-[10px] text-zinc-500">
                        <span>{imp.success}/{imp.rows} rows</span>
                        <span>{imp.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
