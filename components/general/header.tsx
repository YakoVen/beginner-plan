"use client"

import { store_name } from "@/service/constants";
import Link from "next/link";
import { useState } from "react";

function Header() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const links = [
        { name: "Boutique", link: "/articles" },
        { name: "Contact", link: "/#contact" },
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
            {/* Top Navbar */}
            <nav className="flex items-center px-4 sm:px-6 md:px-12 h-20 shadow w-full fixed top-0 z-50 bg-white">
                {/* Logo + Store name */}
                <Link href={"/"}>
                    <div className="flex items-center">
                        <img
                            width="35"
                            height="35"
                            src="https://img.icons8.com/ios-filled/50/1A1A1A/online-store.png"
                            alt="online-store"
                        />
                        <div className="text-xl sm:text-2xl px-1 max-md:hidden font-bold">
                            {store_name}
                        </div>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex flex-grow justify-center items-center gap-6">
                    {links.map((l, i) => (
                        <Link
                            key={i}
                            href={l.link}
                            className="hover:text-gray-600 transition"
                        >
                            {l.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Search */}
                <form onSubmit={handleSearch} className="hidden md:flex gap-3 items-center">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border py-1 px-4 rounded-lg w-40 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        placeholder="Rechercher..."
                    />
                    <button type="submit" className="text-gray-700 hover:text-gray-900 transition flex items-center justify-center p-1">
                        <i className="fa-solid fa-magnifying-glass text-xl"></i>
                    </button>
                </form>

                {/* Mobile Menu Button */}
                <div className="flex-grow md:hidden"></div>
                <div className="md:hidden">
                    <button
                        className="shadow h-11 w-11 flex items-center justify-center rounded-xl text-2xl active:bg-gray-100"
                        onClick={() => setOpen(!open)}
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`md:hidden z-[60] flex flex-col px-6 w-full bg-white fixed left-0 top-0 transition-all duration-500 overflow-hidden ${
                    open ? "h-screen pt-4" : "h-0 pt-0"
                }`}
            >
                <div className="flex justify-end mb-8">
                    <button
                        className="h-11 w-11 flex items-center justify-center rounded-xl text-3xl text-gray-700 active:bg-gray-100"
                        onClick={() => setOpen(false)}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                {links.map((l, i) => (
                    <Link
                        key={i}
                        href={l.link}
                        className="text-lg w-full text-center py-2 rounded-lg hover:bg-gray-100 transition"
                        onClick={() => setOpen(false)}
                    >
                        {l.name}
                    </Link>
                ))}

                {/* Mobile Search */}
                <form onSubmit={(e) => { handleSearch(e); setOpen(false); }} className="flex gap-2 mt-4">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border flex-grow py-1 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        placeholder="Rechercher..."
                    />
                    <button type="submit" className="text-gray-700 hover:text-gray-900 transition flex items-center justify-center p-2">
                        <i className="fa-solid fa-magnifying-glass text-xl"></i>
                    </button>
                </form>
            </div>
        </header>
    );
}

export default Header;
