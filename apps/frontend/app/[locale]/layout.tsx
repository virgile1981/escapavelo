import "./globals.css";
import type { Metadata } from "next";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@escapavelo/shared-types";

export default async function RootLayout({ children, params }: Readonly<{
  children: React.ReactNode, params: Promise<{ locale: string }>
}>) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body
        className={`antialiased`}
      >
        <NextIntlClientProvider locale={(await params).locale}>
          <div className="min-h-screen bg-sable">
            <Header currentLocale={locale}></Header>
            {children}
            <Footer></Footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>)
}
