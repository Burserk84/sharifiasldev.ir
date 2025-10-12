"use client";
import { useCallback, useEffect, useRef } from "react";

declare global {
  interface Window {
    onTurnstileLoad?: () => void;
    turnstile?: {
      render: (el: HTMLElement, opts: unknown) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId?: string) => void;
    };
    __turnstileLoaded__?: boolean;
  }
}

const SCRIPT_ID = "cf-turnstile-script";
const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";

export default function Turnstile({
  siteKey,
  onVerify,
}: {
  siteKey: string;
  onVerify: (token: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  const onVerifyRef = useRef(onVerify);
  onVerifyRef.current = onVerify;

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || widgetIdRef.current)
      return;
    containerRef.current.innerHTML = "";
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: (tok: string) => onVerifyRef.current(tok),
      "expired-callback": () => onVerifyRef.current(""),
      "timeout-callback": () => onVerifyRef.current(""),
      action: "contact",
      theme: "auto",
    });
  }, [siteKey]);

  useEffect(() => {
    if (!siteKey) return;

    if (!document.getElementById(SCRIPT_ID)) {
      const s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.src = SCRIPT_SRC;
      s.async = true;
      document.head.appendChild(s);
    }

    if (!window.__turnstileLoaded__) {
      window.onTurnstileLoad = () => {
        window.__turnstileLoaded__ = true;
        renderWidget();
      };
    }

    if (window.__turnstileLoaded__) renderWidget();

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, renderWidget]);

  return <div ref={containerRef} className="mt-4" />;
}
