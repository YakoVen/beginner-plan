"use client";
import Header from "./header";
import Footer from "./footer";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith('/dashboard');
    const isShopPage = pathname === '/articles';

    return (
        <>
            {!isDashboard && (
                <header>
                    <Header />
                </header>
            )}
            <main className="relative">
                {children}
            </main>
            {!isDashboard && !isShopPage && (
                <footer>
                    <Footer />
                </footer>
            )}
        </>
    );
}
