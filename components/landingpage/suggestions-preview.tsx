import { Article } from "@/interfaces/article";
import FeaturedCard from "./widgets/item-card";
import Link from "next/link";

function SuggestionPreview({ articles }: { articles: Article[] }) {
    return (
        // Responsive padding for the entire section
        <div className="px-4 sm:px-6 md:px-12 py-12 bg-gray-50">
            {/* Responsive and aligned title */}
            <div className="text-center md:text-left pb-8 md:pb-12">
                <div className="text-3xl md:text-4xl font-extrabold mb-2">
                    Ajoutez à votre collection
                </div>
                <div className="text-gray-500 text-lg mb-8">
                    Nos dernières nouveautés sélectionnées pour vous
                </div>
            </div>

            {/* Centered, wrapping container with responsive gaps for the cards */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {articles.filter((_, i) => i < 4).map((e) => (
                    <FeaturedCard article={e} key={e.id} />
                ))}
            </div>

            {/* "Voir Plus" link with hover effect and responsive text size */}
            <div className="text-center pt-12">
                <Link href="/articles" className="text-lg md:text-xl font-extrabold underline transition-colors hover:text-blue-600">
                    Voir Plus
                </Link>
            </div>
        </div>
    );
}

export default SuggestionPreview;