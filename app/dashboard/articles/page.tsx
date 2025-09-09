
import EditCard from "@/components/dashboard/widget/edit-card";
import { getArticles } from "@/service/suberbase/databasehandle";
import Link from "next/link";

export async function getServerSideProps() {
  return { props: {} };
}

async function ArticleEditorPreviewPage() {


  const articles = await getArticles();


  return (
    <div className="min-h-screen overflow-y-auto">
      <div className="p-12 flex gap-3 flex-wrap justify-center ">
        <div className="h-80 w-56 text-4xl  text-opacity-75 shadow-lg border rounded-2xl shadow-slate-400 flex justify-center items-center">
          <Link href={"/dashboard/articles/add"} className="h-full w-full flex justify-center items-center">
            +
          </Link>
        </div>

        {articles.map((e, i) => {
          return <EditCard  article={e} key={i} />
        })}

      </div>
    </div>
  );
}

export default ArticleEditorPreviewPage;
