"use client";

import { usePathname } from "next/navigation";

interface FooterGateProps {
  children: React.ReactNode;
}

export default function FooterGate({ children }: FooterGateProps) {
  const pathname = usePathname();
  const hideFooter = pathname?.startsWith("/login");

  if (hideFooter) {
    return null;
  }

  return <>{children}</>;
}


