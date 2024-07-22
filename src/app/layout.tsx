import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import { NextAuthProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PLUMS",
  description: "Personal Learning Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <a rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-violet-200">
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
