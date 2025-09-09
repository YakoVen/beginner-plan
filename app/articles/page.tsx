
import { getArticles } from "@/service/suberbase/databasehandle";
import ArticlesListing from "@/components/articles-page/articles-listing";
import { Suspense } from "react";


export async function getServerSideProps() {
  return { props: {} };
}
async function AriclesPage() {

  const articles = await getArticles()


  return (
    <div className=" max-w-[100vw] ">
      <Suspense fallback={<div>Loading...</div>}>
        <ArticlesListing articles={articles} />
      </Suspense>
    </div>
  );
}

export default AriclesPage;
