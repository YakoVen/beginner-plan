"use client"

import { store_name } from "@/service/constants";
import Link from "next/link";
import { useState } from "react";

function Header() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const links = [
        { name: "Accueil", link: "/" },
        { name: "Boutique", link: "/articles" },
        { name: "À propos", link: "/#about" }
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            window.location.href = "/articles?search=" + encodeURIComponent(search);
        }
    };

    return (
        <header>
            <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md shadow-sm w-full fixed top-0 z-50">
                {/* Logo */}
                <Link href={"/"}>
                    <div className="flex items-center gap-2">
                        <img
                            width="35"
                            height="35"
                            src="https://img.icons8.com/ios-filled/50/15803d/online-store.png"
                            alt="YourStore"
                        />
                        <div className="text-xl font-bold text-gray-900 hidden sm:block">
                            YourStore
                        </div>
                    </div>
                </Link>

                {/* Central Search */}
                <div className="flex-1 max-w-xl mx-8 hidden md:block">
                    <form onSubmit={handleSearch} className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                        </div>
                        <input 
                            type="text"
                            className="bg-gray-100 border-none text-gray-900 text-sm rounded-full focus:ring-green-500 focus:border-green-500 block w-full pl-11 p-2.5 transition-all" 
                            placeholder="Rechercher un produit, une catégorie..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                </div>

                {/* Right Side Links */}
                <div className="hidden md:flex items-center gap-6">
                    {links.map((l, i) => (
                        <Link
                            key={i}
                            href={l.link}
                            className="text-sm font-medium text-gray-700 hover:text-green-700 transition"
                        >
                            {l.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        className="text-2xl text-gray-700 active:text-green-700 transition"
                        onClick={() => setOpen(!open)}
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`md:hidden z-[60] flex flex-col px-6 w-full bg-white fixed left-0 top-0 transition-all duration-300 overflow-hidden shadow-lg ${
                    open ? "h-auto py-6" : "h-0 py-0"
                }`}
            >
                <div className="flex justify-end mb-6">
                    <button
                        className="text-3xl text-gray-700 active:text-green-700 transition"
                        onClick={() => setOpen(false)}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                
                <form onSubmit={(e) => { handleSearch(e); setOpen(false); }} className="relative w-full mb-6">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                    </div>
                    <input 
                        type="text"
                        className="bg-gray-100 border-none text-gray-900 text-sm rounded-full focus:ring-green-500 focus:border-green-500 block w-full pl-11 p-3" 
                        placeholder="Rechercher..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>

                <div className="flex flex-col gap-4">
                    {links.map((l, i) => (
                        <Link
                            key={i}
                            href={l.link}
                            className="text-lg font-medium text-gray-700 hover:text-green-700 transition"
                            onClick={() => setOpen(false)}
                        >
                            {l.name}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}

export default Header;
