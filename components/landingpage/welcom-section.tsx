import ItemCard from "../general/featured-carousel";
import PublicStoreStates from "./widgets/store-pub-states";
import { store_name, welcom_page_info, contact_info } from "@/service/constants";
import Link from "next/link";

function WelcomSection() {
    return (
        <div className="relative group min-h-screen w-full px-4 sm:px-6 lg:px-10 mx-auto flex justify-center items-center bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="flex flex-col md:flex-row w-full max-w-7xl items-center md:p-12 gap-8 md:gap-12 py-20 md:py-0">
                <div className="flex-grow flex flex-col justify-center text-center md:text-left w-full">
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900"> {store_name}</div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl mt-4 text-gray-700"> {welcom_page_info.short_slogan}</div>
                    <div className="mt-8 flex justify-center md:justify-start">
                        <Link href="/articles" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 text-lg">
                            Découvrir nos produits
                        </Link>
                    </div>
                    <div className="mt-8 flex justify-center md:justify-start">
                        <PublicStoreStates />
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex justify-center">
                    <div className="w-full max-w-lg">
                        <ItemCard />
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 right-0 text-white p-3 flex flex-col sm:flex-row justify-center items-center gap-3 opacity-50 hover:opacity-100 transition-all duration-700 bg-black/40 rounded-tl-xl">
                {contact_info.phone1 && (
                    <div className="group text-sm sm:text-base hover:text-lg">
                        <span className="transition-all duration-700 hover:text-green-400 fa-brands fa-whatsapp px-1 hover:scale-110"></span>
                        Whatsapp : <span>{contact_info.phone1}</span>
                    </div>
                )}
                <div className="flex gap-3 text-lg sm:text-xl">
                    {contact_info.socials.find(s => s.platform.toLowerCase() === 'instagram') && (
                        <a href={contact_info.socials.find(s => s.platform.toLowerCase() === 'instagram')?.link} target="_blank" rel="noopener noreferrer">
                            <span className="fa-brands fa-instagram transition-all duration-700 hover:text-blue-400"></span>
                        </a>
                    )}
                    {contact_info.socials.find(s => s.platform.toLowerCase() === 'facebook') && (
                        <a href={contact_info.socials.find(s => s.platform.toLowerCase() === 'facebook')?.link} target="_blank" rel="noopener noreferrer">
                            <span className="fa-brands fa-facebook transition-all duration-700 hover:text-blue-600"></span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WelcomSection;