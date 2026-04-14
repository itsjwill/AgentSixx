"use client";

import { motion, useInView } from "framer-motion";
import { Star, Play, BadgeCheck, ChevronRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";

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

const testimonials = [
  {
    id: 1,
    name: "Marcus Johnson",
    role: "Broker/Owner",
    company: "Century 21 Elite",
    image: "/testimonials/marcus.jpg",
    video: false,
    rating: 5,
    quote: "The TCPA compliance alone is worth the investment. After hearing about agents getting hit with $50K lawsuits, I needed something bulletproof.",
    metrics: { appointments: 31, responseTime: "4 sec", roi: "22x" },
    tag: "Compliance",
  },
  {
    id: 2,
    name: "Jennifer Chen",
    role: "Solo Agent",
    company: "RE/MAX Luxury",
    image: "/testimonials/jennifer.jpg",
    video: true,
    rating: 5,
    quote: "The Voice ISA is so natural that leads don't even realize they're talking to a bot. I've closed 4 extra deals this quarter.",
    metrics: { appointments: 18, responseTime: "5 sec", roi: "15x" },
    tag: "Voice ISA",
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "Team Leader",
    company: "Coldwell Banker",
    image: "/testimonials/david.jpg",
    video: false,
    rating: 5,
    quote: "We tried 3 other lead-response tools before AgentSixx. The difference? Compliance. The others left us exposed.",
    metrics: { appointments: 27, responseTime: "3 sec", roi: "20x" },
    tag: "Switched",
  },
  {
    id: 4,
    name: "Amanda Foster",
    role: "Luxury Specialist",
    company: "Sotheby's International",
    image: "/testimonials/amanda.jpg",
    video: true,
    rating: 5,
    quote: "My high-end clients expect immediate attention. It's like having a 24/7 concierge for my leads.",
    metrics: { appointments: 14, responseTime: "4 sec", roi: "25x" },
    tag: "Luxury",
  },
  {
    id: 5,
    name: "Michael Thompson",
    role: "Investor Agent",
    company: "eXp Realty",
    image: "/testimonials/michael.jpg",
    video: false,
    rating: 5,
    quote: "The ROI is insane. $1,197/month in, $24,000+ in extra commission out. The math doesn't lie.",
    metrics: { appointments: 35, responseTime: "5 sec", roi: "20x" },
    tag: "ROI King",
  },
  {
    id: 6,
    name: "Rachel Martinez",
    role: "Team Lead",
    company: "Compass",
    image: "/testimonials/rachel.jpg",
    video: false,
    rating: 5,
    quote: "Finally, a system that scales with my team. 5 agents, one dashboard, zero compliance headaches.",
    metrics: { appointments: 42, responseTime: "3 sec", roi: "18x" },
    tag: "Team Success",
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

                  {/* Result highlight - simple text */}
                  <div className="mb-5 text-sm">
                    <span className="text-emerald-400 font-semibold">{testimonial.metrics.appointments} appointments</span>
                    <span className="text-zinc-600 mx-2">·</span>
                    <span className="text-cyan-400 font-semibold">{testimonial.metrics.responseTime} response</span>
                    <span className="text-zinc-600 mx-2">·</span>
                    <span className="text-violet-400 font-semibold">{testimonial.metrics.roi} ROI</span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.name.split(" ").map((n) => n[0]).join("")}
                    </div>
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
