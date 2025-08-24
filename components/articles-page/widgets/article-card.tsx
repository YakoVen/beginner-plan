import { article } from "@/interfaces/article";
import Image from "next/image";
import Link from "next/link";

function ArtcileCard({ article }: { article: article }) {
  return (
    <div
      className="group w-full sm:w-[280px] md:w-[250px] max-w-[98vw] 
                 flex flex-col rounded-xl overflow-hidden p-3 bg-white"
      style={{ boxShadow: "0px 0px 20px #00000030" }}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-40 sm:h-48 md:h-52 rounded-lg overflow-hidden bg-zinc-200">
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-2 flex flex-col flex-grow">
        {/* Title */}
        <div className="font-bold text-sm sm:text-base md:text-lg flex items-center min-h-[3rem] line-clamp-2">
          {article.title.toUpperCase()}
        </div>

        {/* Description */}
        <div className="mt-2 w-full text-xs sm:text-sm shadow-inner px-3 py-2 flex justify-center items-center bg-slate-300 bg-opacity-15 rounded-xl shadow-gray-300 line-clamp-3">
          {article.disc}
        </div>

        {/* Price */}
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm sm:text-base font-medium">Prix:</span>
          <span className="px-3 py-1 text-sm sm:text-base rounded-xl text-white bg-black font-bold">
            {article.price} dzd
          </span>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-4">
          <Link
            href={`/articles/${article.id}`}
            className="text-xs sm:text-sm md:text-base font-extrabold border border-black rounded-lg px-4 py-2 hover:text-white hover:bg-black transition"
          >
            Placez votre commande
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ArtcileCard;
