"use client"
import Image from "next/image";
import { article } from "@/interfaces/article";
import { categories } from "@/service/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";

function CategorieCard({ articles, CategorieTitle, CategorieThumbnail, Icon }: { articles: article[], Icon: string, CategorieTitle: string, CategorieThumbnail: string }) {


    const products = articles.filter((e) => categories[e.category].name == CategorieTitle)
    const nav = useRouter();
    return (
        <div className="">
            <div className="rounded-lg  h-40 w-96 max-md:w-80  bg-gray-400 overflow-hidden relative">
                <Image src={CategorieThumbnail} alt="assiette" fill className="object-cover" />
            </div>

            <div className="bg-black rounded-lg text-white pt-6 pb-3 px-6">
                <div className="flex gap-1 pb-2 items-center">
                    <div className="p-2 border rounded-full">
                        <img width="35" height="35" src={Icon} alt="clothes" /></div>
                    <div className="font-extrabold text-xl">{CategorieTitle}</div>
                </div>

                <div className="flex gap-3 ">
                    <div>
                        <div className="text-sm font-extralight text-zinc-400">Produits</div>
                        <div>{products.length}+</div>
                    </div>
               

                    <div className="flex-grow flex justify-center">
                    </div>
                    <Link href={"/articles?categorie="+CategorieTitle} className="bg-zinc-900 px-6 flex justify-center items-center  rounded-xl">Voir plus</Link>

                </div>


                <div className="flex gap-2 py-6 ">
                    {products.filter((e) => e.active).map((e, i) =>
                        <div key={i} className="rounded-xl overflow-hidden ">
                            <Image src={e.thumbnail} height={75} width={75} alt="" onClick={()=>nav.replace("/articles/"+e.id)} />
                        </div>)}
                    {products.filter((e) => e.active).length == 0 &&
                        <div className="rounded-xl overflow-hidden h-[75px] text-center justify-center items-center  flex opacity-50 w-full ">
                            stock rompu
                        </div>}

                </div>

            </div>
        </div>
    );
}

export default CategorieCard;