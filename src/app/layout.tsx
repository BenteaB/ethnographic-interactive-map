import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ethnographic Interactive Map",
  description: "Explore regional traditions, costumes, and games."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
