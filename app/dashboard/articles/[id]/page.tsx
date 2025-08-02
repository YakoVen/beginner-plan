import ArticleEditor from "@/components/dashboard/article-editor";
import { getArticle } from "@/service/suberbase/databasehandle";

import { PageProps } from "@/.next/types/app/layout";
async function EditorPage({ params }:PageProps) {


    const { id } = await params;

    const article = await getArticle(id);
    console.log(article);

    return (
        <div className="min-h-screen">
            <ArticleEditor article={article} />
        </div>
    );
}

export default EditorPage;
