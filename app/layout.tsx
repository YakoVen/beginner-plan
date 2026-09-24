import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/general/layout-wrapper";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { PrimeReactProvider } from 'primereact/api';
import { store_description, store_name, store_url } from "@/service/constants";
import Script from "next/script";

export const metadata: Metadata = {
  title: store_name,
  description: store_description,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: store_name,
    description: store_description,
    siteName: store_name,
    type: 'website',
  },
  metadataBase: new URL(`https://${store_url}`),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={` antialiased `}>
        <PrimeReactProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </PrimeReactProvider>
        <Script id="fa-loader" strategy="lazyOnload">{`
          var link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css';
          link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
        `}</Script>
      </body>
    </html>
  );
}
