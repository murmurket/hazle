import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "katex/dist/katex.min.css";

import Navbar from "@/components/Navbar";
import { Footer } from "../components/Footer";
import { inter, playfair } from "@/styles/fonts";

export const metadata: Metadata = {
  title: "Full Stack Development, Custom Solutions & Creative Design Portfolio | Hazle",
  description: "Proven ability to manage end-to-end projects—from brand identity design to full-stack web development—delivering custom solutions with a user-centered approach",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer title="Hazle" />
      </body>
    </html>
  );
}
