import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/navigation";
import Wrappers from "./wrappers";

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
      <body className={inter.className}>
        <Wrappers>
          <Navigation />
          <main className="pt-[90px]">{children}</main>
        </Wrappers>
      </body>
    </html>
  );
}
