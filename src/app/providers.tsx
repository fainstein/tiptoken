"use client";
import React from "react";
import { type State, WagmiProvider } from "wagmi";
import { config } from "../ethereum/wagmi/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import theme from "../ui/theme/theme";
import WalletContext from "@/context/wallet-context";
import Web3Service from "@/services/web3Service";
import { SnackbarProvider } from "notistack";
import { I18nProviderClient } from "@/locales/client";

const Providers = ({
  locale,
  children,
  initialState,
}: Readonly<{
  locale: string;
  children: React.ReactNode;
  initialState?: State;
}>) => {
  const [queryClient] = React.useState(() => new QueryClient());
  const web3Service = new Web3Service();

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <WalletContext.Provider value={{ web3Service }}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <SnackbarProvider>
                <I18nProviderClient locale={locale}>
                  {children}
                </I18nProviderClient>
              </SnackbarProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </WalletContext.Provider>
    </WagmiProvider>
  );
};

export default Providers;
