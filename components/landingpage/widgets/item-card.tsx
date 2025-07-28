import { article } from "@/interfaces/article";
import Image from "next/image";
import Link from "next/link";

function FeaturedCard({ article }: { article: article }) {
    return (
        <div className="group  min-w-[250px]  w-[300px] md:w-[250px] md:min-w-250px] max-w-[98vw]   p-3 rounded-xl" style={{ boxShadow: "0px 0px 20px #00000030" }}>
            <div className="bg-zinc-200 max-sm:h-44 mb-4 h-40 rounded-lg relative overflow-hidden  ">
                <Image className="object-cover group-hover:scale-110" src={article.thumbnail} fill alt="fill" />
            </div>
            <div>
               

                <div className=" font-bold h-16 items-center  flex overflow-auto max-sm:h-11 mb-4 ">{article.title.toUpperCase().slice(0, 40) + (article.title.length > 40 ? "..." : "")}</div>
                <div className=" flex items-baseline justify-between">
                    <div className="text-xl">{article.price}dzd</div>
                    <Link href={"/articles/" + article.id} className="font-extrabold italic ms-auto  hover:scale-110   "> Voire plus </Link>
                </div>

                <div className="max-w-full   max-sm:text-xs text-sm max-sm:h-20 h-24 shadow-inner px-2  my-4 py-4 bg-slate-100 bg-opacity-55 rounded-xl shadow-gray-300  ">
                    {article.disc.slice(0, 100) + "..."}

                </div>

                <div className="p-1"></div>

            </div>
        </div>
    );
}

export default FeaturedCard;