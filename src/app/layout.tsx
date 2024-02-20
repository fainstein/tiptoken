import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Wrappers from "./wrappers";
import { Grid } from "@mui/material";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

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
              minHeight="calc(100vh - 130px)"
            >
              {children}
            </Grid>
            <Footer />
          </AppRouterCacheProvider>
        </Wrappers>
      </body>
    </html>
  );
}
