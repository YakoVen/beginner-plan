import ArticleEditor from "@/components/dashboard/article-editor";
import { getArticle } from "@/service/firebase/database";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

async function EditorPage({ params }: Props) {
    const { id } = await params;
    const article = await getArticle(id);

    if (!article) {
        notFound();
    }

    return (
        <div className="min-h-screen">
            <ArticleEditor article={article} />
        </div>
    );
}

export default EditorPage;
