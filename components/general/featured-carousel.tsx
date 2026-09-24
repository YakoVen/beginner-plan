"use client"
import { Article } from "@/interfaces/article";
import { getArticles } from "@/service/firebase/database";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function FeaturedCarousel() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        getArticles().then(res => setArticles(res));
    }, []);

    useEffect(() => {
        if (articles.length === 0) return;
        
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setIndex((prevIndex) =>
                    prevIndex === articles.length - 1 ? 0 : prevIndex + 1
                );
                setFade(true);
            }, 700); // fade-out duration
        }, 10000); // 10 seconds

        return () => clearInterval(interval);
    }, [articles.length]);

    if (articles.length === 0 || !articles[index]) {
        return (
            <div className="flex flex-col w-full md:w-[85%] lg:w-[100%] lg:h-[600px] h-[450px] sm:h-[500px] sm:w-[60%] md:h-[500px] rounded-2xl overflow-hidden bg-gray-100 relative">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
                {/* Skeleton content overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-36 sm:h-40 bg-gradient-to-t from-gray-300/80 to-transparent p-4 sm:p-6 flex flex-col justify-end gap-3">
                    <div className="h-6 w-2/3 bg-gray-400/40 rounded-lg animate-pulse" />
                    <div className="flex gap-3">
                        <div className="h-10 w-32 bg-gray-400/30 rounded-xl animate-pulse" />
                        <div className="h-10 w-32 bg-blue-400/30 rounded-xl animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex flex-col w-full md:w-[85%] lg:w-[100%] lg:h-[600px] h-[450px] sm:h-[500px] sm:w-[60%] md:h-[500px] rounded-2xl overflow-hidden">
            {/* Image */}
            <div
                className={`bg-slate-300 flex-grow h-full w-full absolute inset-0 transition-opacity duration-700 ${
                    fade ? "opacity-100" : "opacity-0"
                }`}
            >
                <Image
                    src={articles[index].thumbnail}
                    alt={articles[index].title}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 500px"
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 h-36 sm:h-40 bg-gradient-to-t from-black/90 to-black/60 flex flex-col justify-center p-4 sm:p-6 gap-3 z-10">
                <div className="text-white flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 items-start sm:items-center">
                    <div className="text-base sm:text-lg md:text-xl font-extrabold drop-shadow-md">
                        {articles[index].title.slice(0, 40)}
                    </div>
                    <div className="min-w-fit text-sm sm:text-base drop-shadow-md">
                        <div className="font-bold">Prix :</div>
                        <div>
                            {articles[index].price} dzd
                        </div>
                    </div>
                </div>

                <div className="text-white font-extrabold flex flex-col sm:flex-row gap-3 justify-around">
                    <button
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl w-full sm:w-44 py-2 sm:py-3 text-center transition-all duration-300"
                        onClick={() =>
                            setIndex(index < articles.length - 1 ? index + 1 : 0)
                        }
                    >
                        Suivant
                    </button>
                    <Link
                        href={"/articles/" + articles[index].id}
                        className="bg-blue-600 hover:bg-blue-700 rounded-xl w-full sm:w-44 py-2 sm:py-3 text-center block transition-all duration-300"
                    >
                        Voir l'article
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default FeaturedCarousel;
