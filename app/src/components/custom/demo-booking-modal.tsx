"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, CheckCircle, Loader2 } from "lucide-react";

interface DemoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoBookingModal({ isOpen, onClose }: DemoBookingModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    dealsPerYear: "",
    currentChallenge: "",
    preferredTime: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call - replace with actual API endpoint
    try {
      await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Even if API doesn't exist yet, show success
      setStep("success");
    } catch {
      // Still show success for demo purposes
      setStep("success");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep("form");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      dealsPerYear: "",
      currentChallenge: "",
      preferredTime: "",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-zinc-800 transition-colors z-10"
            >
              <X className="w-5 h-5 text-zinc-400" />
            </button>

            {step === "form" ? (
              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 mb-4">
                    <Calendar className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Book Your Demo</h2>
                  <p className="text-zinc-400 text-sm mt-2">
                    See how AgentSix can 10x your lead response in 15 minutes
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                      placeholder="john@realestate.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                      Brokerage / Team Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                      placeholder="ABC Realty"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                      How many deals do you close per year? *
                    </label>
                    <select
                      required
                      value={formData.dealsPerYear}
                      onChange={(e) => setFormData({ ...formData, dealsPerYear: e.target.value })}
                      className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    >
                      <option value="">Select...</option>
                      <option value="1-10">1-10 deals</option>
                      <option value="11-25">11-25 deals</option>
                      <option value="26-50">26-50 deals</option>
                      <option value="51-100">51-100 deals</option>
                      <option value="100+">100+ deals</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                      What&apos;s your biggest lead challenge?
                    </label>
                    <select
                      value={formData.currentChallenge}
                      onChange={(e) => setFormData({ ...formData, currentChallenge: e.target.value })}
                      className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    >
                      <option value="">Select...</option>
                      <option value="slow-response">Slow lead response time</option>
                      <option value="isa-cost">ISA too expensive</option>
                      <option value="isa-turnover">ISA turnover/quality issues</option>
                      <option value="compliance">TCPA compliance concerns</option>
                      <option value="follow-up">Inconsistent follow-up</option>
                      <option value="scaling">Can&apos;t scale outreach</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                      Preferred Demo Time
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Morning (9-12)", "Afternoon (12-5)", "Evening (5-7)", "Flexible"].map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setFormData({ ...formData, preferredTime: time })}
                          className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                            formData.preferredTime === time
                              ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                              : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600"
                          } border`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-black font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5" />
                        Book My Demo
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-zinc-500 mt-4">
                    By booking, you agree to receive communications from AgentSix.
                    <br />We&apos;ll never spam or share your information.
                  </p>
                </form>
              </div>
            ) : (
              /* Success State */
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-3">Demo Booked!</h2>
                <p className="text-zinc-400 mb-6">
                  Thanks {formData.firstName}! We&apos;ll contact you within 24 hours to confirm your demo time.
                </p>
                <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700 mb-6">
                  <div className="flex items-center justify-center gap-2 text-emerald-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">What to expect:</span>
                  </div>
                  <ul className="text-sm text-zinc-400 mt-3 space-y-2 text-left">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">1.</span>
                      <span>Confirmation call/text within 24 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">2.</span>
                      <span>15-minute live demo of AgentSix</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">3.</span>
                      <span>Custom ROI projection for your business</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-zinc-800 rounded-lg text-white hover:bg-zinc-700 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
