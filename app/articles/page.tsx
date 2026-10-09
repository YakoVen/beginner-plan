import { getArticles } from "@/service/firebase/database";
import ArticlesListing from "@/components/articles-page/articles-listing";
import { Suspense } from "react";
import { ProductCardSkeleton } from "@/components/general/skeleton";

async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <Suspense
      fallback={
        <div className="w-full flex flex-col pb-12">
          <div className="flex-grow p-3 sm:p-4 md:p-6">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ArticlesListing articles={articles} />
    </Suspense>
  );
}

export default ArticlesPage;
