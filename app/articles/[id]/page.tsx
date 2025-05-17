import { PageProps } from "@/.next/types/app/layout";
import OrderCard from "@/components/article-page/order-card";
import Presentation from "@/components/article-page/presentation";
import { getArticle } from "@/service/suberbase/databasehandle";


// ✅ Générer les métadonnées dynamiquement (SEO dynamique)
export async function generateMetadata({ params }:PageProps) {
    const { id } = await params;

    const data = await getArticle(id);

    return {
        title: `${data.title} | MaBelleCuisine`,
        description: data.disc,
        openGraph: {
            title: data.title,
            description: data.disc,
            images: [{ url: data.thumbnail }],
            url: `https://mabellecuisine.com/${data.id}`,
            siteName: "MaBelleCuisine",
        },
        twitter: {
            card: "summary_large_image",
            title: data.title,
            description: data.disc,
            images: [data.thumbnail],
            site: "@MaBelleCuisine",
        },
    };
}

async function AriclePage({ params }:PageProps) {

    const { id } = await params;

    const article = await getArticle(id);
    console.log(article);

    // Récupération des données pour le SEO



    return (


        <div className=" max-lg:min-h-screen lg:h-screen pt-20 flex-col flex ">

            <div className="flex-grow p-4 overflow-y-auto gap-5 flex max-md:flex-wrap" >
                <Presentation article={article} />
                <OrderCard article={article} />
            </div>
        </div>


    );
}

export default AriclePage;