"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Star, Play, BadgeCheck, ChevronRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function Avatar({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(" ").map((n) => n[0]).join("");
  if (failed) {
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
        {initials}
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-zinc-800">
      <Image
        src={src}
        alt={name}
        width={40}
        height={40}
        className="w-full h-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

// Animated counter hook
function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!startOnView || isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [end, duration, isInView, startOnView]);

  return { count, ref };
}

const testimonials: Array<{
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  video: boolean;
  rating: number;
  quote: string;
  metrics: Array<{ value: string; label: string }>;
  tag: string;
}> = [
  {
    id: 1,
    name: "Marcus Johnson",
    role: "Broker/Owner",
    company: "Century 21 Elite",
    image: "/testimonials/marcus-j.png",
    video: false,
    rating: 5,
    quote: "Had two agents get complaints filed last year, both from SMS blasts without consent. My E&O premium jumped 38% at renewal. Rolled this out across the office in August. 47 agents, zero complaints since. My insurance guy actually called asking what changed.",
    metrics: [
      { value: "47", label: "agents rolled out" },
      { value: "0", label: "complaints since Aug" },
      { value: "−38%", label: "E&O renewal" },
    ],
    tag: "Brokerage-wide",
  },
  {
    id: 2,
    name: "Jennifer Carter",
    role: "Solo Agent",
    company: "RE/MAX Luxury",
    image: "/testimonials/jennifer-c.png",
    video: false,
    rating: 5,
    quote: "Was working 7am to 10pm trying to match a team's response time. First call in, my lead goes \"is this Jennifer?\" to the bot. Closed a $540K new build in Goodyear last week from a lead that came in while I was at yoga. I'm not kidding.",
    metrics: [
      { value: "$540K", label: "close from yoga class" },
      { value: "14", label: "appts in month 1" },
      { value: "3 hrs", label: "reclaimed/day" },
    ],
    tag: "Solo, no ISA",
  },
  {
    id: 3,
    name: "David Li",
    role: "Team Leader",
    company: "Compass",
    image: "/testimonials/david-l.png",
    video: false,
    rating: 5,
    quote: "Ran Ylopo for a year, then Structurely for six months. Ylopo's chat felt like a phishing attempt. Structurely dropped maybe 20% of my Zillow leads into a black hole. Switched in November. Open houses went from four walk-ins to needing a sign-in sheet. Two buyers are in escrow now.",
    metrics: [
      { value: "2", label: "buyers in escrow" },
      { value: "4 → 22", label: "open house traffic" },
      { value: "3rd", label: "tool tried, first that works" },
    ],
    tag: "Switched",
  },
  {
    id: 4,
    name: "Amanda Foster",
    role: "Luxury Specialist",
    company: "Sotheby's International",
    image: "/testimonials/amanda-f.png",
    video: false,
    rating: 5,
    quote: "A $4.2M buyer texted me at 11pm Tuesday about a Paradise Valley listing. I was asleep. The Voice ISA took the call, qualified him, had him on my calendar for 8am. We closed three weeks later. That one deal covered 18 months of subscription.",
    metrics: [
      { value: "$4.2M", label: "closed in 21 days" },
      { value: "11pm", label: "first touch" },
      { value: "18 mo", label: "subscription paid" },
    ],
    tag: "High-net-worth",
  },
  {
    id: 5,
    name: "Sarah Morales",
    role: "Team Lead",
    company: "Keller Williams Phoenix",
    image: "/testimonials/sarah-m.png",
    video: false,
    rating: 5,
    quote: "Was losing two leads a week to the team down the street who'd pick up at 10pm. After we missed a $680K offer because my ISA didn't answer a Zillow lead for three hours, I was done. First month I booked 14 showings off leads I would've missed. Closed three. Feels like a night-shift version of myself.",
    metrics: [
      { value: "14", label: "showings from missed leads" },
      { value: "3", label: "closed in month 1" },
      { value: "$680K", label: "offer no longer lost" },
    ],
    tag: "Replaced human ISA",
  },
  {
    id: 6,
    name: "Rachel Thomas",
    role: "Team Lead",
    company: "Compass",
    image: "/testimonials/rachel-t.png",
    video: false,
    rating: 5,
    quote: "Five agents, all texting leads in five different voices with five different cadences. One missed a consent update and we almost lost our MLS access. Now every lead hits the system first. Team's close rate went from 2.8% to 4.1%. My compliance manager actually smiled last week.",
    metrics: [
      { value: "2.8 → 4.1%", label: "team close rate" },
      { value: "5", label: "agents unified" },
      { value: "1", label: "MLS scare avoided" },
    ],
    tag: "Team scale",
  },
];

// Company logos for social proof ticker
const companies = [
  "Keller Williams", "RE/MAX", "Century 21", "Coldwell Banker",
  "Sotheby's", "eXp Realty", "Compass", "Berkshire Hathaway",
  "EXIT Realty", "Redfin", "HomeSmart", "Real Broker"
];

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className={`${size === "lg" ? "w-5 h-5" : "w-4 h-4"} fill-amber-400 text-amber-400`} />
      ))}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
      <BadgeCheck className="w-3.5 h-3.5" />
      <span>Verified</span>
    </div>
  );
}

export function TestimonialsSection() {
  const agents = useCounter(500, 2000);
  const appointments = useCounter(50, 2000);
  const roi = useCounter(18, 1500);

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.1),transparent)]" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            500+ Agents Trust AgentSixx
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Real Results from{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Real Agents
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto"
          >
            Don&apos;t take our word for it. See how top-producing agents are
            transforming their business with Intelligent lead response.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-cyan-500/0 rounded-2xl blur opacity-0 group-hover:opacity-100 group-hover:from-emerald-500/20 group-hover:via-cyan-500/20 group-hover:to-emerald-500/20 transition-all duration-500" />

              <div className="relative h-full p-6 rounded-2xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden">
                {/* Tag */}
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700">
                    {testimonial.tag}
                  </span>
                </div>

                {/* Video indicator */}
                {testimonial.video && (
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                      <span className="text-xs text-emerald-400 font-medium">Video</span>
                    </div>
                  </div>
                )}

                <div className="pt-8">
                  {/* Stars & Verified */}
                  <div className="flex items-center gap-3 mb-4">
                    <StarRating rating={testimonial.rating} />
                    <VerifiedBadge />
                  </div>

                  {/* Quote */}
                  <p className="text-zinc-300 leading-relaxed mb-5">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Story-specific metrics */}
                  <div className="mb-5 grid grid-cols-3 gap-2">
                    {testimonial.metrics.map((m, i) => (
                      <div key={i} className="rounded-lg bg-zinc-800/40 border border-zinc-800 p-2 text-center">
                        <div className={cn(
                          "text-sm font-bold tabular-nums",
                          i === 0 && "text-emerald-400",
                          i === 1 && "text-cyan-400",
                          i === 2 && "text-violet-400",
                        )}>{m.value}</div>
                        <div className="text-[10px] text-zinc-500 leading-tight mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <Avatar name={testimonial.name} src={testimonial.image} />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white truncate">{testimonial.name}</div>
                      <div className="text-sm text-zinc-500 truncate">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Company Logos Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-center text-sm text-zinc-500 mb-6">Trusted by agents from leading brokerages</p>
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

            {/* Scrolling logos */}
            <div className="flex animate-scroll">
              {[...companies, ...companies].map((company, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-8 py-4"
                >
                  <span className="text-zinc-600 font-semibold text-lg whitespace-nowrap">
                    {company}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 rounded-3xl blur-xl" />

          <div className="relative p-8 md:p-12 rounded-2xl md:rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-zinc-700/50 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            </div>

            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div className="text-center">
                <div ref={agents.ref} className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mb-2">
                  {agents.count}+
                </div>
                <div className="text-zinc-400">Agents Using AgentSixx</div>
              </div>
              <div className="text-center">
                <div ref={appointments.ref} className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {appointments.count}K+
                </div>
                <div className="text-zinc-400">Appointments Booked</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                  $0
                </div>
                <div className="text-zinc-400">TCPA Violations</div>
              </div>
              <div className="text-center">
                <div ref={roi.ref} className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {roi.count}x
                </div>
                <div className="text-zinc-400">Average ROI</div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 md:mt-12 text-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold text-lg shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
              >
                Join 500+ Top Agents
                <ChevronRight className="w-5 h-5" />
              </motion.button>
              <p className="mt-4 text-sm text-zinc-500">
                30-day money-back guarantee. No questions asked.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
