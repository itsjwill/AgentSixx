"use client";

import { DashboardCard } from "@/components/custom/dashboard-card";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Plus,
  List,
  Grid3X3,
  Video,
  Building2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Mail,
  RefreshCw,
  ArrowRight,
  CalendarCheck,
  CalendarX,
  Bell,
  Send,
  Filter,
  Search,
  MoreVertical,
  PhoneCall,
  UserCheck,
  Target,
  Zap,
  X,
  Check,
  CalendarClock,
  ChevronDown,
} from "lucide-react";

// Comprehensive mock appointments data
const appointments = [
  {
    id: 1,
    lead: "John Smith",
    phone: "(602) 555-0123",
    email: "john.smith@email.com",
    type: "showing",
    property: "4521 E Cactus Rd, Phoenix",
    dealType: "Buyer - First Time",
    date: "2026-04-13",
    time: "10:00 AM",
    duration: "1 hour",
    status: "confirmed",
    confirmationSent: true,
    reminderSent: true,
    source: "AI Call",
    notes: "First-time buyer, interested in 3BR homes, pre-approved $450K",
    outcome: null,
  },
  {
    id: 2,
    lead: "Sarah Johnson",
    phone: "(480) 555-0456",
    email: "sarah.j@gmail.com",
    type: "listing",
    property: "8732 N Scottsdale Rd, Scottsdale",
    dealType: "Seller - Luxury",
    date: "2026-04-13",
    time: "2:00 PM",
    duration: "45 min",
    status: "confirmed",
    confirmationSent: true,
    reminderSent: false,
    source: "AI Call",
    notes: "Listing presentation for $1.2M property, motivated seller",
    outcome: null,
  },
  {
    id: 3,
    lead: "Mike Wilson",
    phone: "(623) 555-0789",
    email: "mike.wilson@corp.com",
    type: "virtual",
    property: "Virtual Tour - 3 Properties",
    dealType: "Buyer - Relocation",
    date: "2026-04-13",
    time: "4:30 PM",
    duration: "30 min",
    status: "pending",
    confirmationSent: true,
    reminderSent: false,
    source: "Website Lead",
    notes: "Relocation from Texas, remote buyer, budget $500K-700K",
    outcome: null,
  },
  {
    id: 4,
    lead: "Lisa Brown",
    phone: "(520) 555-0321",
    email: "lisa.brown@invest.com",
    type: "showing",
    property: "1256 W Baseline Rd, Mesa",
    dealType: "Investor - Rental",
    date: "2026-04-14",
    time: "11:00 AM",
    duration: "1 hour",
    status: "confirmed",
    confirmationSent: true,
    reminderSent: false,
    source: "AI Call",
    notes: "Investment property interest, owns 3 rentals already",
    outcome: null,
  },
  {
    id: 5,
    lead: "David Lee",
    phone: "(928) 555-0654",
    email: "david.lee@email.com",
    type: "consultation",
    property: "Office Meeting",
    dealType: "Buyer - Pre-Approval",
    date: "2026-04-14",
    time: "3:00 PM",
    duration: "1 hour",
    status: "pending",
    confirmationSent: false,
    reminderSent: false,
    source: "Referral",
    notes: "Pre-approval discussion, budget $600K-800K",
    outcome: null,
  },
  {
    id: 6,
    lead: "Emily Chen",
    phone: "(602) 555-0987",
    email: "emily.chen@luxury.com",
    type: "showing",
    property: "9823 E Shea Blvd, Scottsdale",
    dealType: "Buyer - Luxury",
    date: "2026-04-15",
    time: "9:00 AM",
    duration: "1 hour",
    status: "confirmed",
    confirmationSent: true,
    reminderSent: false,
    source: "AI Call",
    notes: "Luxury buyer, looking for pool home, cash buyer",
    outcome: null,
  },
  {
    id: 7,
    lead: "Robert Martinez",
    phone: "(480) 555-1234",
    email: "rob.martinez@email.com",
    type: "showing",
    property: "3421 N 44th St, Phoenix",
    dealType: "Buyer - Upgrade",
    date: "2026-04-15",
    time: "2:00 PM",
    duration: "1 hour",
    status: "rescheduled",
    confirmationSent: true,
    reminderSent: false,
    source: "AI Call",
    notes: "Upgrading from current home, needs 4BR for growing family",
    outcome: null,
  },
  {
    id: 8,
    lead: "Amanda White",
    phone: "(623) 555-5678",
    email: "amanda.white@corp.com",
    type: "listing",
    property: "7890 W Camelback Rd, Glendale",
    dealType: "Seller - Downsizing",
    date: "2026-04-16",
    time: "10:30 AM",
    duration: "45 min",
    status: "confirmed",
    confirmationSent: true,
    reminderSent: false,
    source: "Website Lead",
    notes: "Empty nesters downsizing, home paid off",
    outcome: null,
  },
  {
    id: 9,
    lead: "James Thompson",
    phone: "(520) 555-9012",
    email: "james.t@email.com",
    type: "virtual",
    property: "Virtual Tour - 5 Properties",
    dealType: "Investor - Portfolio",
    date: "2026-04-17",
    time: "1:00 PM",
    duration: "45 min",
    status: "pending",
    confirmationSent: false,
    reminderSent: false,
    source: "AI Call",
    notes: "Building rental portfolio, looking for multi-family",
    outcome: null,
  },
  {
    id: 10,
    lead: "Karen Davis",
    phone: "(602) 555-3456",
    email: "karen.davis@gmail.com",
    type: "consultation",
    property: "Office Meeting",
    dealType: "Seller - Inherited",
    date: "2026-04-18",
    time: "11:00 AM",
    duration: "1 hour",
    status: "confirmed",
    confirmationSent: true,
    reminderSent: false,
    source: "Referral",
    notes: "Inherited property, needs guidance on selling process",
    outcome: null,
  },
  {
    id: 11,
    lead: "Chris Anderson",
    phone: "(480) 555-7890",
    email: "chris.a@email.com",
    type: "showing",
    property: "2156 E Thomas Rd, Phoenix",
    dealType: "Buyer - First Time",
    date: "2026-04-19",
    time: "10:00 AM",
    duration: "1 hour",
    status: "confirmed",
    confirmationSent: true,
    reminderSent: false,
    source: "AI Call",
    notes: "First-time buyer, pre-approved $380K, flexible on location",
    outcome: null,
  },
];

// Past appointments with outcomes
const pastAppointments = [
  {
    id: 101,
    lead: "Patricia Moore",
    phone: "(602) 555-1111",
    type: "showing",
    property: "5678 N Central Ave, Phoenix",
    dealType: "Buyer - Upgrade",
    date: "2026-04-12",
    time: "10:00 AM",
    status: "showed",
    outcome: "closed",
    notes: "Signed contract same day, $520K purchase",
  },
  {
    id: 102,
    lead: "Thomas Harris",
    phone: "(480) 555-2222",
    type: "listing",
    property: "9012 E Indian School Rd, Scottsdale",
    dealType: "Seller - Relocation",
    date: "2026-04-12",
    time: "2:00 PM",
    status: "showed",
    outcome: "follow_up",
    notes: "Needs to review comparative analysis, following up Friday",
  },
  {
    id: 103,
    lead: "Jennifer Clark",
    phone: "(623) 555-3333",
    type: "virtual",
    property: "Virtual Tour - 2 Properties",
    dealType: "Buyer - Investment",
    date: "2026-04-11",
    time: "3:00 PM",
    status: "no_show",
    outcome: "re_engaged",
    notes: "Rescheduled to April 17th, had emergency",
  },
  {
    id: 104,
    lead: "William Taylor",
    phone: "(520) 555-4444",
    type: "consultation",
    property: "Office Meeting",
    dealType: "Seller - Divorce",
    date: "2026-04-11",
    time: "11:00 AM",
    status: "showed",
    outcome: "closed",
    notes: "Signed listing agreement, $680K property",
  },
  {
    id: 105,
    lead: "Nancy Robinson",
    phone: "(602) 555-5555",
    type: "showing",
    property: "3456 W Glendale Ave, Glendale",
    dealType: "Buyer - Downsize",
    date: "2026-04-10",
    time: "1:00 PM",
    status: "no_show",
    outcome: "lost",
    notes: "No response to re-engagement attempts",
  },
  {
    id: 106,
    lead: "Daniel King",
    phone: "(480) 555-6666",
    type: "showing",
    property: "7890 E Camelback Rd, Scottsdale",
    dealType: "Buyer - Luxury",
    date: "2026-04-10",
    time: "4:00 PM",
    status: "showed",
    outcome: "follow_up",
    notes: "Interested but wants to see 2 more properties",
  },
];

// Generate calendar days for current month
const generateCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  const days = [];

  for (let i = 0; i < startingDay; i++) {
    const prevMonthDay = new Date(year, month, -startingDay + i + 1);
    days.push({ date: prevMonthDay, isCurrentMonth: false });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ date: new Date(year, month, i), isCurrentMonth: true });
  }

  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
  }

  return days;
};

const typeConfig: Record<string, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  showing: { label: "Property Showing", icon: Building2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  listing: { label: "Listing Appointment", icon: MapPin, color: "text-violet-400", bg: "bg-violet-500/10" },
  virtual: { label: "Virtual Tour", icon: Video, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  consultation: { label: "Consultation", icon: User, color: "text-amber-400", bg: "bg-amber-500/10" },
};

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  confirmed: { label: "Confirmed", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", icon: CheckCircle2 },
  pending: { label: "Pending", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", icon: AlertCircle },
  rescheduled: { label: "Rescheduled", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", icon: RefreshCw },
  cancelled: { label: "Cancelled", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", icon: XCircle },
  showed: { label: "Showed", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", icon: CheckCircle2 },
  no_show: { label: "No Show", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", icon: XCircle },
};

const outcomeConfig: Record<string, { label: string; color: string }> = {
  closed: { label: "Closed", color: "text-emerald-400" },
  follow_up: { label: "Follow Up", color: "text-amber-400" },
  re_engaged: { label: "Re-engaged", color: "text-blue-400" },
  lost: { label: "Lost", color: "text-red-400" },
};

export default function AppointmentsPage() {
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 13));
  const [selectedDate, setSelectedDate] = useState<string>("2026-04-13");
  const [showQuickSchedule, setShowQuickSchedule] = useState(false);
  const [activeTab, setActiveTab] = useState<"today" | "upcoming" | "history">("today");
  const [selectedAppointment, setSelectedAppointment] = useState<typeof appointments[0] | null>(null);

  const calendarDays = generateCalendarDays(currentDate.getFullYear(), currentDate.getMonth());
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const formatDateString = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const getAppointmentsForDate = (dateString: string) => {
    return appointments.filter(apt => apt.date === dateString);
  };

  const selectedDateAppointments = selectedDate ? getAppointmentsForDate(selectedDate) : [];

  const todayAppointments = appointments.filter(apt => apt.date === "2026-04-13");
  const thisWeekAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    const today = new Date(2026, 3, 13);
    const weekEnd = new Date(2026, 3, 19);
    return aptDate >= today && aptDate <= weekEnd;
  });

  // Stats calculations
  const totalThisWeek = thisWeekAppointments.length;
  const confirmedCount = thisWeekAppointments.filter(a => a.status === "confirmed").length;
  const pendingConfirmations = thisWeekAppointments.filter(a => a.status === "pending").length;
  const completedToday = pastAppointments.filter(a => a.date === "2026-04-12" && a.status === "showed").length;

  // Show-up rate calculation from past appointments
  const totalPast = pastAppointments.length;
  const showedUp = pastAppointments.filter(a => a.status === "showed").length;
  const showUpRate = totalPast > 0 ? Math.round((showedUp / totalPast) * 100) : 0;

  // No-show analysis
  const noShows = pastAppointments.filter(a => a.status === "no_show");
  const noShowRate = totalPast > 0 ? Math.round((noShows.length / totalPast) * 100) : 0;
  const reEngaged = noShows.filter(a => a.outcome === "re_engaged").length;

  // Pipeline stats
  const pipelineStats = {
    scheduled: totalThisWeek,
    confirmed: confirmedCount,
    showed: showedUp,
    closed: pastAppointments.filter(a => a.outcome === "closed").length,
  };

  // Confirmation queue
  const confirmationQueue = appointments.filter(a => !a.confirmationSent || a.status === "pending");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Appointments</h1>
          <p className="text-zinc-400 text-sm mt-1">Manage your scheduled showings, listings, and meetings</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-zinc-900 rounded-lg p-1 border border-zinc-800">
            <button
              onClick={() => setView("calendar")}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm transition-colors flex items-center gap-2",
                view === "calendar" ? "bg-emerald-500/20 text-emerald-400" : "text-zinc-400 hover:text-white"
              )}
            >
              <Grid3X3 className="w-4 h-4" />
              <span className="hidden sm:inline">Calendar</span>
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm transition-colors flex items-center gap-2",
                view === "list" ? "bg-emerald-500/20 text-emerald-400" : "text-zinc-400 hover:text-white"
              )}
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>
          <button
            onClick={() => setShowQuickSchedule(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Schedule</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <DashboardCard hover={false}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider">This Week</p>
                <p className="text-3xl font-bold text-white mt-1">{totalThisWeek}</p>
                <p className="text-xs text-zinc-400 mt-1">appointments scheduled</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </DashboardCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <DashboardCard hover={false}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider">Show-up Rate</p>
                <p className="text-3xl font-bold text-white mt-1">{showUpRate}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span className="text-xs text-emerald-400">+5% vs last week</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </DashboardCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DashboardCard hover={false}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider">Pending</p>
                <p className="text-3xl font-bold text-white mt-1">{pendingConfirmations}</p>
                <p className="text-xs text-amber-400 mt-1">need confirmation</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-400" />
              </div>
            </div>
          </DashboardCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <DashboardCard hover={false}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider">Yesterday</p>
                <p className="text-3xl font-bold text-white mt-1">{completedToday}</p>
                <p className="text-xs text-zinc-400 mt-1">completed appointments</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-violet-400" />
              </div>
            </div>
          </DashboardCard>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Calendar or List */}
        <div className="min-w-0 space-y-6">
          {view === "calendar" ? (
            <DashboardCard hover={false}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'white' }}>
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-zinc-400" />
                  </button>
                  <button
                    onClick={() => {
                      setCurrentDate(new Date(2026, 3, 13));
                      setSelectedDate("2026-04-13");
                    }}
                    className="px-3 py-1 text-sm text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, 1fr)',
                  gap: '4px',
                  width: '100%'
                }}
              >
                {dayNames.map(day => (
                  <div key={day} style={{ padding: '8px', textAlign: 'center', fontSize: '12px', color: '#71717a' }}>
                    {day}
                  </div>
                ))}

                {calendarDays.map((day, i) => {
                  const dateString = formatDateString(day.date);
                  const dayAppointments = getAppointmentsForDate(dateString);
                  const isToday = dateString === "2026-04-13";
                  const isSelected = dateString === selectedDate;

                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(dateString)}
                      style={{
                        padding: '8px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        height: '70px',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: isSelected ? 'rgba(16, 185, 129, 0.2)' : isToday ? '#27272a' : 'transparent',
                        color: day.isCurrentMonth ? '#d4d4d8' : '#52525b',
                        border: isSelected ? '1px solid rgba(16, 185, 129, 0.5)' : isToday ? '1px solid #3f3f46' : 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <span style={{
                        fontWeight: 500,
                        textAlign: 'left',
                        color: isToday ? '#34d399' : undefined
                      }}>
                        {day.date.getDate()}
                      </span>
                      {dayAppointments.length > 0 && (
                        <div style={{ marginTop: 'auto', width: '100%' }}>
                          {dayAppointments.slice(0, 2).map((apt) => (
                            <div
                              key={apt.id}
                              style={{
                                width: '100%',
                                height: '4px',
                                borderRadius: '2px',
                                marginBottom: '2px',
                                backgroundColor: apt.status === "confirmed" ? "#10b981" :
                                  apt.status === "pending" ? "#f59e0b" :
                                  apt.status === "rescheduled" ? "#3b82f6" : "#ef4444"
                              }}
                            />
                          ))}
                          {dayAppointments.length > 2 && (
                            <span style={{ fontSize: '10px', color: '#71717a', display: 'block', textAlign: 'center' }}>
                              +{dayAppointments.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-4 pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-zinc-400">Confirmed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-xs text-zinc-400">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-xs text-zinc-400">Rescheduled</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-xs text-zinc-400">Cancelled</span>
                </div>
              </div>
            </DashboardCard>
          ) : (
            /* List View */
            <DashboardCard hover={false}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-semibold text-white">All Appointments</h2>
                  <div className="flex items-center bg-zinc-800 rounded-lg p-1">
                    {["today", "upcoming", "history"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab as typeof activeTab)}
                        className={cn(
                          "px-3 py-1 rounded-md text-xs font-medium transition-colors capitalize",
                          activeTab === tab
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "text-zinc-400 hover:text-white"
                        )}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-9 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 w-48"
                    />
                  </div>
                  <button className="p-2 bg-zinc-800 border border-zinc-700 rounded-lg hover:border-zinc-600 transition-colors">
                    <Filter className="w-4 h-4 text-zinc-400" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left text-xs font-medium text-zinc-500 uppercase pb-3">Lead</th>
                      <th className="text-left text-xs font-medium text-zinc-500 uppercase pb-3">Type</th>
                      <th className="text-left text-xs font-medium text-zinc-500 uppercase pb-3">Property/Deal</th>
                      <th className="text-left text-xs font-medium text-zinc-500 uppercase pb-3">Date & Time</th>
                      <th className="text-left text-xs font-medium text-zinc-500 uppercase pb-3">Status</th>
                      <th className="text-left text-xs font-medium text-zinc-500 uppercase pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {(activeTab === "history" ? pastAppointments : activeTab === "today" ? todayAppointments : thisWeekAppointments).map((apt, i) => {
                      const TypeIcon = typeConfig[apt.type]?.icon || Calendar;
                      const StatusIcon = statusConfig[apt.status]?.icon || AlertCircle;
                      return (
                        <motion.tr
                          key={apt.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.03 }}
                          className="hover:bg-zinc-800/30 cursor-pointer"
                          onClick={() => setSelectedAppointment(apt as typeof appointments[0])}
                        >
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-medium">
                                {apt.lead.split(" ").map(n => n[0]).join("")}
                              </div>
                              <div>
                                <p className="text-white font-medium text-sm">{apt.lead}</p>
                                <p className="text-xs text-zinc-500">{apt.phone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", typeConfig[apt.type]?.bg)}>
                                <TypeIcon className={cn("w-3.5 h-3.5", typeConfig[apt.type]?.color)} />
                              </div>
                              <span className="text-sm text-zinc-400">{typeConfig[apt.type]?.label}</span>
                            </div>
                          </td>
                          <td className="py-4">
                            <p className="text-sm text-zinc-300 max-w-[200px] truncate">{apt.property}</p>
                            <p className="text-xs text-zinc-500">{apt.dealType}</p>
                          </td>
                          <td className="py-4">
                            <p className="text-sm text-white">{new Date(apt.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</p>
                            <p className="text-xs text-zinc-500">{apt.time}</p>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <span className={cn("px-2.5 py-1 text-xs rounded-full border flex items-center gap-1.5", statusConfig[apt.status]?.bg)}>
                                <StatusIcon className={cn("w-3 h-3", statusConfig[apt.status]?.color)} />
                                <span className={statusConfig[apt.status]?.color}>{statusConfig[apt.status]?.label}</span>
                              </span>
                              {activeTab === "history" && "outcome" in apt && apt.outcome && (
                                <span className={cn("text-xs", outcomeConfig[apt.outcome]?.color)}>
                                  {outcomeConfig[apt.outcome]?.label}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-1">
                              <button className="p-1.5 rounded hover:bg-zinc-800 transition-colors" title="Call">
                                <Phone className="w-4 h-4 text-zinc-400 hover:text-emerald-400" />
                              </button>
                              <button className="p-1.5 rounded hover:bg-zinc-800 transition-colors" title="Message">
                                <MessageSquare className="w-4 h-4 text-zinc-400 hover:text-cyan-400" />
                              </button>
                              <button className="p-1.5 rounded hover:bg-zinc-800 transition-colors" title="More">
                                <MoreVertical className="w-4 h-4 text-zinc-400" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </DashboardCard>
          )}

          {/* Appointment Pipeline */}
          <DashboardCard hover={false}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Appointment Pipeline</h2>
              <span className="text-xs text-zinc-500">Last 7 days</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { stage: "Scheduled", count: pipelineStats.scheduled, color: "bg-zinc-500", icon: Calendar },
                { stage: "Confirmed", count: pipelineStats.confirmed, color: "bg-emerald-500", icon: CheckCircle2 },
                { stage: "Showed", count: pipelineStats.showed, color: "bg-cyan-500", icon: UserCheck },
                { stage: "Closed", count: pipelineStats.closed, color: "bg-violet-500", icon: Target },
              ].map((item, i) => (
                <motion.div
                  key={item.stage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="flex flex-col items-center p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-3", item.color.replace("bg-", "bg-") + "/20")}>
                      <item.icon className={cn("w-5 h-5", item.color.replace("bg-", "text-").replace("-500", "-400"))} />
                    </div>
                    <p className="text-2xl font-bold text-white">{item.count}</p>
                    <p className="text-xs text-zinc-500 mt-1">{item.stage}</p>
                    {i < 3 && (
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 hidden sm:block">
                        <ArrowRight className="w-4 h-4 text-zinc-600" />
                      </div>
                    )}
                  </div>
                  {i < 3 && (
                    <div className="absolute -right-4 top-[52px] text-xs text-zinc-500 hidden sm:block">
                      {i === 0 ? `${pipelineStats.scheduled > 0 ? Math.round((pipelineStats.confirmed / pipelineStats.scheduled) * 100) : 0}%` :
                       i === 1 ? `${pipelineStats.confirmed > 0 ? Math.round((pipelineStats.showed / pipelineStats.confirmed) * 100) : 0}%` :
                       `${pipelineStats.showed > 0 ? Math.round((pipelineStats.closed / pipelineStats.showed) * 100) : 0}%`}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </DashboardCard>

          {/* This Week - moved from right column for balance */}
          <DashboardCard hover={false}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CalendarClock className="w-4 h-4 text-cyan-400" />
                <h2 className="text-base font-semibold text-white">This Week</h2>
              </div>
              <span className="text-xs text-zinc-500">{thisWeekAppointments.length} total</span>
            </div>
            <div className="space-y-2">
              {thisWeekAppointments.slice(0, 5).map((apt, i) => (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800/30 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedDate(apt.date);
                    setSelectedAppointment(apt);
                  }}
                >
                  <div className="flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700">
                    <span className="text-[10px] text-zinc-500 uppercase">
                      {new Date(apt.date).toLocaleDateString("en-US", { weekday: "short" })}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {new Date(apt.date).getDate()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{apt.lead}</p>
                    <p className="text-xs text-zinc-500">{apt.time} - {typeConfig[apt.type]?.label}</p>
                  </div>
                  <div className={cn(
                    "w-2 h-2 rounded-full flex-shrink-0",
                    apt.status === "confirmed" ? "bg-emerald-500" :
                    apt.status === "pending" ? "bg-amber-500" : "bg-blue-500"
                  )} />
                </motion.div>
              ))}
            </div>
            {thisWeekAppointments.length > 5 && (
              <button
                onClick={() => setView("list")}
                className="w-full mt-3 py-2 text-xs text-zinc-400 hover:text-emerald-400 transition-colors flex items-center justify-center gap-1"
              >
                View all appointments
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </DashboardCard>
        </div>

        {/* Right Column - Details & Actions */}
        <div className="min-w-0 space-y-6">
          {/* Selected Day / Today's Appointments */}
          <DashboardCard hover={false}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">
                {view === "calendar"
                  ? (selectedDate === "2026-04-13" ? "Today" : new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }))
                  : "Today's Schedule"
                }
              </h2>
              <span className="text-xs text-zinc-500">
                {(view === "calendar" ? selectedDateAppointments : todayAppointments).length} appointments
              </span>
            </div>

            <AnimatePresence mode="wait">
              {(view === "calendar" ? selectedDateAppointments : todayAppointments).length > 0 ? (
                <motion.div
                  key={selectedDate}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {(view === "calendar" ? selectedDateAppointments : todayAppointments).map((apt, i) => {
                    const TypeIcon = typeConfig[apt.type]?.icon || Calendar;
                    const StatusIcon = statusConfig[apt.status]?.icon || AlertCircle;
                    return (
                      <motion.div
                        key={apt.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setSelectedAppointment(apt)}
                        className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 hover:border-emerald-500/30 transition-all cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={cn("w-6 h-6 rounded-md flex items-center justify-center", typeConfig[apt.type]?.bg)}>
                              <TypeIcon className={cn("w-3 h-3", typeConfig[apt.type]?.color)} />
                            </div>
                            <span className="text-xs text-zinc-500">{typeConfig[apt.type]?.label}</span>
                          </div>
                          <span className={cn("px-2 py-0.5 text-xs rounded-full border flex items-center gap-1", statusConfig[apt.status]?.bg)}>
                            <StatusIcon className={cn("w-2.5 h-2.5", statusConfig[apt.status]?.color)} />
                            <span className={statusConfig[apt.status]?.color}>{statusConfig[apt.status]?.label}</span>
                          </span>
                        </div>
                        <h3 className="font-medium text-white group-hover:text-emerald-400 transition-colors">{apt.lead}</h3>
                        <p className="text-xs text-zinc-500 mt-1 truncate">{apt.property}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-3 text-xs text-zinc-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {apt.time}
                            </span>
                            <span>{apt.duration}</span>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1 rounded hover:bg-zinc-700 transition-colors" title="Confirm">
                              <Check className="w-3 h-3 text-emerald-400" />
                            </button>
                            <button className="p-1 rounded hover:bg-zinc-700 transition-colors" title="Reschedule">
                              <RefreshCw className="w-3 h-3 text-blue-400" />
                            </button>
                            <button className="p-1 rounded hover:bg-zinc-700 transition-colors" title="Cancel">
                              <X className="w-3 h-3 text-red-400" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mb-4">
                    <Calendar className="w-8 h-8 text-zinc-600" />
                  </div>
                  <p className="text-zinc-400 text-sm">No appointments scheduled</p>
                  <p className="text-zinc-500 text-xs mt-1">Select a date or add a new appointment</p>
                  <button
                    onClick={() => setShowQuickSchedule(true)}
                    className="mt-4 text-emerald-400 text-sm hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    Add appointment
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </DashboardCard>

          {/* Confirmation Queue */}
          <DashboardCard hover={false}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-400" />
                <h2 className="text-base font-semibold text-white">Confirmation Queue</h2>
              </div>
              <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-xs rounded-full border border-amber-500/20">
                {confirmationQueue.length} pending
              </span>
            </div>
            <div className="space-y-2">
              {confirmationQueue.slice(0, 4).map((apt, i) => (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-2 rounded-lg bg-zinc-800/30 hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0">
                      {apt.lead.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-white truncate">{apt.lead}</p>
                      <p className="text-xs text-zinc-500">{apt.time} - {new Date(apt.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button className="p-1.5 rounded hover:bg-zinc-700 transition-colors" title="Send SMS">
                      <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-zinc-700 transition-colors" title="Call">
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            {confirmationQueue.length > 4 && (
              <button className="w-full mt-3 py-2 text-xs text-zinc-400 hover:text-emerald-400 transition-colors">
                View all {confirmationQueue.length} pending
              </button>
            )}
          </DashboardCard>

          {/* No-Show Analysis */}
          <DashboardCard hover={false}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CalendarX className="w-4 h-4 text-red-400" />
                <h2 className="text-base font-semibold text-white">No-Show Analysis</h2>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">No-show Rate</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-white">{noShowRate}%</span>
                  <div className="flex items-center gap-0.5 text-red-400">
                    <TrendingDown className="w-3 h-3" />
                    <span className="text-xs">-2%</span>
                  </div>
                </div>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all"
                  style={{ width: `${noShowRate}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-zinc-800/50">
                  <p className="text-xs text-zinc-500">Re-engaged</p>
                  <p className="text-lg font-bold text-emerald-400">{reEngaged}/{noShows.length}</p>
                </div>
                <div className="p-3 rounded-lg bg-zinc-800/50">
                  <p className="text-xs text-zinc-500">Lost Forever</p>
                  <p className="text-lg font-bold text-red-400">{noShows.length - reEngaged}/{noShows.length}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-zinc-800">
                <p className="text-xs text-zinc-500 mb-2">Common Reasons</p>
                <div className="space-y-1">
                  {[
                    { reason: "Forgot about appointment", pct: 45 },
                    { reason: "Emergency/conflict", pct: 30 },
                    { reason: "Changed mind", pct: 15 },
                    { reason: "No response", pct: 10 },
                  ].map((item) => (
                    <div key={item.reason} className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">{item.reason}</span>
                      <span className="text-zinc-500">{item.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>

      {/* Quick Schedule Modal */}
      <AnimatePresence>
        {showQuickSchedule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowQuickSchedule(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-zinc-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <CalendarCheck className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">Schedule Appointment</h2>
                      <p className="text-xs text-zinc-500">Add a new appointment manually</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowQuickSchedule(false)}
                    className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                  >
                    <X className="w-5 h-5 text-zinc-400" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">Lead Name *</label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      className="w-full px-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="(555) 123-4567"
                      className="w-full px-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">Email</label>
                  <input
                    type="email"
                    placeholder="john@email.com"
                    className="w-full px-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">Appointment Type *</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none cursor-pointer">
                      <option value="">Select type...</option>
                      <option value="showing">Property Showing</option>
                      <option value="listing">Listing Appointment</option>
                      <option value="virtual">Virtual Tour</option>
                      <option value="consultation">Consultation</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">Property/Location</label>
                  <input
                    type="text"
                    placeholder="123 Main St, Phoenix, AZ"
                    className="w-full px-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">Date *</label>
                    <input
                      type="date"
                      defaultValue="2026-04-14"
                      className="w-full px-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">Time *</label>
                    <input
                      type="time"
                      defaultValue="10:00"
                      className="w-full px-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5">Duration</label>
                    <div className="relative">
                      <select className="w-full px-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none cursor-pointer">
                        <option value="30">30 min</option>
                        <option value="45">45 min</option>
                        <option value="60" selected>1 hour</option>
                        <option value="90">1.5 hours</option>
                        <option value="120">2 hours</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5">Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Additional notes about the appointment..."
                    className="w-full px-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0" />
                    <span className="text-sm text-zinc-400">Send confirmation SMS</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0" />
                    <span className="text-sm text-zinc-400">Send email</span>
                  </label>
                </div>
              </div>
              <div className="p-6 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowQuickSchedule(false)}
                  className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 transition-colors font-medium text-sm">
                  <CalendarCheck className="w-4 h-4" />
                  Schedule Appointment
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Appointment Detail Modal */}
      <AnimatePresence>
        {selectedAppointment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAppointment(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-zinc-800">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-medium">
                      {selectedAppointment.lead.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">{selectedAppointment.lead}</h2>
                      <p className="text-sm text-zinc-500">{selectedAppointment.dealType}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAppointment(null)}
                    className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                  >
                    <X className="w-5 h-5 text-zinc-400" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const TypeIcon = typeConfig[selectedAppointment.type]?.icon || Calendar;
                      return (
                        <>
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", typeConfig[selectedAppointment.type]?.bg)}>
                            <TypeIcon className={cn("w-4 h-4", typeConfig[selectedAppointment.type]?.color)} />
                          </div>
                          <span className="text-sm text-zinc-300">{typeConfig[selectedAppointment.type]?.label}</span>
                        </>
                      );
                    })()}
                  </div>
                  <span className={cn("px-3 py-1 text-xs rounded-full border", statusConfig[selectedAppointment.status]?.bg, statusConfig[selectedAppointment.status]?.color)}>
                    {statusConfig[selectedAppointment.status]?.label}
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-zinc-500" />
                    <span className="text-zinc-300">
                      {new Date(selectedAppointment.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-zinc-500" />
                    <span className="text-zinc-300">{selectedAppointment.time} ({selectedAppointment.duration})</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-zinc-500" />
                    <span className="text-zinc-300">{selectedAppointment.property}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-zinc-500" />
                    <span className="text-zinc-300">{selectedAppointment.phone}</span>
                  </div>
                  {selectedAppointment.email && (
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-zinc-500" />
                      <span className="text-zinc-300">{selectedAppointment.email}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <Zap className="w-4 h-4 text-zinc-500" />
                    <span className="text-zinc-300">Source: {selectedAppointment.source}</span>
                  </div>
                </div>

                {selectedAppointment.notes && (
                  <div className="pt-3 border-t border-zinc-800">
                    <p className="text-xs text-zinc-500 mb-1">Notes</p>
                    <p className="text-sm text-zinc-300">{selectedAppointment.notes}</p>
                  </div>
                )}

                <div className="pt-3 border-t border-zinc-800">
                  <p className="text-xs text-zinc-500 mb-2">Confirmation Status</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {selectedAppointment.confirmationSent ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-400" />
                      )}
                      <span className="text-sm text-zinc-400">
                        {selectedAppointment.confirmationSent ? "Confirmation sent" : "Not confirmed"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedAppointment.reminderSent ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-zinc-500" />
                      )}
                      <span className="text-sm text-zinc-400">
                        {selectedAppointment.reminderSent ? "Reminder sent" : "No reminder"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-zinc-800">
                <div className="flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 transition-colors font-medium text-sm">
                    <Check className="w-4 h-4" />
                    Confirm
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors text-sm border border-zinc-700">
                    <RefreshCw className="w-4 h-4" />
                    Reschedule
                  </button>
                  <button className="p-2.5 bg-zinc-800 text-red-400 rounded-lg hover:bg-red-500/10 hover:border-red-500/30 transition-colors border border-zinc-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-center gap-4 mt-3">
                  <button className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-emerald-400 transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                    Call
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-cyan-400 transition-colors">
                    <MessageSquare className="w-3.5 h-3.5" />
                    SMS
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-violet-400 transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                    Email
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-amber-400 transition-colors">
                    <Send className="w-3.5 h-3.5" />
                    Send Reminder
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
