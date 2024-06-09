import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Content"
};

export default function AddContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
