import tmp1 from "@/assets/tmp/1.png";
import tmp2 from "@/assets/tmp/2.webp";
import Image from "next/image";

function CategorieCard({ CategorieTitle }: { CategorieTitle: string }) {
    return (
        <div className="w-full max-w-md mx-auto">
            {/* Thumbnail */}
            <div className="rounded-lg h-40 w-full bg-gray-400"></div>

            {/* Content */}
            <div className="bg-black rounded-lg text-white pt-6 pb-3 px-4 sm:px-6">
                {/* Header */}
                <div className="flex gap-2 pb-2 items-center">
                    <div className="p-2 border rounded-full flex-shrink-0">
                        <img
                            width="35"
                            height="35"
                            src="https://img.icons8.com/ios-filled/50/FFFFFF/clothes.png"
                            alt="clothes"
                        />
                    </div>
                    <div className="font-extrabold text-lg sm:text-xl">{CategorieTitle}</div>
                </div>

                {/* Stats + button */}
                <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center">
                    <div>
                        <div className="text-xs sm:text-sm font-extralight text-zinc-400">
                            Produits
                        </div>
                        <div className="text-sm sm:text-base">30+</div>
                    </div>
                    <div>
                        <div className="text-xs sm:text-sm font-extralight text-zinc-400">
                            Commands ce mois
                        </div>
                        <div className="text-sm sm:text-base">40+</div>
                    </div>

                    <div className="flex-grow flex justify-center sm:justify-end">
                        <button className="bg-zinc-900 px-4 sm:px-6 py-2 text-sm sm:text-base rounded-xl whitespace-nowrap">
                            Voir plus
                        </button>
                    </div>
                </div>

                {/* Products preview */}
                <div className="flex gap-2 py-6 overflow-x-auto">
                    {[tmp1, tmp2, tmp1, tmp2].map((img, i) => (
                        <div
                            key={i}
                            className="rounded-xl overflow-hidden h-[65px] w-[65px] sm:h-[75px] sm:w-[75px] flex-shrink-0"
                        >
                            <Image src={img.src} height={75} width={75} alt="" className="object-cover" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CategorieCard;
