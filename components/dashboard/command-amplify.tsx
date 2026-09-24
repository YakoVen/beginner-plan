"use client";
import { Article } from "@/interfaces/article";
import { Order } from "@/interfaces/order";
import { delivery_price } from "@/service/constants";
import { getArticle } from "@/service/firebase/database";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function CommandAmplifyed({
  article_id,
  order,
  close,
}: {
  article_id: string;
  order: Order;
  close: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    getArticle(article_id).then((e) => {
      setArticle(e);
    });
  }, [article_id]);

  return (
    <div className="p-5 fixed top-0 left-0 h-screen w-screen shadow flex flex-col justify-center items-center shadow-slate-400 pt-20 bg-black bg-opacity-40 z-50">
      <div
        ref={contentRef}
        className="flex-grow flex flex-col gap-2 justify-center items-stretch w-[500px] max-w-[100vw] bg-white p-6 shadow-lg overflow-auto rounded-xl"
      >
        <div className="text-2xl">La commande : 
          <div className="text-xl font-semibold ml-2 ">{order.command.title.slice(0, 150)}</div>
        </div>
        {article && (
          <div className="h-64 w-full relative rounded-lg overflow-hidden bg-gray-100">
            <Image
              alt=""
              className="object-contain"
              fill
              sizes="500px"
              src={article.thumbnail}
            />
          </div>
        )}
        <div>
          <div className="text-xl capitalize">Pour : {order.name} </div>
          <div className="text-lg underline">N° : {order.phone} </div>
          <div className="text-md">Adresse : {order.address} </div>
        </div>
        <div className="flex justify-center text-sm">
          <div>
            <div>Prix d'unité : {order.command.price} dzd</div>
            <div>Quantité : {order.quantity}</div>
            <div>Frais de livraison : {delivery_price} dzd</div>
            <div className="text-lg font-extrabold mt-2">
              TOTAL :{" "}
              {order.command.price * order.quantity + delivery_price} dzd
            </div>
          </div>
        </div>
        <div className="flex justify-evenly items-center gap-3 mt-4">
          {article && (
            <Link
              href={"/articles/" + article?.id}
              className="flex-1 p-3 rounded-lg border border-black hover:bg-black hover:text-white text-center transition"
            >
              Aller vers cet article
            </Link>
          )}
          <button
            className="flex-1 p-3 rounded-lg border border-black hover:bg-black hover:text-white transition"
            onClick={close}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommandAmplifyed;
