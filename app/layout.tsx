import '../public/styles/globals.css'
import { inter } from '@/app/ui/fonts'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fin Act"
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
