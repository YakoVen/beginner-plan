import Image from "next/image";
import bg from "@/assets/bgs/pot-544071_1920.jpg"
import icon from "@/assets/icon/icon.png";
import Link from "next/link";
import FeaturedCard from "./widgets/item-card";
import ItemCard from "../general/item-card";
import PublicStoreStates from "./widgets/store-pub-states";


function WelcomSection() {
    return (
        <div className="relative group h-screen w-screen lg:px-10 mx-auto flex justify-center items-center">
            <div className="flex w-screen p-12">
                <div className="flex-grow flex flex-col justify-center" >
                    <div className="text-6xl"> Your Store</div>

                    <div className="text-4xl"> This should be you slogan</div>
                    <PublicStoreStates />
                </div>
                <div>
                    <ItemCard></ItemCard>
                </div>
            </div>
            <div className="absolute bottom-0 hover:text-lg transition-all duration-700   font-extrabold end-0 text-white p-3 flex justify-center items-baseline gap-3 opacity-50 hover:opacity-100">
                <div className="group"> <span className="transition-all duration-700   hover:text-green-400 fa-brands fa-whatsapp px-1 hover:scale-110"></span>Whatsapp : <span>0765778903</span></div>
                <div><span className="fa-brands fa-instagram transition-all duration-700    hover:text-orange-600 "></span></div>
                <div><span className="fa-brands fa-facebook transition-all duration-700  hover:text-blue-600  "></span></div>
            </div>
        </div>
    );
}

export default WelcomSection