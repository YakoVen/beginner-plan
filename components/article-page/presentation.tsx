"use client";

import { Article } from "@/interfaces/article";
import Carousel from "./widgets/carousel";
import { useState } from "react";

import { contact_info, store_url } from "@/service/constants";

function Presentation({ article }: { article: Article }) {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const articleUrl = `https://${store_url}/articles/${article.id}`;
  const whatsappMessage = encodeURIComponent(`Bonjour, je suis intéressé par l'article: ${article.title} (${article.price} DZD). Voici le lien: ${articleUrl}`);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 min-w-0">
      {/* Top - Gallery full width */}
      <div className="w-full">
        <Carousel images={[article.thumbnail, ...(article.screenshots || [])]} />
      </div>

      {/* Under gallery - Title / price / stock */}
      <div className="w-full flex flex-col text-left">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
          {article.title}
        </h2>

        <div className="flex items-end gap-3 mb-5">
          <span className="text-3xl md:text-4xl font-extrabold text-green-700">{article.price} DZD</span>
          {article.oldPrice && (
            <span className="text-xl text-gray-400 line-through mb-1">{article.oldPrice} DZD</span>
          )}
          <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full mb-2 ml-auto">
            En stock
          </span>
        </div>

        {/* Description under image (was side column competing with order form) */}
        <div className="text-gray-600 leading-relaxed mb-6 bg-gray-50 p-5 rounded-xl border border-gray-100" style={{ whiteSpace: "pre-line" }}>
          {article.description}
        </div>

        {/* WhatsApp Quick Order & Share */}
        <div className="w-full mt-auto pt-4 space-y-5">
          <a 
            href={`https://wa.me/${contact_info.phone1}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 p-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors font-bold text-lg shadow-md hover:shadow-lg"
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
              className="w-10 h-10 flex items-center justify-center rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
              title="Partager sur WhatsApp"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              title="Partager sur Facebook"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            
            <button
              onClick={handleCopy}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${copied ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              title="Copier le lien"
            >
              <i className={`fa-solid ${copied ? 'fa-check' : 'fa-link'}`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Presentation;
