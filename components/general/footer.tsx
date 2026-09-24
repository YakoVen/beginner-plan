import { contact_info, store_name, store_description } from "@/service/constants";
import Link from "next/link";

function Footer() {
    const hasPhones = contact_info.phone1 || contact_info.phone2;
    const hasEmail = contact_info.email;
    const hasContacts = hasPhones || hasEmail;
    
    const validSocials = contact_info.socials.filter(e => e.link && e.link.trim() !== "");

    return (
        <footer className="bg-gray-900 text-white text-sm pt-12 pb-6" id="contact">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 opacity-80 mb-12">
                    
                    {/* Column 1: Store Info */}
                    <div>
                        <div className="font-extrabold text-xl mb-4">{store_name}</div>
                        <p className="text-gray-300 leading-relaxed">
                            {store_description?.length > 100 
                                ? `${store_description.substring(0, 100)}...` 
                                : store_description || `Bienvenue chez ${store_name}, votre boutique en ligne de confiance.`}
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <div className="font-extrabold mb-4 uppercase tracking-wider text-xs">Liens Rapides</div>
                        <div className="flex flex-col space-y-2">
                            <Link href="/" className="text-gray-300 hover:text-white transition">Accueil</Link>
                            <Link href="/articles" className="text-gray-300 hover:text-white transition">Boutique</Link>
                            <Link href="#contact" className="text-gray-300 hover:text-white transition">Contact</Link>
                        </div>
                    </div>

                    {/* Column 3: Contacts */}
                    <div>
                        <div className="font-extrabold mb-4 uppercase tracking-wider text-xs">Nos Contacts</div>
                        <div className="space-y-2 text-gray-300">
                            {contact_info.phone1 && (
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-phone"></i>
                                    {contact_info.phone1}
                                </div>
                            )}
                            {contact_info.phone2 && (
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-phone"></i>
                                    {contact_info.phone2}
                                </div>
                            )}
                            {contact_info.email && (
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-envelope"></i>
                                    {contact_info.email}
                                </div>
                            )}
                            {!hasContacts && <div>Merci de votre visite.</div>}
                        </div>
                    </div>

                    {/* Column 4: Socials */}
                    <div>
                        <div className="font-extrabold mb-4 uppercase tracking-wider text-xs">Suivez-nous</div>
                        {validSocials.length > 0 ? (
                            <div className="flex gap-3">
                                {validSocials.map((e, i) => {
                                    // Map common platforms to FontAwesome icons, default to link icon
                                    let iconClass = "fa-solid fa-link";
                                    const platform = e.platform.toLowerCase();
                                    if (platform.includes("facebook")) iconClass = "fa-brands fa-facebook-f";
                                    else if (platform.includes("instagram")) iconClass = "fa-brands fa-instagram";
                                    else if (platform.includes("tiktok")) iconClass = "fa-brands fa-tiktok";
                                    
                                    return (
                                        <a
                                            key={i}
                                            href={e.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-blue-600 transition"
                                            title={e.name}
                                        >
                                            <i className={iconClass}></i>
                                        </a>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-gray-300">Aucun réseau social pour le moment.</div>
                        )}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-gray-800 text-center text-gray-400 text-xs">
                    © 2024 {store_name}. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
