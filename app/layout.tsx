import type { Metadata } from "next";
import {Source_Sans_3} from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ORIGIN_URL } from "@/utils/helpers";
const fontSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  fallback: ['system-ui', 'arial'],
});
export const metadata: Metadata = {
  title: "Sommaire-AI Powered PDF Summarizer",
  description: "Save hours reading time. Transform lengthy PDFs into clear, accurate summaries in seconds with our advanced AI technology.",
  openGraph:{
    title: "Sommaire-AI Powered PDF Summarizer",
    images:[
      {
        url:"/sommaireImage.png",
      }
    ]
  },
  metadataBase: new URL(ORIGIN_URL),
  alternates:{
    canonical: ORIGIN_URL
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${fontSans.variable} font-sans antialiased`}>
        <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        </div>
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}
