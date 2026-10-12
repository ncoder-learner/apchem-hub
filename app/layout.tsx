import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AP Chem Hub",
  description: "An interactive study hub for the full AP Chemistry course.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-ink antialiased">{children}</body>
    </html>
  );
}
