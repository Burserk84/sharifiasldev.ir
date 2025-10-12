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
    if (!siteKey) return;

    const render = () => {
      if (containerRef.current && window.turnstile) {
        window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (tok: string) => onVerify(tok),
          "expired-callback": () => onVerify(""),
          "timeout-callback": () => onVerify(""),
          action: "contact",
          theme: "auto",
        });
      }
    };

    if (typeof window.turnstile !== "undefined") {
      render();
    } else {
      window.onTurnstileLoad = render;
      const el = document.createElement("script");
      el.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
      el.async = true;
      document.head.appendChild(el);
      return () => {
        document.head.removeChild(el);
      };
    }
  }, [siteKey, onVerify]);

  return <div ref={containerRef} className="mt-4" />;
}
