import type { Metadata } from 'next';
import './globals.css';
import { PT_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { CartProvider } from '@/components/cart/cart-provider';
import { Toaster } from '@/components/ui/toaster';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'FS Moda Pet',
  description: 'Faça seu pedido aqui',
  openGraph: {
    title: 'FS Moda Pet',
    description: 'Faça seu pedido aqui',
    images: [
      {
        url: 'https://i.postimg.cc/MZdk3ryn/270833480-140534175031119-2361686743964558044-n.jpg',
        width: 800,
        height: 600,
        alt: 'FS Moda Pet Logo',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          ptSans.variable
        )}
      >
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
