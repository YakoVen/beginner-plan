"use client";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "../sidebar/sidebar";
import Topbar from "./topbar";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith('/dashboard');
    const isShopPage = pathname === '/articles' || pathname?.startsWith('/articles/') || pathname === '/cart' || pathname === '/orders';
    const showSidebar = isDashboard || isShopPage;

    return (
        <div className="min-h-screen bg-gray-50 flex w-full overflow-hidden">
            {showSidebar && <Sidebar />}
            
            <div className="flex-1 flex flex-col h-screen overflow-y-auto min-w-0">
                {!isDashboard && !isShopPage && (
                    <header>
                        <Header />
                    </header>
                )}
                {showSidebar && <Topbar />}
                <main className={`flex-1 relative ${(!isDashboard && !isShopPage) ? 'pt-20' : ''}`}>
                    {children}
                </main>
                {!isDashboard && !isShopPage && (
                    <footer>
                        <Footer />
                    </footer>
                )}
            </div>
        </div>
    );
}
