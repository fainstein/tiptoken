import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "../providers";
import { Grid } from "@mui/material";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import { cookieToInitialState } from "wagmi";
import { config } from "@/ethereum/wagmi/config";
import { headers } from "next/headers";

export default function RootLayout({
  params: { locale },
  children,
}: Readonly<{
  params: { locale: string };
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <Providers locale={locale} initialState={initialState}>
      <AppRouterCacheProvider>
        <Navigation />
        <Grid
          component="main"
          container
          justifyContent="center"
          alignItems="center"
          minHeight="calc(100vh - 130px)"
          px={{ xs: 5, md: 10 }}
        >
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
        <Footer />
      </AppRouterCacheProvider>
    </Providers>
  );
}
