import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ActiveHub — Digital Marketplace",
  description: "A modern marketplace homepage inspired by contemporary digital storefronts.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}