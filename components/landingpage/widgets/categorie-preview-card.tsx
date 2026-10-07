"use client"
import Link from "next/link";
import { Article } from "@/interfaces/article";

function CategorieCard({
    articles,
    CategorieTitle,
    CategorieThumbnail,
    Icon
}: {
    articles: Article[],
    Icon: string,
    CategorieTitle: string,
    CategorieThumbnail: string
}) {
    // Map colors based on category title
    const getColorClass = (title: string) => {
        const titleLower = title.toLowerCase();
        if (titleLower.includes("mode") || titleLower.includes("accessoires")) return "bg-green-50 text-green-700 border-green-100 hover:bg-green-100";
        if (titleLower.includes("high-tech") || titleLower.includes("audio")) return "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100";
        if (titleLower.includes("maison") || titleLower.includes("décoration")) return "bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100";
        if (titleLower.includes("sport") || titleLower.includes("bien")) return "bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100";
        if (titleLower.includes("beauté") || titleLower.includes("cosmétiques")) return "bg-pink-50 text-pink-700 border-pink-100 hover:bg-pink-100";
        if (titleLower.includes("bagagerie") || titleLower.includes("voyage")) return "bg-yellow-50 text-yellow-700 border-yellow-100 hover:bg-yellow-100";
        return "bg-gray-50 text-gray-700 border-gray-100 hover:bg-gray-100";
    };

    // Get an icon based on title
    const getIconClass = (title: string) => {
        const titleLower = title.toLowerCase();
        if (titleLower.includes("mode") || titleLower.includes("accessoires")) return "fa-solid fa-shirt";
        if (titleLower.includes("high-tech") || titleLower.includes("audio")) return "fa-solid fa-headphones";
        if (titleLower.includes("maison") || titleLower.includes("décoration")) return "fa-solid fa-house-chimney";
        if (titleLower.includes("sport") || titleLower.includes("bien")) return "fa-solid fa-dumbbell";
        if (titleLower.includes("beauté") || titleLower.includes("cosmétiques")) return "fa-solid fa-spa";
        if (titleLower.includes("bagagerie") || titleLower.includes("voyage")) return "fa-solid fa-suitcase-rolling";
        return "fa-solid fa-tag";
    };

    const colorClass = getColorClass(CategorieTitle);
    const iconClass = getIconClass(CategorieTitle);

    return (
        <Link href={"/articles?categorie=" + encodeURIComponent(CategorieTitle)}>
            <div className={`flex flex-col items-center justify-center p-6 w-[160px] h-[130px] rounded-3xl border transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer ${colorClass}`}>
                <div className="text-3xl mb-3">
                    <i className={iconClass}></i>
                </div>
                <div className="text-sm font-semibold text-center leading-tight">
                    {CategorieTitle}
                </div>
            </div>
        </Link>
    );
}

export default CategorieCard;