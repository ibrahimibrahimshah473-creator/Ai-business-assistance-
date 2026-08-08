import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumière — AI Business Assistant",
  description:
    "A demo AI business assistant: automates customer conversations, captures leads, and books appointments 24/7.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
