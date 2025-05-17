import tmp1 from "@/assets/tmp/1.webp";
import tmp2 from "@/assets/tmp/2.webp";
import Image from "next/image";

function CategorieCard({ CategorieTitle }: { CategorieTitle: string }) {



    return (
        <div className="">
            <div className="rounded-lg  h-40 w-96 bg-gray-400"></div>

            <div className="bg-black rounded-lg text-white pt-6 pb-3 px-6">
                <div className="flex gap-1 pb-2 items-center">
                    <div className="p-2 border rounded-full">
                        <img width="35" height="35" src="https://img.icons8.com/ios-filled/50/FFFFFF/clothes.png" alt="clothes" /></div>
                    <div className="font-extrabold text-xl">{CategorieTitle}</div>
                </div>

                <div className="flex gap-3 ">
                    <div>
                        <div className="text-sm font-extralight text-zinc-400">Produits</div>
                        <div>30+</div>
                    </div>
                    <div>
                        <div className="text-sm font-extralight text-zinc-400">Commands ce mois</div>
                        <div>40+</div>
                    </div>

                    <div className="flex-grow flex justify-center">
                        <button className="bg-zinc-900 px-6  rounded-xl">Voir plus</button>
                    </div>
                </div>


                <div className="flex gap-2 py-6 ">
                    <div className="rounded-xl overflow-hidden">
                        <Image src={tmp1.src} height={75} width={75} alt="" />
                    </div>

                    <div className="rounded-xl overflow-hidden">
                        <Image src={tmp2.src} height={75} width={75} alt=""/>
                    </div>
                    <div className="rounded-xl overflow-hidden">
                        <Image  alt="" src={tmp1.src} height={75} width={75}  />
                    </div>
                    <div className="rounded-xl overflow-hidden">
                        <Image alt="" src={tmp2.src} height={75} width={75}  />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CategorieCard;