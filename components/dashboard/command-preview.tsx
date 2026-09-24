"use client"
import { Article } from "@/interfaces/article";
import { getArticle } from "@/service/firebase/database";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function CommandPreview({ article_id , close }: { article_id: string, close: () => void }) {
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        getArticle(article_id).then((e) => { setArticle(e) })
    }, [article_id]);

    return (
        <div 
          className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-40 flex justify-center items-center z-50"
          onClick={close}
        >
            <div 
              className="p-5 gap-4 items-stretch w-80 shadow shadow-slate-400 flex flex-col justify-center items-center bg-white rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
                <div className="text-2xl">L'article :</div>
                {article && (
                    <div className="h-40 w-full relative rounded-lg overflow-hidden">
                        <Image alt="" className="object-cover" fill sizes="320px" src={article.thumbnail} />
                    </div>
                )}
                <div className="text-lg text-center">{article?.title.slice(0,150)}</div>
                <div className="font-bold">Prix: {article?.price} dzd</div>
                {article && (
                  <Link 
                    href={"/articles/" + article?.id} 
                    className="p-3 rounded-lg border border-black hover:bg-black hover:text-white text-center w-full transition"
                  >
                    Aller vers cet article
                  </Link>
                )}
                <button 
                  className="p-3 rounded-lg border border-black hover:bg-black hover:text-white w-full transition" 
                  onClick={close}
                >
                  Fermer
                </button>
            </div>
        </div>
    );
}

export default CommandPreview;