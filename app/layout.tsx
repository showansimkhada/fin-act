import '../public/styles/globals.css'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fin-Act'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
