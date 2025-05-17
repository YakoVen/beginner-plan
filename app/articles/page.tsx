
import { getArticles } from "@/service/suberbase/databasehandle";
import ArticlesListing from "@/components/articles-page/articles-listing";
async function AriclesPage() {

const articles = await getArticles()


  return (
    <div className=" max-w-[100vw] ">
      <ArticlesListing articles={articles}/>
    </div>
  );
}

export default AriclesPage;
