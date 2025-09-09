import { article } from "@/interfaces/article";
import FeaturedCard from "./widgets/item-card";

async function SuggestionPreview({ articles }: { articles: article[] }) {
    return (
        // Responsive padding for the entire section
        <div className="px-4 sm:px-6 md:px-12 py-12">
            {/* Responsive and aligned title */}
            <div className="text-3xl md:text-4xl font-extrabold text-center md:text-left pb-8 md:pb-12">
                Ajoutez a votre collection
            </div>

            {/* Centered, wrapping container with responsive gaps for the cards */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {/* 
                  The .filter and .map logic remains unchanged. 
                  The responsiveness of the grid depends on the inner 'FeaturedCard' component
                  being able to handle different sizes. The flex-wrap container will manage the layout.
                */}
                {articles.filter((e, i) => i < 4).map((e, i) => (
                    <FeaturedCard article={e} key={i} />
                ))}
            </div>

            {/* "Voir Plus" link with hover effect and responsive text size */}
            <div className="text-center pt-12">
                <a href="#" className="text-lg md:text-xl font-extrabold underline transition-colors hover:text-green-600">
                    Voir Plus
                </a>
            </div>
        </div>
    );
}

export default SuggestionPreview;