"use client";
import React from "react";
import { WagmiProvider } from "wagmi";
import { config } from "./ethereum/wagmi/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Wrappers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default Wrappers;
