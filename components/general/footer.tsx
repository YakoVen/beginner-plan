import Link from "next/link";

function Footer() {

    return (
        <footer className="bg-[#0b2416] text-white text-sm pt-12 pb-6" id="contact">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    
                    {/* Column 1: Store Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <img
                                width="30"
                                height="30"
                                src="https://img.icons8.com/ios-filled/50/4ade80/online-store.png"
                                alt="YourStore"
                            />
                            <div className="font-extrabold text-xl text-white">YourStore</div>
                        </div>
                        <p className="text-gray-400 leading-relaxed text-xs">
                            Votre boutique en ligne de confiance pour tous vos besoins.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <div className="font-extrabold mb-4 text-white">Liens rapides</div>
                        <div className="flex flex-col space-y-2 text-xs">
                            <Link href="/" className="text-gray-400 hover:text-white transition">Accueil</Link>
                            <Link href="/articles" className="text-gray-400 hover:text-white transition">Boutique</Link>
                            <Link href="#categories" className="text-gray-400 hover:text-white transition">Catégories</Link>
                            <Link href="#contact" className="text-gray-400 hover:text-white transition">Contact</Link>
                        </div>
                    </div>

                    {/* Column 3: Contacts */}
                    <div>
                        <div className="font-extrabold mb-4 text-white">Nos contacts</div>
                        <div className="space-y-3 text-gray-400 text-xs">
                            <div className="flex items-start gap-2">
                                <i className="fa-solid fa-envelope mt-1 text-green-500"></i>
                                <span>contact@yourstore.dz</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <i className="fa-solid fa-phone mt-1 text-green-500"></i>
                                <span>+213 6 12 34 56 78</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <i className="fa-solid fa-location-dot mt-1 text-green-500"></i>
                                <span>Alger, Algérie</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: Socials */}
                    <div>
                        <div className="font-extrabold mb-4 text-white">Suivez-nous</div>
                        <div className="flex gap-3">
                            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-green-600 transition">
                                <i className="fa-brands fa-facebook-f text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-green-600 transition">
                                <i className="fa-brands fa-instagram text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-green-600 transition">
                                <i className="fa-brands fa-twitter text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-green-600 transition">
                                <i className="fa-brands fa-tiktok text-xs"></i>
                            </a>
                        </div>
                    </div>

                    {/* Column 5: Newsletter */}
                    <div>
                        <div className="font-extrabold mb-4 text-white">Restez informés</div>
                        <div className="relative">
                            <input 
                                type="email" 
                                placeholder="Votre email" 
                                className="w-full bg-white/10 border border-white/20 rounded-md py-2 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-400">
                                <i className="fa-solid fa-paper-plane text-xs"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-gray-500 text-xs">
                    <div>© 2026 YourStore. Tous droits réservés.</div>
                    <div className="flex gap-4 mt-4 sm:mt-0">
                        <a href="#" className="hover:text-white transition">Conditions d'utilisation</a>
                        <a href="#" className="hover:text-white transition">Politique de confidentialité</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
