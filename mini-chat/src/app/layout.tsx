import type { Metadata } from "next";
import { Outfit } from 'next/font/google';
import "./globals.css";
import { WalletContextProvider } from "@/providers/WalletContext";
import { XmtpContextProvider } from "@/providers/XmtpContext";

const outfit = Outfit({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: "MiniChat",
  description: "Chat on MiniPay",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={outfit.className}>
        <WalletContextProvider>
          <XmtpContextProvider>{children}</XmtpContextProvider>
        </WalletContextProvider>
      </body>
    </html>
  );
}
