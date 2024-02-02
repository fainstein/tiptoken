"use client";
import React from "react";
import { WagmiProvider } from "wagmi";
import { config } from "./ethereum/wagmi/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import theme from "./ui/theme";

const Wrappers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            {children}
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Wrappers;
