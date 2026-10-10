import React from "react";

export default function Loading() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6">
      {/* Technical grid — faded toward the edges so it stays subtle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]"
      />

      {/* Soft radial orange glow behind the center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 animate-float rounded-full bg-orange-600/10 blur-3xl"
      />

      {/* Brand moment */}
      <div className="relative flex flex-col items-center text-center animate-[fade-in_0.5s_ease-out_both]">
        <div className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          شریفی اصل <span className="text-gradient">Dev</span>
        </div>

        {/* Indeterminate gradient shimmer bar */}
        <div className="mt-7 h-1 w-40 overflow-hidden rounded-full bg-white/10">
          <div
            aria-hidden="true"
            className="h-full w-1/3 rounded-full bg-gradient-to-l from-orange-400 via-orange-500 to-orange-600"
            style={{ animation: "shimmer-slide 1.4s ease-in-out infinite" }}
          />
        </div>

        <p className="mt-5 text-sm text-gray-400">...در حال بارگذاری</p>
        {/* This text is hidden visually but read by screen readers for accessibility */}
        <span className="sr-only">Loading...</span>
      </div>

      <style>{`
        @keyframes shimmer-slide {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(420%); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
