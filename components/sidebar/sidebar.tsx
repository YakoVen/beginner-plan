"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/service/constants";

export default function Sidebar() {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith("/dashboard");

    // Storefront Sidebar Links
    const storeLinks = [
        { name: "Accueil", href: "/", icon: "fa-solid fa-house" },
        { name: "Boutique", href: "/articles", icon: "fa-solid fa-store" },
        { name: "Catégories", href: "/#categories", icon: "fa-solid fa-tags" },
    ];



    // Dashboard Sidebar Links
    const dashboardLinks = [
        { name: "Vue d'ensemble", href: "/dashboard", icon: "fa-solid fa-chart-line" },
        { name: "Commandes", href: "/dashboard/orders", icon: "fa-solid fa-cart-shopping" },
        { name: "Articles", href: "/dashboard/articles", icon: "fa-solid fa-boxes-stacked" },
    ];

    if (isDashboard) {
        return (
            <aside className="sticky left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-40 flex-shrink-0 overflow-y-auto">
                <div className="p-6 pb-2">
                    <div className="flex items-center gap-2 mb-8">
                        <img
                            width="35"
                            height="35"
                            src="https://img.icons8.com/ios-filled/50/1A1A1A/online-store.png"
                            alt="StoreAdmin"
                        />
                        <span className="text-xl font-bold text-gray-900">StoreAdmin</span>
                    </div>
                </div>
                <div className="flex-1 px-4">
                    <div className="space-y-1">
                        {dashboardLinks.map((link, i) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link key={i} href={link.href}>
                                    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                                        <i className={`${link.icon} w-5 text-center`}></i>
                                        <span>{link.name}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <div className="p-4 border-t border-gray-100 mt-auto">
                    <Link href="/">
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors">
                            <i className="fa-solid fa-arrow-right-from-bracket w-5 text-center"></i>
                            <span>Déconnexion</span>
                        </div>
                    </Link>
                </div>
            </aside>
        );
    }

    return (
        <aside className="sticky left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex-col z-40 hidden md:flex flex-shrink-0 overflow-y-auto">
            <div className="p-6 pb-4">
                <div className="flex items-center gap-2 mb-6">
                    <img
                        width="35"
                        height="35"
                        src="https://img.icons8.com/ios-filled/50/15803d/online-store.png"
                        alt="YourStore"
                    />
                    <span className="text-xl font-bold text-gray-900">YourStore</span>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
                <div className="space-y-1 mb-6">
                    {storeLinks.map((link, i) => {
                        const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                        return (
                            <Link key={i} href={link.href}>
                                <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                                    <i className={`${link.icon} w-5 text-center ${isActive ? 'text-green-700' : 'text-gray-400'}`}></i>
                                    <span className="text-sm">{link.name}</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>


            </div>
            
            <div className="p-4 mt-auto">
                <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3 border border-green-100">
                    <div className="bg-white p-2 rounded-lg text-green-600 shadow-sm">
                        <i className="fa-solid fa-truck-fast"></i>
                    </div>
                    <div>
                        <div className="text-sm font-bold text-green-800">Livraison rapide</div>
                        <div className="text-xs text-green-600">Partout en Algérie avec nos partenaires</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
