import type { Metadata } from "next";
import {Source_Sans_3} from "next/font/google";
import "./globals.css";

const fontSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight:['200','300','400','500','600','700','800','900'],
});
export const metadata: Metadata = {
  title: "Sommaire-AI Powered PDF Summarizer",
  description: "Save hours reading time. Transform lengthy PDFs into clear, accurate summaries in seconds with our advanced AI technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
