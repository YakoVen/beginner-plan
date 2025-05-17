import FeaturedCard from "./widgets/item-card";
import { article } from "@/interfaces/article";


async function SuggestionPreview({articles}:{articles:article[]}) {


    return (
        <div className="px-6 md:px-12 py-12 md:py-6">
            <div className="text-2xl md:text-4xl font-extrabold md:pb-12">Ajoutez a votre collection</div>

            <div className="flex flex-wrap justify-center gap-3  relative">
                {articles.filter((e, i) => i < 4).map((e, i) =>
                    <FeaturedCard article={e} key={i} />
                )}

            </div>
            <div className="text-center pt-12 font-extrabold underline">Voir Plus</div>
        </div>
    );
}

export default SuggestionPreview;