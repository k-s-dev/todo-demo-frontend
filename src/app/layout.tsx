import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import Providers from "@/components/Providers/Providers";
import Navbar from "@/components/navbar/Navbar";

export const metadata: Metadata = {
  title: "Nextjs Todo App",
  description: "Todo app created with Nextjs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
