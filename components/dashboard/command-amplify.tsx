"use client";
import { article } from "@/interfaces/article";
import { order } from "@/interfaces/order";
import { delivery_price } from "@/service/constants";
import { getArticle } from "@/service/suberbase/databasehandle";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function CommandAmplifyed({
  article_id,
  order,
  close,
}: {
  article_id: string;
  order: order;
  close: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  const [article, setArticle] = useState<article | null>(null);

  useEffect(() => {
    getArticle(article_id).then((e) => {
      setArticle(e);
    });
  }, []);
  return (
    <div className="p-5  fixed top-0 h-screen w-screen shadow  flex flex-col justify-center  items-center shadow-slate-400  pt-20    bg-opacity-40 bg-white ">
      <div
        ref={contentRef}
        className="flex-grow flex flex-col gap-2  justify-center items-stretch w-[500px] max-w-[100vw]  bg-white p-6 shadow-lg shadow overflow-auto"
      >
        <div className="text-2xl">la commande : 
                      <div className="text-xl font-semibold ml-2 ">{article?.title.slice(0, 150)}</div>
        </div>
        {article && (
          <div className="h-64 w-full relative rounded-lg overflow-hidden bg-gray-100">
            <Image
              alt=""
              className="object-contain"
              fill
              src={article.thumbnail}
            />
          </div>
        )}
        <div>
          <div className="text-xl capitalize">Pour :{order.name} </div>
          <div className="text-lg underline">N°:{order.phone} </div>
        </div>
        <div className=" flex justify-center text-sm">
          {article && (
            <div>
              <div>Prix d&apos;unite: {article?.price + " dzd"}</div>
              <div>Quantite : {order.quantity}</div>
              <div>frais de livraison : {delivery_price} dzd</div>
              <div className="text-lg font-extrabold">
                TOTAL :{" "}
                {article?.price * order.quantity + delivery_price + " dzd"}
              </div>
            </div>
          )}
        </div>
    <div className="flex justify-evenly items-center gap-3">
      {article && (
        <Link
          href={"/articles/" + article?.id}
          className="flex-1 p-3 rounded-lg border border-black hover:bg-black hover:text-white text-center"
        >
          allez vers cette article
        </Link>
      )}
      <button
        className="flex-1 p-3 rounded-lg border border-black hover:bg-black hover:text-white"
        onClick={close}
      >
        fermer
      </button>
    </div>
      </div>
    </div>
  );
}

export default CommandAmplifyed;
