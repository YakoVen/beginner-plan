"use client"
import Image from "next/image";
import AvailableButton from "./available-button";
import { useState } from "react";
import Link from "next/link";
import { Article } from "@/interfaces/article";
import { categories } from "@/service/constants";
import { saveArticle, deleteArticle } from "@/service/firebase/database";
import { useRouter } from "next/navigation";

function EditCard({ article, viewMode = "grid" }: { article: Article, viewMode?: "grid" | "list" }) {
  const [active, setActive] = useState(article.active);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  const categoryName = (article.category >= 0 && article.category < categories.length) 
    ? categories[article.category].name 
    : "Inconnu";

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteArticle(article.id);
      setShowDeleteModal(false);
      router.refresh();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`relative flex text-opacity-75 shadow-lg border rounded-2xl shadow-slate-400 bg-white group ${viewMode === 'list' ? 'flex-row items-center w-full max-w-4xl h-32 p-3 gap-4' : 'flex-col items-center justify-between py-6 px-3 h-80 w-56'}`}>
        
        {/* Delete button (top right) */}
        <button 
          onClick={() => setShowDeleteModal(true)}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white text-red-500 rounded-full shadow hover:bg-red-500 hover:text-white transition-colors z-10 opacity-0 group-hover:opacity-100 focus:opacity-100"
          title="Supprimer l'article"
        >
          <i className="fa-solid fa-trash text-sm"></i>
        </button>

        <div className={`relative rounded-xl overflow-hidden bg-slate-500 shrink-0 ${viewMode === 'list' ? 'w-24 h-24' : 'w-52 h-40'}`}>
          {article.thumbnail.length > 0 && <Image alt="" fill sizes="208px" className="object-cover" src={article.thumbnail} />}
        </div>
        
        <div className={`flex flex-col flex-grow ${viewMode === 'list' ? 'justify-center' : 'w-full'}`}>
          <div className="py-1">
            <div className="px-3 py-1 w-fit text-[10px] sm:text-xs bg-blue-600 rounded-lg text-white font-medium">
              {categoryName}
            </div>
          </div>
          
          <div className={`flex flex-col justify-center ${viewMode === 'list' ? 'mt-1' : 'my-2'}`}>
            <div className={`truncate font-semibold text-gray-800 ${viewMode === 'list' ? 'w-48 sm:w-80 text-lg' : 'w-full'}`} title={article.title}>
              {article.title}
            </div>
            <div className={`font-bold text-gray-600 ${viewMode === 'list' ? 'text-sm mt-1' : 'text-end text-sm'}`}>
              {article.price} DZD
            </div>
          </div>
        </div>

        <div className={`flex gap-2 shrink-0 ${viewMode === 'list' ? 'flex-col sm:flex-row items-center pr-10' : 'justify-around w-full mt-auto'}`}>
          <AvailableButton 
            active={active} 
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              try {
                const flag = !active;
                const updatedArticle = { ...article, active: flag };
                await saveArticle(updatedArticle);
                setActive(flag);
              } finally {
                setLoading(false);
              }
            }} 
          />
          <Link 
            href={"/dashboard/articles/" + article.id} 
            className="px-3 py-2 border rounded-xl text-sm bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition text-white font-medium min-w-[90px]"
          >
            Modifier
          </Link>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Confirmer la suppression</h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowDeleteModal(false)}
                disabled={loading}
                className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium disabled:opacity-50"
              >
                Annuler
              </button>
              <button 
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-trash"></i>}
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditCard;