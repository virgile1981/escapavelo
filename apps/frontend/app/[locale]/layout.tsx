import "./globals.css";
import type { Metadata } from "next";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  metadataBase: new URL('https://escapavelo.fr'),
  title: "Create Next App"
};

export default async function RootLayout({ children, params }: Readonly<{
  children: React.ReactNode, params: Promise<{ locale: string }>
}>) {

  setRequestLocale((await params).locale);
  return (
    <html lang="fr">
      <body
        className={` antialiased`}
      >
        <NextIntlClientProvider locale={(await params).locale}>
          <div className="min-h-screen bg-sable">
            <Header></Header>
            {children}
            <Footer></Footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>)
}
