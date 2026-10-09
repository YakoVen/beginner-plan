"use client";
import Header from "./header";
import Footer from "./footer";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith('/dashboard');
    // Dashboard owns its own chrome (sidebar + content in app/dashboard/layout.tsx).
    // Rendering another Sidebar/Topbar here caused the double-sidebar + squeezed
    // stat cards. Bypass entirely for /dashboard.
    if (isDashboard) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col w-full">
            <header>
                <Header />
            </header>
            <main className="flex-1 min-w-0 overflow-x-clip">
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}
