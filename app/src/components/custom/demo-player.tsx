"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Clock } from "lucide-react";

interface DemoPlayerProps {
  /** Path to the 60-second demo video (drop into /public/demo/). */
  videoSrc?: string;
  /** Poster shown before play. Defaults to the AgentSixx HUD wordmark. */
  poster?: string;
  /** Fallback click handler when no video is ready yet (e.g, open booking modal). */
  onFallbackClick?: () => void;
}

export function DemoPlayer({
  videoSrc = "/demo/agentsixx-demo.mp4",
  poster = "/demo/poster.png",
  onFallbackClick,
}: DemoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [videoMissing, setVideoMissing] = useState(false);
  const [hovering, setHovering] = useState(false);

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  function onError() {
    setVideoMissing(true);
  }

  // Placeholder state, shown when demo video hasn't been dropped in yet
  if (videoMissing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative max-w-3xl mx-auto"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-2xl blur-md opacity-30" />
        <button
          onClick={onFallbackClick}
          className="relative w-full aspect-video rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center p-6 text-center group"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.15),transparent_60%)]" />
          <Image
            src="/logo.png"
            alt="AgentSixx"
            width={280}
            height={64}
            className="h-10 sm:h-12 w-auto mb-4 relative opacity-95"
            priority
          />
          <div className="relative flex items-center gap-2 text-xs sm:text-sm text-emerald-400 mb-3">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            60-second demo, hear a real call
          </div>
          <p className="relative text-sm sm:text-base text-zinc-400 max-w-md mb-5">
            Watch the Voice ISA qualify a Zillow lead, handle a budget objection, and book the appointment. No scripts, no cuts.
          </p>
          <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 group-hover:bg-emerald-400 text-black text-sm font-medium transition-colors">
            <Play className="w-4 h-4 fill-current" />
            Book a live walkthrough
          </div>
          <p className="relative text-[11px] text-zinc-600 mt-3">Recorded demo launches soon. Book now to see it live on your stack.</p>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative max-w-3xl mx-auto"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-2xl blur-md opacity-30" />
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={poster}
          playsInline
          preload="metadata"
          onEnded={() => setPlaying(false)}
          onError={onError}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Play overlay */}
        {!playing && (
          <button
            onClick={toggle}
            aria-label="Play demo"
            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors group"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 group-hover:bg-white flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 text-zinc-900 fill-current translate-x-0.5" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-xs sm:text-sm text-white">
                <Clock className="w-3.5 h-3.5" />
                60-second demo
              </div>
            </div>
          </button>
        )}

        {/* Controls (shown while playing or on hover) */}
        {(playing || hovering) && (
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label={playing ? "Pause" : "Play"}
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-colors"
            >
              {playing ? <Pause className="w-4 h-4 text-white fill-current" /> : <Play className="w-4 h-4 text-white fill-current translate-x-0.5" />}
            </button>
            <button
              onClick={() => {
                const v = videoRef.current;
                if (!v) return;
                v.muted = !v.muted;
                setMuted(v.muted);
              }}
              aria-label={muted ? "Unmute" : "Mute"}
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-colors"
            >
              {muted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
            </button>
            <div className="flex-1" />
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/90 text-black text-[11px] font-semibold">
              <span className="flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-black opacity-50" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-black" />
              </span>
              REAL CALL, UNEDITED
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}