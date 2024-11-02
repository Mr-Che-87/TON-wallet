"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

export default function TonConnectProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TonConnectUIProvider manifestUrl="/manifest.json">
      {children}
    </TonConnectUIProvider>
  );
}
