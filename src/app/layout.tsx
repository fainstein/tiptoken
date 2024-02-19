import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "../components/navigation";
import Wrappers from "./wrappers";
import { Grid } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tip Token",
  description: "Descentralized Tips",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0 }}>
        <Wrappers>
          <AppRouterCacheProvider>
            <Navigation />
            <Grid
              component="main"
              container
              justifyContent="center"
              alignItems="center"
              position="absolute"
              minHeight="calc(100vh - 90px)"
            >
              {children}
            </Grid>
          </AppRouterCacheProvider>
        </Wrappers>
      </body>
    </html>
  );
}
