import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/general/header";
import Footer from "@/components/general/footer";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { PrimeReactProvider } from 'primereact/api';
import { store_description, store_name } from "@/service/constants";


export const metadata: Metadata = {
  title: store_name,
  description: store_description,
  icons: {
    icon: './favicon.ico',
    shortcut: './favicon.ico',
    apple: './favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body
        className={` antialiased`}
      >
        <PrimeReactProvider>
          <Header />
          {children}
          <Footer />
        </PrimeReactProvider>
      </body>
    </html>
  );
}
