"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    onTurnstileLoad?: () => void;
    turnstile: unknown;
  }
}

export default function Turnstile({
  siteKey,
  onVerify,
}: {
  siteKey: string;
  onVerify: (token: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = document.createElement("script");
    el.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
    el.async = true;
    document.head.appendChild(el);

    window.onTurnstileLoad = () => {
      if (containerRef.current && window.turnstile) {
        window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: onVerify, // token => onVerify(token)
          action: "contact",
          theme: "auto",
        });
      }
    };

    return () => {
      document.head.removeChild(el);
    };
  }, [siteKey, onVerify]);

  return <div ref={containerRef} className="mt-4" />;
}
