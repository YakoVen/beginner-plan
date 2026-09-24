"use client";

import { Article } from "@/interfaces/article";
import Carousel from "./widgets/carousel";
import { contact_info, store_url } from "@/service/constants";
import { useState } from "react";

function Presentation({ article }: { article: Article }) {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const articleUrl = `https://${store_url}/articles/${article.id}`;
  const whatsappMessage = encodeURIComponent(`Bonjour, je suis intéressé par l'article: ${article.title} (${article.price} DZD). Voici le lien: ${articleUrl}`);

  const handleCopy = () => {
    navigator.clipboard.writeText(articleUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full lg:w-3/5 flex flex-col items-center">
      <Carousel images={[article.thumbnail, ...(article.screenshots || [])]} />

      <h2 className="text-3xl font-bold mt-6 text-center text-gray-900">
        {article.title}
      </h2>

      <div className="mt-4 flex items-center justify-center gap-3">
        <span className="text-3xl font-bold text-blue-600">{article.price} DZD</span>
        {article.oldPrice && (
          <span className="text-lg text-gray-400 line-through">{article.oldPrice} DZD</span>
        )}
      </div>

      <p
        className="p-5 bg-gray-50 rounded-xl mt-6 w-full text-gray-700 leading-relaxed shadow-sm"
        style={{ whiteSpace: "pre-line" }}
      >
        {article.description}
      </p>

      {/* WhatsApp Quick Order & Share */}
      <div className="w-full mt-auto pt-8 space-y-5">
        <a 
          href={`https://wa.me/${contact_info.phone1}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 p-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors font-bold text-lg shadow-md hover:shadow-lg"
        >
          <i className="fa-brands fa-whatsapp text-2xl"></i>
          Commander sur WhatsApp
        </a>

        <div className="flex justify-center items-center gap-4 pt-5 border-t border-gray-100">
          <span className="text-sm text-gray-500 font-medium">Partager :</span>
          
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + " - " + articleUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
            title="Partager sur WhatsApp"
          >
            <i className="fa-brands fa-whatsapp text-xl"></i>
          </a>
          
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
            title="Partager sur Facebook"
          >
            <i className="fa-brands fa-facebook text-xl"></i>
          </a>
          
          <button
            onClick={handleCopy}
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${copied ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            title="Copier le lien"
          >
            <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'} text-xl`}></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Presentation;
