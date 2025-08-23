import React from 'react';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  // This layout simply returns its children without adding any extra structure.
  return <>{children}</>;
}