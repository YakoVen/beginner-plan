import Image from "next/image";
import bg from "@/assets/bgs/pot-544071_1920.jpg";
import icon from "@/assets/icon/icon.png";
import Link from "next/link";
import ItemCard from "../general/featured-carousel";
import PublicStoreStates from "./widgets/store-pub-states";
import { store_name, welcom_page_info } from "@/service/constants";

function WelcomSection() {
    return (
        // The main container with responsive padding
        <div className="relative group h-screen w-screen px-4 sm:px-6 lg:px-10 mx-auto flex justify-center items-center">
            {/* The main content area with responsive flex direction */}
            <div className="flex flex-col sm:flex-row sm:p-12 md:flex-row w-full max-w-7xl items-center md:p-12">

                {/* Text content container */}
                <div className="flex-grow flex flex-col justify-center text-center md:text-left">
                    {/* Responsive text size for the store name */}
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold"> {store_name}</div>

                    {/* Responsive text size for the slogan */}
                    <div className="text-2xl sm:text-3xl lg:text-4xl mt-2"> {welcom_page_info.short_slogan}</div>
                    <div className="mt-8 flex justify-center md:justify-start">
    <PublicStoreStates />
</div>

                </div>

                {/* ItemCard container - hidden on extra-small screens, full-width on small, and flex-basis on medium+ */}
                <div className="w-full sm:w-auto mt-8 md:mt-0 sm:ml-20 flex justify-center">
                    <div className="hidden sm:block">
                        <ItemCard />
                    </div>
                </div>
            </div>

            {/* Social media links with responsive layout and text size */}
            <div className="absolute bottom-0 right-0 text-white p-3 flex flex-col sm:flex-row justify-center items-center gap-3 opacity-50 hover:opacity-100 transition-all duration-700">
                <div className="group text-sm sm:text-base hover:text-lg">
                    <span className="transition-all duration-700 hover:text-green-400 fa-brands fa-whatsapp px-1 hover:scale-110"></span>
                    Whatsapp : <span>0765778903</span>
                </div>
                <div className="flex gap-3 text-lg sm:text-xl">
                    <div><span className="fa-brands fa-instagram transition-all duration-700 hover:text-orange-600"></span></div>
                    <div><span className="fa-brands fa-facebook transition-all duration-700 hover:text-blue-600"></span></div>
                </div>
            </div>
        </div>
    );
}

export default WelcomSection;