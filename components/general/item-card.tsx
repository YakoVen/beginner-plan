"use client";
import { article } from "@/interfaces/article";
import { getArticles } from "@/service/suberbase/databasehandle";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function ItemCard() {
    const [articles, setArticles] = useState<article[]>([]);
    const nav = useRouter();

    // Fetch articles once
    useEffect(() => {
        getArticles().then((res) => setArticles(res));
    }, []);

    const handleView = (id: string) => {
        nav.push(`/articles/${id}`);
    };

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 p-4">
            {articles.map((item, i) => (
                <div
                    key={i}
                    className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition cursor-pointer"
                    onClick={() => handleView(item.id)}
                >
                    {/* Image */}
                    <div className="relative h-40 sm:h-48">
                        <Image
                            src={item.thumbnail}
                            alt={item.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="p-3 flex flex-col gap-2">
                        {/* Title */}
                        <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
                            {item.title}
                        </h2>

                        {/* Prices */}
                        <div className="flex items-baseline gap-2">
                            <span className="text-gray-400 line-through text-xs">
                                {item.oldPrice ? `${item.oldPrice} دج` : ""}
                            </span>
                            <span className="text-red-600 font-bold text-lg">
                                {item.price} دج
                            </span>
                        </div>

                        {/* Rating & Sales */}
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span>{item.rating ?? "4.8"}</span>
                            <span>|</span>
                            <span>{item.sales ?? "3000+"} مبيع</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ItemCard;
