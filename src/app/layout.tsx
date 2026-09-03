import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { storeConfig } from "@/config/store.config";
import { ToastProvider } from "@/components/ui/ToastProvider";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: `${storeConfig.store.name} | Dijital Menü`,
  description: storeConfig.store.slogan,
};

export const viewport: Viewport = {
  themeColor: storeConfig.store.themeColor,
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tr"
      className={`${display.variable} ${sans.variable}`}
      style={{ "--brand": storeConfig.store.themeColor } as React.CSSProperties}
    >
      <body className="font-sans text-ink antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
