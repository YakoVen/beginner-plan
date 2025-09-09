import { article } from "@/interfaces/article";
import Image from "next/image";

// Assumption: Your 'article' interface will now include originalPrice, rating, and salesCount.
// For example:
// interface article {
//     id: number;
//     title: string;
//     thumbnail: string;
//     price: number; // This will be the sale price
//     originalPrice: number; // The price to be struck through
//     rating: number;
//     salesCount: number;
//     // disc is no longer used in this component
// }

function FeaturedCard({ article }: { article: article }) {
    return (
        // Set the direction to right-to-left for proper Arabic text alignment
        <div
            dir="rtl"
            className="group w-full max-w-xs bg-white p-3 rounded-lg shadow-md flex-shrink-0 flex flex-col"
        >
            {/* Thumbnail */}
            <div className="bg-zinc-200 h-44 mb-3 rounded-md relative overflow-hidden">
                <Image
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    src={article.thumbnail}
                    fill
                    alt={article.title}
                />
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-grow">
                {/* Title */}
                <h3 className="font-semibold h-12 mb-2 text-gray-800 text-right overflow-hidden">
                    {/* The title is no longer uppercased */}
                    {article.title}
                </h3>

                {/* Price Section */}
                <div className="flex items-baseline justify-end gap-3 mb-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-orange-500 font-bold text-2xl">
                            {article.price}
                        </span>
                        <span className="text-orange-500 font-semibold">دج</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-gray-400 line-through">
                            {article.originalPrice}
                        </span>
                        <span className="text-gray-400 text-sm">دج</span>
                    </div>
                </div>

                {/* Rating and Sales Count */}
                {/* mt-auto pushes this section to the bottom of the card */}
                <div className="flex items-center justify-end gap-2 mt-auto text-gray-500 text-sm">
                    <span>{`+${article.salesCount} مباع`}</span>
                    <span>|</span>
                    <span>{article.rating}</span>
                    <span className="text-yellow-400 text-base">★</span>
                </div>
            </div>
        </div>
    );
}

export default FeaturedCard;