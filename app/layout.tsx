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
      <body className='flex justify-center items-center bg-cyan-300 pl-[10px] pr-[10px] mt-[45px]'>{children}</body>
    </html>
  );
}
