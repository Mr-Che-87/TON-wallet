import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import TonConnectProviderWrapper from "@/components/TonConnectProviderWrapper";

const robotoBold = localFont({
  src: "../fonts/Roboto-Bold.ttf",
  variable: "--font-roboto-bold",
  weight: "100 900",
});
const robotoReg = localFont({
  src: "../fonts/Roboto-Regular.ttf",
  variable: "--font-roboto-reg",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TON-приложение",
  description: "Индивидуальные для каждой страницы SEO-ключевые слова",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${robotoBold.variable} ${robotoReg.variable}`}>
        <TonConnectProviderWrapper>{children}</TonConnectProviderWrapper>
      </body>
    </html>
  );
}
