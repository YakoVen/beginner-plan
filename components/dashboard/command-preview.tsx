"use client"
import { article } from "@/interfaces/article";
import { getArticle } from "@/service/suberbase/databasehandle";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function CommandPreview({ article_id ,close }: { article_id: string, close: () => void }) {

    const [article, setArticle] = useState<article | null>(null);


    useEffect(() => {
        getArticle(article_id).then((e) => { setArticle(e) })
    }, [])
    return (

        <div className="p-5 gap-4 items-stretch w-80  shadow  shadow-slate-400 flex flex-col justify-center items-center absolute top-1/2 bg-white left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="text-2xl">la commande :</div>
            {
                article &&
                <div className="h-40 w-full relative rounded-lg overflow-hidden">
                    <Image alt="" className="object-cover" fill src={article.thumbnail} />
                </div>
            }
            <div className="text-lg">{article?.title.slice(0,150)}</div>
            <div>Prix: {article?.price}</div>
            {article && <Link href={"/articles/" + article?.id} className="p-3 rounded-lg border border-black hover:bg-black hover:text-white text-center"> allez vers cette article</Link>}
            <button className="p-3 rounded-lg border border-black hover:bg-black hover:text-white" onClick={close}> fermer</button>

        </div>
    );
}

export default CommandPreview;