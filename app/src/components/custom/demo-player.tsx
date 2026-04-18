"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Clock } from "lucide-react";

interface DemoPlayerProps {
  /** YouTube video ID */
  youtubeId?: string;
  /** Fallback click handler when no video is ready yet (e.g, open booking modal). */
  onFallbackClick?: () => void;
}

export function DemoPlayer({
  youtubeId = "K7jJD6Vvvqc",
  onFallbackClick: _onFallbackClick,
}: DemoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  // YouTube thumbnail URL
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative max-w-3xl mx-auto"
    >
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-2xl blur-md opacity-30" />

      <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
        {!playing ? (
          /* Thumbnail with play button */
          <button
            onClick={() => setPlaying(true)}
            aria-label="Play demo video"
            className="absolute inset-0 w-full h-full group"
          >
            {/* Thumbnail image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${thumbnailUrl})` }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

            {/* Radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15),transparent_60%)]" />

            {/* Play button and text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Play circle */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 group-hover:bg-white flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform mb-4">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 text-zinc-900 fill-current translate-x-0.5" />
              </div>

              {/* Title badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-sm text-sm sm:text-base text-white font-medium mb-2">
                <Clock className="w-4 h-4" />
                AI Closes a Lead in 47 Seconds
              </div>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-zinc-300/90 max-w-md text-center px-4">
                Real call. No edits. Watch the AI qualify, handle objections, and book the appointment.
              </p>

              {/* Live badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/90 text-black text-xs font-semibold mt-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-50" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-black" />
                </span>
                REAL CALL, UNEDITED
              </div>
            </div>
          </button>
        ) : (
          /* YouTube iframe */
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title="AI Closes a Zillow Lead in 47 Seconds — Watch the Full Call"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </motion.div>
  );
}