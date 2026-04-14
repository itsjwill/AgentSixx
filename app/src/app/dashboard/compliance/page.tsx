"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  PhoneOff,
  Clock,
  Calendar,
  Search,
  Plus,
  Download,
  Upload,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  ChevronRight,
  RefreshCw,
  History,
  Eye,
  MapPin,
  Mic,
  Bell,
  FileCheck,
  FileClock,
  FileWarning,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// ============================================
// MOCK DATA - Comprehensive Compliance Data
// ============================================

// Overall Compliance Score Breakdown
const complianceScores = {
  overall: 94,
  dncCompliance: 98,
  tcpaCompliance: 92,
  stateRegulations: 96,
  timeRestrictions: 91,
};

// DNC Management Data
const dncStats = {
  totalNumbers: 12847,
  recentAdditions: 23,
  recentRemovals: 5,
  lastSyncFederal: "2 hours ago",
  lastSyncState: "4 hours ago",
  blockedToday: 47,
};

const recentDncAdditions = [
  { phone: "(602) 555-1234", source: "Federal DNC", addedAt: "10 min ago", reason: "Federal Registry" },
  { phone: "(480) 555-5678", source: "User Request", addedAt: "32 min ago", reason: "STOP received" },
  { phone: "(623) 555-9012", source: "Litigator List", addedAt: "1 hour ago", reason: "Known litigator" },
  { phone: "(520) 555-3456", source: "State DNC - AZ", addedAt: "2 hours ago", reason: "State Registry" },
  { phone: "(928) 555-7890", source: "User Request", addedAt: "3 hours ago", reason: "Verbal request" },
];

// State Calling Windows
const stateCallingWindows = [
  { state: "AZ", name: "Arizona", startTime: "8:00 AM", endTime: "9:00 PM", timezone: "MST", status: "active", currentlyAllowed: true },
  { state: "CA", name: "California", startTime: "8:00 AM", endTime: "9:00 PM", timezone: "PST", status: "active", currentlyAllowed: true },
  { state: "TX", name: "Texas", startTime: "8:00 AM", endTime: "9:00 PM", timezone: "CST", status: "active", currentlyAllowed: true },
  { state: "FL", name: "Florida", startTime: "8:00 AM", endTime: "9:00 PM", timezone: "EST", status: "active", currentlyAllowed: true },
  { state: "NY", name: "New York", startTime: "8:00 AM", endTime: "9:00 PM", timezone: "EST", status: "restricted", currentlyAllowed: true },
  { state: "GA", name: "Georgia", startTime: "8:00 AM", endTime: "8:00 PM", timezone: "EST", status: "active", currentlyAllowed: true },
  { state: "NC", name: "North Carolina", startTime: "8:00 AM", endTime: "9:00 PM", timezone: "EST", status: "active", currentlyAllowed: true },
  { state: "PA", name: "Pennsylvania", startTime: "9:00 AM", endTime: "8:00 PM", timezone: "EST", status: "restricted", currentlyAllowed: true },
];

// Consent Tracking Data
const consentStats = {
  totalLeads: 8945,
  withConsent: 8712,
  pendingConsent: 156,
  expiringSoon: 89,
  expired: 77,
  reConsentNeeded: 42,
};

const consentRecords = [
  { name: "John Smith", phone: "(602) 555-0123", consentDate: "Mar 15, 2026", expiresAt: "Mar 15, 2028", type: "Written", status: "active" },
  { name: "Sarah Johnson", phone: "(480) 555-0456", consentDate: "Apr 2, 2026", expiresAt: "Apr 2, 2028", type: "Verbal", status: "active" },
  { name: "Mike Wilson", phone: "(623) 555-0789", consentDate: "Jan 10, 2024", expiresAt: "Jan 10, 2026", type: "Written", status: "expired" },
  { name: "Lisa Brown", phone: "(520) 555-0321", consentDate: "Mar 28, 2026", expiresAt: "Apr 28, 2026", type: "Verbal", status: "expiring" },
  { name: "David Lee", phone: "(928) 555-0654", consentDate: "Feb 20, 2026", expiresAt: "Feb 20, 2028", type: "Written", status: "active" },
];

// Two-Party Consent States
const twoPartyConsentStates = [
  { code: "CA", name: "California", disclosureActive: true, recordingCompliant: true },
  { code: "FL", name: "Florida", disclosureActive: true, recordingCompliant: true },
  { code: "IL", name: "Illinois", disclosureActive: true, recordingCompliant: true },
  { code: "MD", name: "Maryland", disclosureActive: true, recordingCompliant: true },
  { code: "MA", name: "Massachusetts", disclosureActive: true, recordingCompliant: true },
  { code: "MT", name: "Montana", disclosureActive: true, recordingCompliant: true },
  { code: "NH", name: "New Hampshire", disclosureActive: true, recordingCompliant: true },
  { code: "PA", name: "Pennsylvania", disclosureActive: true, recordingCompliant: true },
  { code: "WA", name: "Washington", disclosureActive: true, recordingCompliant: true },
  { code: "CT", name: "Connecticut", disclosureActive: true, recordingCompliant: true },
];

// Audit Log
const auditLog = [
  { id: 1, action: "DNC List Updated", user: "System", timestamp: "Today 2:45 PM", details: "Federal DNC sync completed - 23 new entries", type: "dnc" },
  { id: 2, action: "Consent Recorded", user: "Agent Luna", timestamp: "Today 2:32 PM", details: "Verbal consent from (602) 555-1234", type: "consent" },
  { id: 3, action: "Call Blocked", user: "System", timestamp: "Today 2:15 PM", details: "DNC match for (480) 555-5678", type: "block" },
  { id: 4, action: "Quiet Hours Enforced", user: "System", timestamp: "Today 9:01 PM", details: "Outbound calls paused for EST timezone", type: "time" },
  { id: 5, action: "Litigator Alert", user: "System", timestamp: "Today 1:58 PM", details: "Known TCPA litigator detected - call prevented", type: "alert" },
  { id: 6, action: "Recording Disclosure", user: "Agent Luna", timestamp: "Today 1:45 PM", details: "Two-party disclosure played for CA lead", type: "recording" },
  { id: 7, action: "STOP Request", user: "Lead", timestamp: "Today 1:30 PM", details: "(623) 555-9012 added to internal DNC", type: "dnc" },
  { id: 8, action: "Compliance Report", user: "Admin", timestamp: "Today 12:00 PM", details: "Monthly compliance report generated", type: "report" },
];

// Violation Alerts
const violationAlerts = [
  {
    id: 1,
    severity: "warning",
    title: "Consent Expiring Soon",
    description: "89 leads have consent expiring within 30 days",
    action: "Send re-consent requests",
    status: "pending",
    timestamp: "Today",
  },
  {
    id: 2,
    severity: "info",
    title: "State DNC Update Available",
    description: "Arizona state DNC list has new entries",
    action: "Sync state DNC",
    status: "resolved",
    timestamp: "Yesterday",
  },
  {
    id: 3,
    severity: "success",
    title: "TCPA Audit Passed",
    description: "Monthly TCPA compliance audit completed successfully",
    action: "View report",
    status: "resolved",
    timestamp: "Apr 10, 2026",
  },
];

// State Regulations Quick Reference
const stateRegulations = [
  {
    state: "California",
    code: "CA",
    callingHours: "8 AM - 9 PM",
    dncStatus: "Active",
    twoPartyConsent: true,
    specialReqs: "Written consent required for ATDS calls",
    penaltyPerViolation: "$2,500",
  },
  {
    state: "Texas",
    code: "TX",
    callingHours: "8 AM - 9 PM",
    dncStatus: "Active",
    twoPartyConsent: false,
    specialReqs: "Must honor state DNC in addition to federal",
    penaltyPerViolation: "$1,000",
  },
  {
    state: "Florida",
    code: "FL",
    callingHours: "8 AM - 9 PM",
    dncStatus: "Active",
    twoPartyConsent: true,
    specialReqs: "Caller ID required, specific disclosure language",
    penaltyPerViolation: "$500",
  },
  {
    state: "New York",
    code: "NY",
    callingHours: "8 AM - 9 PM",
    dncStatus: "Active",
    twoPartyConsent: false,
    specialReqs: "Registration required for telemarketing",
    penaltyPerViolation: "$11,000",
  },
  {
    state: "Arizona",
    code: "AZ",
    callingHours: "8 AM - 9 PM",
    dncStatus: "Active",
    twoPartyConsent: false,
    specialReqs: "Standard federal TCPA compliance",
    penaltyPerViolation: "$500",
  },
  {
    state: "Georgia",
    code: "GA",
    callingHours: "8 AM - 8 PM",
    dncStatus: "Active",
    twoPartyConsent: false,
    specialReqs: "Earlier quiet hours than federal standard",
    penaltyPerViolation: "$2,000",
  },
];

// Reports
const complianceReports = [
  { name: "Monthly Compliance Summary - April 2026", date: "Apr 1, 2026", type: "monthly", status: "current" },
  { name: "Monthly Compliance Summary - March 2026", date: "Mar 1, 2026", type: "monthly", status: "archived" },
  { name: "Q1 2026 TCPA Audit Report", date: "Apr 1, 2026", type: "quarterly", status: "current" },
  { name: "Annual Compliance Review 2025", date: "Jan 1, 2026", type: "annual", status: "archived" },
  { name: "DNC Scrub Report - April 2026", date: "Apr 13, 2026", type: "dnc", status: "current" },
];

// ============================================
// COMPONENT
// ============================================

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "dnc" | "consent" | "recording" | "audit" | "reports" | "regulations">("overview");
  const [dncSearchQuery, setDncSearchQuery] = useState("");
  const [showAddDncModal, setShowAddDncModal] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return "bg-emerald-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreRingColor = (score: number) => {
    if (score >= 90) return "stroke-emerald-500";
    if (score >= 70) return "stroke-yellow-500";
    return "stroke-red-500";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Compliance Center</h2>
              <p className="text-zinc-500">TCPA, DNC, and regulatory compliance management</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 text-sm font-medium hover:bg-zinc-700 transition-colors border border-zinc-700">
            <RefreshCw className="w-4 h-4" />
            Sync DNC Lists
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-400 transition-colors">
            <Download className="w-4 h-4" />
            Export Audit Report
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: "overview", label: "Overview", icon: Shield },
          { id: "dnc", label: "DNC Management", icon: PhoneOff },
          { id: "consent", label: "Consent Tracking", icon: FileCheck },
          { id: "recording", label: "Recording Disclosure", icon: Mic },
          { id: "audit", label: "Audit Log", icon: History },
          { id: "reports", label: "Reports", icon: FileText },
          { id: "regulations", label: "State Regulations", icon: MapPin },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
              activeTab === tab.id
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50 border border-transparent"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Compliance Score Card */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Main Score */}
              <motion.div
                className="lg:col-span-2 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Overall Compliance Score</h3>
                    <p className="text-sm text-zinc-500">Based on 4 compliance categories</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Excellent
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-zinc-800"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${complianceScores.overall * 2.83} 283`}
                        className={getScoreRingColor(complianceScores.overall)}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={cn("text-5xl font-bold", getScoreColor(complianceScores.overall))}>
                        {complianceScores.overall}
                      </span>
                      <span className="text-zinc-500 text-sm">out of 100</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Score Breakdown */}
              <motion.div
                className="lg:col-span-3 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-lg font-semibold text-white mb-6">Score Breakdown</h3>
                <div className="space-y-5">
                  {[
                    { label: "DNC List Compliance", score: complianceScores.dncCompliance, icon: PhoneOff },
                    { label: "TCPA Compliance", score: complianceScores.tcpaCompliance, icon: Shield },
                    { label: "State Regulations", score: complianceScores.stateRegulations, icon: MapPin },
                    { label: "Time Restrictions", score: complianceScores.timeRestrictions, icon: Clock },
                  ].map((item, i) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <item.icon className="w-4 h-4 text-zinc-500" />
                          <span className="text-sm text-zinc-300">{item.label}</span>
                        </div>
                        <span className={cn("text-sm font-semibold", getScoreColor(item.score))}>
                          {item.score}%
                        </span>
                      </div>
                      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          className={cn("h-full rounded-full", getScoreBgColor(item.score))}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.score}%` }}
                          transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "DNC Numbers", value: dncStats.totalNumbers.toLocaleString(), icon: PhoneOff, color: "text-red-400", bgColor: "bg-red-500/10" },
                { label: "Active Consents", value: consentStats.withConsent.toLocaleString(), icon: FileCheck, color: "text-emerald-400", bgColor: "bg-emerald-500/10" },
                { label: "Calls Blocked Today", value: dncStats.blockedToday, icon: ShieldAlert, color: "text-yellow-400", bgColor: "bg-yellow-500/10" },
                { label: "Two-Party States", value: twoPartyConsentStates.length, icon: Mic, color: "text-cyan-400", bgColor: "bg-cyan-500/10" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                      <stat.icon className={cn("w-5 h-5", stat.color)} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-zinc-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Violation Alerts */}
            <motion.div
              className="rounded-xl bg-zinc-900/50 border border-zinc-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="p-6 border-b border-zinc-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-zinc-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">Compliance Alerts</h3>
                      <p className="text-sm text-zinc-500">Recent notifications and action items</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400">
                    {violationAlerts.filter(a => a.status === "pending").length} Pending
                  </span>
                </div>
              </div>
              <div className="divide-y divide-zinc-800/50">
                {violationAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 flex items-start gap-4">
                    <div className={cn(
                      "p-2 rounded-lg shrink-0",
                      alert.severity === "warning" ? "bg-yellow-500/10" :
                      alert.severity === "info" ? "bg-blue-500/10" :
                      "bg-emerald-500/10"
                    )}>
                      {alert.severity === "warning" ? (
                        <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      ) : alert.severity === "info" ? (
                        <Info className="w-5 h-5 text-blue-400" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-white">{alert.title}</h4>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium",
                          alert.status === "pending" ? "bg-yellow-500/10 text-yellow-400" : "bg-zinc-700 text-zinc-400"
                        )}>
                          {alert.status}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400 mt-1">{alert.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-zinc-500">{alert.timestamp}</span>
                        <button className="text-xs text-emerald-400 hover:text-emerald-300 font-medium">
                          {alert.action}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Audit Activity */}
            <motion.div
              className="rounded-xl bg-zinc-900/50 border border-zinc-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="p-6 border-b border-zinc-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <History className="w-5 h-5 text-zinc-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                      <p className="text-sm text-zinc-500">Latest compliance events</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("audit")}
                    className="text-sm text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
                  >
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="divide-y divide-zinc-800/50">
                {auditLog.slice(0, 5).map((log) => (
                  <div key={log.id} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        log.type === "dnc" ? "bg-red-400" :
                        log.type === "consent" ? "bg-emerald-400" :
                        log.type === "block" ? "bg-yellow-400" :
                        log.type === "alert" ? "bg-orange-400" :
                        "bg-zinc-400"
                      )} />
                      <div>
                        <p className="text-sm text-white">{log.action}</p>
                        <p className="text-xs text-zinc-500">{log.details}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-zinc-400">{log.timestamp}</p>
                      <p className="text-xs text-zinc-500">{log.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Compliance Status Banner */}
            <motion.div
              className="p-6 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/20">
                  <ShieldCheck className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-lg mb-1">Your Compliance Stack is Fully Active</h4>
                  <p className="text-sm text-zinc-400 mb-3">
                    All compliance systems are operational. Federal DNC synced 2 hours ago, state registries synced 4 hours ago.
                    Records are retained for 4 years as required by TCPA statute of limitations.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400">
                      A2P 10DLC Registered
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400">
                      Federal DNC Active
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400">
                      State DNC Active (50 States)
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400">
                      TCPA Litigator Protection
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400">
                      Quiet Hours Enforced
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400">
                      Tech E&O Insured
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* DNC MANAGEMENT TAB */}
        {activeTab === "dnc" && (
          <motion.div
            key="dnc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* DNC Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total DNC Numbers", value: dncStats.totalNumbers.toLocaleString(), trend: "+23 today", trendUp: true },
                { label: "Recent Additions", value: dncStats.recentAdditions, trend: "Last 24 hours", trendUp: null },
                { label: "Calls Blocked Today", value: dncStats.blockedToday, trend: "DNC matches", trendUp: null },
                { label: "Last Federal Sync", value: dncStats.lastSyncFederal, trend: "Auto-sync enabled", trendUp: null },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-zinc-400 mt-1">{stat.label}</p>
                  <p className={cn(
                    "text-xs mt-2",
                    stat.trendUp === true ? "text-emerald-400" :
                    stat.trendUp === false ? "text-red-400" :
                    "text-zinc-500"
                  )}>
                    {stat.trendUp === true && <ArrowUpRight className="w-3 h-3 inline mr-1" />}
                    {stat.trendUp === false && <ArrowDownRight className="w-3 h-3 inline mr-1" />}
                    {stat.trend}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Search and Actions */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search DNC list by phone number..."
                  value={dncSearchQuery}
                  onChange={(e) => setDncSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddDncModal(true)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-800 text-white text-sm font-medium hover:bg-zinc-700 transition-colors border border-zinc-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Number
                </button>
                <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-800 text-white text-sm font-medium hover:bg-zinc-700 transition-colors border border-zinc-700">
                  <Upload className="w-4 h-4" />
                  Import List
                </button>
                <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-800 text-white text-sm font-medium hover:bg-zinc-700 transition-colors border border-zinc-700">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            {/* Recent DNC Additions */}
            <div className="rounded-xl bg-zinc-900/50 border border-zinc-800">
              <div className="p-6 border-b border-zinc-800">
                <h3 className="text-lg font-semibold text-white">Recent DNC Additions</h3>
                <p className="text-sm text-zinc-500">Numbers added to the Do Not Call list</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Phone Number</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Source</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Reason</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Added</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {recentDncAdditions.map((entry, i) => (
                      <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="px-6 py-4 text-sm text-white font-mono">{entry.phone}</td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-xs font-medium",
                            entry.source.includes("Federal") ? "bg-blue-500/10 text-blue-400" :
                            entry.source.includes("State") ? "bg-purple-500/10 text-purple-400" :
                            entry.source.includes("Litigator") ? "bg-red-500/10 text-red-400" :
                            "bg-zinc-700 text-zinc-300"
                          )}>
                            {entry.source}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-400">{entry.reason}</td>
                        <td className="px-6 py-4 text-sm text-zinc-500">{entry.addedAt}</td>
                        <td className="px-6 py-4">
                          <button className="text-zinc-400 hover:text-white transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* DNC Sources Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Federal DNC Registry", count: "8,234", lastSync: "2 hours ago", status: "synced" },
                { name: "State DNC Registries", count: "3,891", lastSync: "4 hours ago", status: "synced" },
                { name: "TCPA Litigator List", count: "722", lastSync: "30 min ago", status: "synced" },
              ].map((source, i) => (
                <motion.div
                  key={source.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-white">{source.name}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                      {source.status}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">{source.count}</p>
                  <p className="text-xs text-zinc-500 mt-1">Last synced: {source.lastSync}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CONSENT TRACKING TAB */}
        {activeTab === "consent" && (
          <motion.div
            key="consent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Consent Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {[
                { label: "Total Leads", value: consentStats.totalLeads.toLocaleString(), color: "text-white" },
                { label: "With Consent", value: consentStats.withConsent.toLocaleString(), color: "text-emerald-400" },
                { label: "Pending", value: consentStats.pendingConsent, color: "text-yellow-400" },
                { label: "Expiring Soon", value: consentStats.expiringSoon, color: "text-orange-400" },
                { label: "Expired", value: consentStats.expired, color: "text-red-400" },
                { label: "Re-consent Needed", value: consentStats.reConsentNeeded, color: "text-purple-400" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
                  <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Consent Coverage Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                className="lg:col-span-2 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-lg font-semibold text-white mb-4">Consent Coverage</h3>
                <div className="h-8 bg-zinc-800 rounded-full overflow-hidden flex">
                  <div
                    className="bg-emerald-500 h-full transition-all"
                    style={{ width: `${consentStats.totalLeads > 0 ? (consentStats.withConsent / consentStats.totalLeads) * 100 : 0}%` }}
                  />
                  <div
                    className="bg-yellow-500 h-full transition-all"
                    style={{ width: `${consentStats.totalLeads > 0 ? (consentStats.pendingConsent / consentStats.totalLeads) * 100 : 0}%` }}
                  />
                  <div
                    className="bg-orange-500 h-full transition-all"
                    style={{ width: `${consentStats.totalLeads > 0 ? (consentStats.expiringSoon / consentStats.totalLeads) * 100 : 0}%` }}
                  />
                  <div
                    className="bg-red-500 h-full transition-all"
                    style={{ width: `${consentStats.totalLeads > 0 ? (consentStats.expired / consentStats.totalLeads) * 100 : 0}%` }}
                  />
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs text-zinc-400">Active ({consentStats.totalLeads > 0 ? ((consentStats.withConsent / consentStats.totalLeads) * 100).toFixed(1) : 0}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="text-xs text-zinc-400">Pending ({consentStats.totalLeads > 0 ? ((consentStats.pendingConsent / consentStats.totalLeads) * 100).toFixed(1) : 0}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <span className="text-xs text-zinc-400">Expiring ({consentStats.totalLeads > 0 ? ((consentStats.expiringSoon / consentStats.totalLeads) * 100).toFixed(1) : 0}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-xs text-zinc-400">Expired ({consentStats.totalLeads > 0 ? ((consentStats.expired / consentStats.totalLeads) * 100).toFixed(1) : 0}%)</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileClock className="w-5 h-5 text-orange-400" />
                      <span className="text-sm text-white">Send Re-consent Requests</span>
                    </div>
                    <span className="text-xs text-orange-400">{consentStats.expiringSoon}</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileWarning className="w-5 h-5 text-red-400" />
                      <span className="text-sm text-white">Review Expired Consents</span>
                    </div>
                    <span className="text-xs text-red-400">{consentStats.expired}</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                    <div className="flex items-center gap-3">
                      <Download className="w-5 h-5 text-zinc-400" />
                      <span className="text-sm text-white">Export Consent Records</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Consent Records Table */}
            <motion.div
              className="rounded-xl bg-zinc-900/50 border border-zinc-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-6 border-b border-zinc-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Consent Records</h3>
                    <p className="text-sm text-zinc-500">Timestamped consent documentation</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 text-xs font-medium hover:bg-orange-500/20 transition-colors">
                      Expiring Soon ({consentStats.expiringSoon})
                    </button>
                    <button className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors">
                      Expired ({consentStats.expired})
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Lead</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Consent Date</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Expires</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {consentRecords.map((record, i) => (
                      <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="px-6 py-4 text-sm text-white">{record.name}</td>
                        <td className="px-6 py-4 text-sm text-zinc-400 font-mono">{record.phone}</td>
                        <td className="px-6 py-4 text-sm text-zinc-400">{record.consentDate}</td>
                        <td className="px-6 py-4 text-sm text-zinc-400">{record.expiresAt}</td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-xs font-medium",
                            record.type === "Written" ? "bg-emerald-500/10 text-emerald-400" : "bg-blue-500/10 text-blue-400"
                          )}>
                            {record.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-xs font-medium",
                            record.status === "active" ? "bg-emerald-500/10 text-emerald-400" :
                            record.status === "expiring" ? "bg-orange-500/10 text-orange-400" :
                            "bg-red-500/10 text-red-400"
                          )}>
                            {record.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="text-zinc-400 hover:text-white transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            {record.status !== "active" && (
                              <button className="text-emerald-400 hover:text-emerald-300 transition-colors text-xs font-medium">
                                Request
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* RECORDING DISCLOSURE TAB */}
        {activeTab === "recording" && (
          <motion.div
            key="recording"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Two-Party Consent States Map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Two-Party Consent States</h3>
                    <p className="text-sm text-zinc-500">States requiring all-party consent for recording</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                    All Compliant
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {twoPartyConsentStates.map((state) => (
                    <div
                      key={state.code}
                      className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">{state.code}</span>
                        <span className="text-xs text-zinc-500">{state.name}</span>
                      </div>
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-lg font-semibold text-white mb-4">Recording Disclosure Status</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Mic className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm font-medium text-white">Automatic Disclosure</span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      autonomous agent automatically plays recording disclosure at the start of every call in two-party consent states.
                    </p>
                    <div className="mt-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-700">
                      <p className="text-xs text-zinc-300 italic">
                        &quot;This call may be recorded for quality assurance and training purposes. By continuing this conversation, you consent to the recording.&quot;
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">Recording Storage</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                        Compliant
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      All recordings encrypted at rest and in transit. Retained for 4 years per TCPA requirements.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">Disclosure Analytics</span>
                      <span className="text-xs text-zinc-400">Last 30 days</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-xl font-bold text-white">2,847</p>
                        <p className="text-xs text-zinc-500">Disclosures Played</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-emerald-400">100%</p>
                        <p className="text-xs text-zinc-500">Compliance Rate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Info Banner */}
            <motion.div
              className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">Recording Compliance Best Practice</h4>
                  <p className="text-xs text-zinc-400">
                    AgentSixx automatically detects the lead&apos;s state and applies the appropriate disclosure requirement.
                    For two-party consent states (CA, FL, IL, MD, MA, MT, NH, PA, WA, CT), the autonomous agent will always
                    play the recording disclosure before proceeding with the conversation.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* AUDIT LOG TAB */}
        {activeTab === "audit" && (
          <motion.div
            key="audit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search audit log..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              <div className="flex gap-3">
                <select className="px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-white text-sm focus:outline-none focus:border-emerald-500/50">
                  <option value="">All Types</option>
                  <option value="dnc">DNC</option>
                  <option value="consent">Consent</option>
                  <option value="block">Block</option>
                  <option value="time">Time</option>
                  <option value="alert">Alert</option>
                </select>
                <select className="px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-white text-sm focus:outline-none focus:border-emerald-500/50">
                  <option value="">All Users</option>
                  <option value="system">System</option>
                  <option value="agent">Voice ISA</option>
                  <option value="admin">Admin</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-800 text-white text-sm font-medium hover:bg-zinc-700 transition-colors border border-zinc-700">
                  <Download className="w-4 h-4" />
                  Export Log
                </button>
              </div>
            </div>

            {/* Audit Log Table */}
            <motion.div
              className="rounded-xl bg-zinc-900/50 border border-zinc-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="p-6 border-b border-zinc-800">
                <h3 className="text-lg font-semibold text-white">Complete Audit Trail</h3>
                <p className="text-sm text-zinc-500">All compliance-related actions and events</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Action</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Details</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {auditLog.map((log) => (
                      <tr key={log.id} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-xs font-medium",
                            log.type === "dnc" ? "bg-red-500/10 text-red-400" :
                            log.type === "consent" ? "bg-emerald-500/10 text-emerald-400" :
                            log.type === "block" ? "bg-yellow-500/10 text-yellow-400" :
                            log.type === "time" ? "bg-blue-500/10 text-blue-400" :
                            log.type === "alert" ? "bg-orange-500/10 text-orange-400" :
                            log.type === "recording" ? "bg-purple-500/10 text-purple-400" :
                            "bg-zinc-700 text-zinc-300"
                          )}>
                            {log.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-white">{log.action}</td>
                        <td className="px-6 py-4 text-sm text-zinc-400 max-w-xs truncate">{log.details}</td>
                        <td className="px-6 py-4 text-sm text-zinc-400">{log.user}</td>
                        <td className="px-6 py-4 text-sm text-zinc-500">{log.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-zinc-800 flex items-center justify-between">
                <p className="text-sm text-zinc-500">Showing 8 of 1,247 entries</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 text-sm hover:bg-zinc-700 transition-colors">
                    Previous
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 text-sm hover:bg-zinc-700 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* REPORTS TAB */}
        {activeTab === "reports" && (
          <motion.div
            key="reports"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Report Generation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Monthly Summary", description: "Comprehensive monthly compliance report", icon: Calendar, color: "emerald" },
                { name: "DNC Audit Report", description: "DNC list status and scrub history", icon: PhoneOff, color: "red" },
                { name: "Consent Report", description: "All consent records and expiration dates", icon: FileCheck, color: "blue" },
              ].map((report, i) => (
                <motion.div
                  key={report.name}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className={cn(
                    "p-3 rounded-lg w-fit mb-4",
                    report.color === "emerald" ? "bg-emerald-500/10" :
                    report.color === "red" ? "bg-red-500/10" :
                    "bg-blue-500/10"
                  )}>
                    <report.icon className={cn(
                      "w-6 h-6",
                      report.color === "emerald" ? "text-emerald-400" :
                      report.color === "red" ? "text-red-400" :
                      "text-blue-400"
                    )} />
                  </div>
                  <h3 className="text-white font-medium mb-1">{report.name}</h3>
                  <p className="text-sm text-zinc-500 mb-4">{report.description}</p>
                  <button className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 font-medium">
                    Generate Report <ArrowUpRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Recent Reports */}
            <motion.div
              className="rounded-xl bg-zinc-900/50 border border-zinc-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="p-6 border-b border-zinc-800">
                <h3 className="text-lg font-semibold text-white">Recent Reports</h3>
                <p className="text-sm text-zinc-500">Generated compliance reports</p>
              </div>
              <div className="divide-y divide-zinc-800/50">
                {complianceReports.map((report, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "p-2 rounded-lg",
                        report.type === "monthly" ? "bg-emerald-500/10" :
                        report.type === "quarterly" ? "bg-purple-500/10" :
                        report.type === "annual" ? "bg-blue-500/10" :
                        "bg-zinc-700"
                      )}>
                        <FileText className={cn(
                          "w-5 h-5",
                          report.type === "monthly" ? "text-emerald-400" :
                          report.type === "quarterly" ? "text-purple-400" :
                          report.type === "annual" ? "text-blue-400" :
                          "text-zinc-400"
                        )} />
                      </div>
                      <div>
                        <p className="text-sm text-white">{report.name}</p>
                        <p className="text-xs text-zinc-500">{report.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium",
                        report.status === "current" ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-700 text-zinc-400"
                      )}>
                        {report.status}
                      </span>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-white text-xs font-medium hover:bg-zinc-700 transition-colors">
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* STATE REGULATIONS TAB */}
        {activeTab === "regulations" && (
          <motion.div
            key="regulations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Quick Reference */}
            <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">State-by-State Compliance</h4>
                  <p className="text-xs text-zinc-400">
                    Each state has specific telemarketing regulations. AgentSixx automatically applies the correct
                    calling hours, DNC requirements, and consent rules based on the lead&apos;s location.
                  </p>
                </div>
              </div>
            </div>

            {/* State Calling Windows */}
            <motion.div
              className="rounded-xl bg-zinc-900/50 border border-zinc-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="p-6 border-b border-zinc-800">
                <h3 className="text-lg font-semibold text-white">State Calling Windows</h3>
                <p className="text-sm text-zinc-500">Current compliance status by state</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
                {stateCallingWindows.map((stateInfo) => (
                  <div
                    key={stateInfo.state}
                    className={cn(
                      "p-4 rounded-lg border",
                      stateInfo.currentlyAllowed
                        ? "bg-emerald-500/5 border-emerald-500/20"
                        : "bg-red-500/5 border-red-500/20"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold text-white">{stateInfo.state}</span>
                      <span className={cn(
                        "w-2 h-2 rounded-full",
                        stateInfo.currentlyAllowed ? "bg-emerald-500" : "bg-red-500"
                      )} />
                    </div>
                    <p className="text-xs text-zinc-400 mb-1">{stateInfo.name}</p>
                    <p className="text-sm text-white">{stateInfo.startTime} - {stateInfo.endTime}</p>
                    <p className="text-xs text-zinc-500">{stateInfo.timezone}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Detailed Regulations Table */}
            <motion.div
              className="rounded-xl bg-zinc-900/50 border border-zinc-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-6 border-b border-zinc-800">
                <h3 className="text-lg font-semibold text-white">State Regulations Reference</h3>
                <p className="text-sm text-zinc-500">Detailed requirements by state</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">State</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Calling Hours</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">DNC Status</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Two-Party</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Special Requirements</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Penalty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {stateRegulations.map((state) => (
                      <tr key={state.code} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-white">{state.code}</span>
                            <span className="text-xs text-zinc-500">{state.state}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-400">{state.callingHours}</td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                            {state.dncStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {state.twoPartyConsent ? (
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <XCircle className="w-5 h-5 text-zinc-600" />
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-400 max-w-xs">{state.specialReqs}</td>
                        <td className="px-6 py-4 text-sm text-red-400 font-medium">{state.penaltyPerViolation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add DNC Modal */}
      <AnimatePresence>
        {showAddDncModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddDncModal(false)}
          >
            <motion.div
              className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 w-full max-w-md"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Add Number to DNC List</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="(555) 555-5555"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Reason</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-emerald-500/50">
                    <option value="user_request">User Request (STOP)</option>
                    <option value="verbal_request">Verbal Request</option>
                    <option value="written_request">Written Request</option>
                    <option value="internal">Internal DNC</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Notes (Optional)</label>
                  <textarea
                    placeholder="Additional context..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 resize-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddDncModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-800 text-white text-sm font-medium hover:bg-zinc-700 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-400 transition-colors">
                  Add to DNC List
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
