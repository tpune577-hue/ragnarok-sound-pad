import type { Metadata, Viewport } from "next";
import { Cinzel, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const display = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "800"],
});

const body = Noto_Sans_Thai({
  variable: "--font-body",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Ragnarok the Board Game – Sound Companion",
  description: "BGM และเสียงเอฟเฟกต์ประกอบการเล่น Ragnarok the Board Game: Ceremony of Prontera",
  appleWebApp: { capable: true, title: "RO Companion", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: "#0d1020",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
