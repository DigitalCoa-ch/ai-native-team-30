import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GlobeIntel — AI-Powered Global Intelligence",
  description:
    "Stay ahead of global developments with AI-driven geopolitical briefings. Real-time insights into international relations, conflicts, diplomacy, and strategic shifts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}