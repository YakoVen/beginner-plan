"use client"
import { auth } from "@/service/firebase/config";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLogged(!!user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken();
            
            // Set session cookie
            await fetch('/api/auth/session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken })
            });
            
        } catch (error) {
            setError("Vos informations ne sont pas correctes");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        await signOut(auth);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="text-gray-500 font-medium animate-pulse">Chargement...</div>
            </div>
        );
    }

    return (
        <section className="">
            <Toaster position="top-right" />
            {!logged && (
                <div className="h-screen flex flex-col gap-3 justify-center items-center bg-gradient-to-br from-blue-50 to-slate-100">
                    <form onSubmit={handleLogin} className="flex flex-col gap-4 py-12 px-8 bg-white shadow-xl border-0 rounded-xl w-full max-w-md">
                        <div className="flex justify-center mb-2">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl">
                                <i className="fa-solid fa-store"></i>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-center mb-4">Connexion Dashboard</h2>
                        
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}
                        
                        <div className="flex flex-col gap-2">
                            <label className="text-lg" htmlFor="email">Email:</label>
                            <input 
                                id="email"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                type="email" 
                                required
                                className="p-3 rounded-lg border focus:outline-none focus:border-blue-500" 
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-lg" htmlFor="password">Mot de passe :</label>
                            <input 
                                id="password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                type="password" 
                                required
                                className="p-3 rounded-lg border focus:outline-none focus:border-blue-500" 
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="p-3 mt-4 border border-black hover:bg-black hover:text-white disabled:opacity-45 rounded-lg transition-colors"
                        >
                            {isSubmitting ? 'Connexion...' : 'Se connecter'}
                        </button>
                    </form>
                </div>
            )}
            
            {logged && (
                <div className="flex h-screen overflow-hidden bg-gray-50">
                    {/* Mobile top bar */}
                    <div className="md:hidden flex items-center justify-between p-4 bg-white border-b shrink-0">
                        <span className="font-bold text-lg">Dashboard</span>
                        <button onClick={() => setSidebarOpen(true)} className="p-2">
                            <i className="fa-solid fa-bars"></i>
                        </button>
                    </div>

                    {/* Sidebar overlay for mobile */}
                    {sidebarOpen && (
                        <div 
                            className="fixed inset-0 bg-black/50 z-40 md:hidden" 
                            onClick={() => setSidebarOpen(false)}
                        ></div>
                    )}

                    {/* Sidebar */}
                    <aside className={`fixed inset-y-0 left-0 z-50 bg-white border-r transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-all duration-300 ease-in-out flex flex-col shrink-0 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
                        <div className={`p-4 sm:p-6 border-b flex ${sidebarCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
                            {!sidebarCollapsed && <span className="font-bold text-2xl text-blue-600 whitespace-nowrap overflow-hidden">Store<span className="text-black">Admin</span></span>}
                            {sidebarCollapsed && <span className="font-bold text-2xl text-blue-600 hidden md:block">S<span className="text-black">A</span></span>}
                            
                            <div className="flex gap-2 shrink-0">
                                <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="hidden md:block p-1 text-gray-400 hover:text-blue-600 transition-colors">
                                    <i className={`fa-solid ${sidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
                                </button>
                                <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 text-gray-500">
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        </div>
                        <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 overflow-x-hidden">
                            <Link 
                                href="/dashboard"
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 py-3 rounded-lg transition-colors ${sidebarCollapsed ? 'px-0 justify-center' : 'px-4'} ${pathname === "/dashboard" ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-600 hover:bg-gray-100"}`}
                                title={sidebarCollapsed ? "Vue d'ensemble" : undefined}
                            >
                                <i className={`fa-solid fa-chart-line text-center ${sidebarCollapsed ? 'text-xl' : 'w-5'}`}></i>
                                {!sidebarCollapsed && <span>Vue d'ensemble</span>}
                            </Link>
                            <Link 
                                href="/dashboard/orders"
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 py-3 rounded-lg transition-colors ${sidebarCollapsed ? 'px-0 justify-center' : 'px-4'} ${pathname.startsWith("/dashboard/orders") ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-600 hover:bg-gray-100"}`}
                                title={sidebarCollapsed ? "Commandes" : undefined}
                            >
                                <i className={`fa-solid fa-cart-shopping text-center ${sidebarCollapsed ? 'text-xl' : 'w-5'}`}></i>
                                {!sidebarCollapsed && <span>Commandes</span>}
                            </Link>
                            <Link 
                                href="/dashboard/articles"
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 py-3 rounded-lg transition-colors ${sidebarCollapsed ? 'px-0 justify-center' : 'px-4'} ${pathname.startsWith("/dashboard/articles") ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-600 hover:bg-gray-100"}`}
                                title={sidebarCollapsed ? "Articles" : undefined}
                            >
                                <i className={`fa-solid fa-box text-center ${sidebarCollapsed ? 'text-xl' : 'w-5'}`}></i>
                                {!sidebarCollapsed && <span>Articles</span>}
                            </Link>
                        </nav>
                        <div className="p-4 border-t overflow-x-hidden">
                            <button 
                                onClick={handleLogout}
                                className={`w-full flex items-center gap-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors ${sidebarCollapsed ? 'px-0 justify-center' : 'px-4'}`}
                                title={sidebarCollapsed ? "Déconnexion" : undefined}
                            >
                                <i className={`fa-solid fa-arrow-right-from-bracket text-center ${sidebarCollapsed ? 'text-xl' : 'w-5'}`}></i>
                                {!sidebarCollapsed && <span>Déconnexion</span>}
                            </button>
                        </div>
                    </aside>

                    {/* Main content */}
                    <main className="flex-1 overflow-y-auto p-4 md:p-8">
                        {children}
                    </main>
                </div>
            )}
        </section>
    );
}