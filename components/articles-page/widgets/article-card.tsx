
import { article } from "@/interfaces/article";
import Image from "next/image";
import Link from "next/link";

function ArtcileCard({ article }: { article: article }) {
    return (
        <div className="group min-w-[250px] w-[300px] md:w-[250px] md:min-w-[300px] max-w-[98vw]   p-3 rounded-xl" style={{ boxShadow: "0px 0px 20px #00000030" }}>

            <div className="bg-zinc-200 h-52  max-sm:h-32  rounded-lg relative overflow-hidden ">
                <Image className="object-cover group-hover:scale-110" src={article.thumbnail} fill alt="fill" />
            </div>

            <div className="p-1">
                <div className=" max-sm:h-14 font-bold  flex items-center h-20  ">{article.title.slice(0,50).toUpperCase()}</div>

                <div className="w-full text-sm max-sm:text-xs  shadow-inner px-2 h-20 max-sm:h-32  py-4 bg-slate-300 bg-opacity-15 rounded-xl  max-sm:text-xs shadow-gray-300  ">
                    {article.disc.slice(0, 100) + "..."}
                </div>
                <div className="flex justify-between p-3 items-baseline">
                    <div className="text-xl ">prix:</div>
                    <div className="p-2   text-sm rounded-xl text-white bg-black ">{article.price + " "}dzd</div>
                </div>
                <div className="flex justify-center">
                    <Link href={"/articles/" + article.id} className="font-extrabold border border-black rounded-lg px-5 py-2 hover:text-white hover:bg-black ">Placez votre commande</Link>
                </div>
            </div>
        </div>
    );
}

export default ArtcileCard;