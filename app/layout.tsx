
// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; // <-- IMPORT THE NEW PROVIDER

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkBridge",
  description: "Your link forwarding platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers> {/* <-- USE THE PROVIDER COMPONENT */}
          {children}
        </Providers>
      </body>
    </html>
  );
}