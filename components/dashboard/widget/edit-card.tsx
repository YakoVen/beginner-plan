"use client"
import Image from "next/image";
import AvailableButton from "./available-button";
import { useState } from "react";
import Link from "next/link";
import { article } from "@/interfaces/article";
import { categories } from "@/service/constants";
import { saveArticle } from "@/service/suberbase/databasehandle";



function EditCard({ article }: { article: article }) {
  const [active, setActive] = useState(article.active);
  return (
    <div className="py-6 px-3 h-80 w-56 flex-col border text-opacity-75 shadow-lg border rounded-2xl shadow-slate-400 flex items-center justify-center">
      <div className="relative w-52 h-40 rounded-xl overflow-hidden bg-slate-500 ">
        {article.thumbnail.length > 0 && <Image alt="" fill className="object-cover" src={article.thumbnail} />
        }
      </div>
      <div className="w-full py-1">
        <div className="px-4 py-1 w-fit text-xs bg-slate-800 rounded-lg text-white">
          {categories[article.category].name}
        </div>
      </div>
      <div className="w-full  flex flex-col justify-center">
        <div>
        {article.title.length>22 &&article.title.slice(0,22)+"..."}
        {article.title.length<=22 &&article.title}
        </div>
        <div className=" text-end"> {article.price + "  dzd"}</div>
      </div>

      <div className="flex justify-around gap-2">
        <AvailableButton active={active} onClick={async (e) => {
          e.target.disabled = true;
          const flag = !active;
          article.active = flag;
          await saveArticle(article);
          setActive(flag);
          e.target.disabled = false;

        }} />
        <Link href={"/dashboard/articles/" + article.id} className="px-3  py-2   border rounded-xl text-md bg-yellow-500  hover:bg-yellow-400">
          Modifier
        </Link>
      </div>
    </div>
  );
}

export default EditCard;