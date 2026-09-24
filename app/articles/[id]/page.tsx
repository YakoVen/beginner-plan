import OrderCard from "@/components/article-page/order-card";
import Presentation from "@/components/article-page/presentation";
import { Breadcrumbs } from "@/components/general/breadcrumbs";
import { store_name, store_url } from "@/service/constants";
import { getArticle } from "@/service/firebase/database";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
    const { id } = await params;
    const data = await getArticle(id);

    if (!data) {
        return {
            title: `Article non trouvé | ${store_name}`,
        };
    }

    return {
        title: `${data.title} | ${store_name}` ,
        description: data.description,
        openGraph: {
            title: data.title,
            description: data.description,
            images: [{ url: data.thumbnail }],
            url: `https://${store_url}/articles/${data.id}`,
            siteName: store_name,
        },
        twitter: {
            card: "summary_large_image",
            title: data.title,
            description: data.description,
            images: [data.thumbnail],
            site: `@${store_name.replace(" ", "")}`,
        },
    };
}

async function ArticlePage({ params }: Props) {
    const { id } = await params;
    const article = await getArticle(id);

    if (!article) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-20 flex flex-col max-w-7xl mx-auto">
            <div className="px-4 mt-2">
                <Breadcrumbs 
                    items={[
                        { label: "Boutique", href: "/articles" }, 
                        { label: article.title }
                    ]} 
                />
            </div>
            <div className="flex-grow p-4 gap-8 flex flex-col lg:flex-row">
                <Presentation article={article} />
                <OrderCard article={article} />
            </div>
        </div>
    );
}

export default ArticlePage;