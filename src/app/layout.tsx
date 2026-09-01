import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "probavi — AI-powered NIST 800-53 control assessment",
  description:
    "End to end, probavi runs a NIST 800-53 control assessment — AI reads the evidence, code applies the rule and computes the numbers, AI drafts the report.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background font-sans text-muted">
        {children}
      </body>
    </html>
  );
}
