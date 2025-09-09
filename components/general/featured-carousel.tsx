"use client"
import { article } from "@/interfaces/article";
import { getArticles } from "@/service/suberbase/databasehandle";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function FeaturedCarousel() {
    const nav = useRouter();
    const [articles, setArticles] = useState<article[]>([]);
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        getArticles().then(res => setArticles(res));
    }, []);

    useEffect(() => {
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
    }, [articles, index]);

    return (
        <div className="flex flex-col w-full md:w-[85%] lg:w-[100%] lg:h-[600px] h-[450px] sm:h-[500px] sm:w-[60%] md:h-[500px] rounded-2xl overflow-hidden">

            {/* Image */}
            <div
                className={`bg-slate-300 flex-grow transition-opacity duration-700 relative ${
                    fade ? "opacity-100" : "opacity-0"
                }`}
            >
                {articles.length > 0 && (
                    <Image
                        src={articles[index].thumbnail}
                        alt={articles[index].title}
                        fill
                        className="object-cover"
                    />
                )}
            </div>

            {/* Content */}
            <div className="h-36 sm:h-40 bg-gray-700 flex flex-col justify-center p-4 sm:p-6 gap-3">
                <div className="text-white flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 items-start sm:items-center">
                    <div className="text-base sm:text-lg md:text-xl font-extrabold">
                        {articles.length > 0
                            ? articles[index].title.slice(0, 40)
                            : "LOADING ...."}
                    </div>
                    <div className="min-w-fit text-sm sm:text-base">
                        <div className="font-bold">Price:</div>
                        <div>
                            {articles.length > 0 ? articles[index].price : "0000.00"} dzd
                        </div>
                    </div>
                </div>

                <div className="text-white font-extrabolder flex flex-col sm:flex-row gap-3 justify-around">
                    <button
                        className="bg-gray-800 rounded-lg w-full sm:w-44 py-2 sm:py-3 text-center"
                        onClick={() =>
                            setIndex(index < articles.length - 1 ? index + 1 : 0)
                        }
                    >
                        Next
                    </button>
                    <button
                        className="bg-gray-800 rounded-lg w-full sm:w-44 py-2 sm:py-3 text-center"
                        onClick={() => nav.replace("/articles/" + articles[index].id)}
                    >
                        View item
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FeaturedCarousel;
