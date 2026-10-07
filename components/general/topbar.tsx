"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Topbar() {
    const [search, setSearch] = useState("");
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith('/dashboard');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            if (isDashboard) {
                // Dashboard search logic if needed
            } else {
                window.location.href = "/articles?search=" + encodeURIComponent(search);
            }
        }
    };

    return (
        <div className="flex items-center justify-between px-6 py-4 bg-white/50 backdrop-blur-md sticky top-0 z-30">
            <div className="md:hidden flex items-center gap-2">
                <img
                    width="30"
                    height="30"
                    src={isDashboard ? "https://img.icons8.com/ios-filled/50/1A1A1A/online-store.png" : "https://img.icons8.com/ios-filled/50/15803d/online-store.png"}
                    alt="Logo"
                />
            </div>
            
            <div className="flex-1 max-w-xl hidden md:block">
                <form onSubmit={handleSearch} className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                    </div>
                    <input 
                        type="text"
                        className="bg-gray-50 border-none text-gray-900 text-sm rounded-full focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5 transition-all" 
                        placeholder={isDashboard ? "Rechercher..." : "Rechercher un produit..."}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
            </div>
            
            <div className="flex items-center gap-4 ml-auto">
                {/* Reserved for future right-side actions */}
            </div>
        </div>
    );
}
