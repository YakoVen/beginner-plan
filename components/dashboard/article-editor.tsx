"use client";
import { Article } from "@/interfaces/article";
import { categories } from "@/service/constants";
import { saveArticle } from "@/service/firebase/database";
import { uploadFile, deleteFile } from "@/service/firebase/storage";
import { urlToFile } from "@/service/Utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";

function ArticleEditor({ article }: { article: Article | null }) {
  const [title, setTitle] = useState(article != null ? article.title : "");
  const [description, setDescription] = useState(article != null ? article.description : "");
  const [categorie, setCategorie] = useState(article != null ? article.category : -1);
  const [price, setPrice] = useState(article != null ? article.price : 0);

  const [thumbnail, setThumbnail] = useState(article != null ? article.thumbnail : "");
  const [screenshots, setSceenshots] = useState<string[]>(article?.screenshots != null ? article.screenshots : []);

  const [newscreenshots, setNewsceenshots] = useState<string[]>([]);

  const [saving, setSaving] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const nav = useRouter();

  const DeleteScreenShot = async (i: number) => {
    if (article) {
      try {
        await deleteFile(article.id + "/screenshots/" + i);
        setSceenshots(screenshots.filter((elm, index) => i != index));
      } catch (err) {
        setErrorMessage("Erreur lors de la suppression de la capture d'écran.");
      }
    } else {
      setSceenshots(screenshots.filter((elm, index) => i != index));
    }
  }

  const save = async () => {
    const id = article ? article.id : "art-" + Date.now().toString() + (Math.random() * 999).toFixed(0);

    let thumb_url = "";
    const sc_url: string[] = [];
    setErrorMessage("");
    try {
      if (
        thumbnail &&
        title.length > 0 &&
        description.length > 0 &&
        categorie > -1 &&
        price > 0 &&
        title.length > 0
      ) {
        setSaving(true);
        setUploaded(0);

        //upload thumbnail and save the url
        const thumbnail_file = await urlToFile(thumbnail, "file")
        const thumbResult = await uploadFile(id + "/thumbnail", thumbnail_file);
        thumb_url = thumbResult.url || "";
        setUploaded(1);

        // upload screenshots
        const merged = screenshots.concat(newscreenshots)
        for (let i = 0; i < merged.length; i++) {
          const sc = merged[i];
          const file = await urlToFile(sc, i + "");
          const result = await uploadFile(id + "/screenshots/" + i, file);
          setUploaded(prev => prev + 1);
          if (result.url) sc_url.push(result.url);
        }

        if (thumb_url.length > 0) {
          //create data
          const article_data: Article = {
            id: id,
            title: title,
            description: description,
            price: price,
            category: categorie,
            thumbnail: thumb_url,
            screenshots: sc_url,
            active: true,
          };
          
          await saveArticle(article_data);
          setSaving(false);
          nav.replace("/dashboard/articles")
        } else {
          setErrorMessage("Uploading error: Vérifiez votre connexion.");
          setSaving(false);
        }
      } else {
        setErrorMessage("Completez les informations");
        setSaving(false);
      }
    } catch (e) {
      setErrorMessage("Erreur ... vérifiez votre connexion.");
      setSaving(false);
    }
  };


  const totalFiles = 1 + screenshots.length + newscreenshots.length;
  const progressPercent = Math.max(0, Math.min(100, Math.round((uploaded / totalFiles) * 100))) || 0;

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col gap-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-4 border-b pb-4">
        <button 
          onClick={() => nav.push('/dashboard/articles')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {article != null ? "Modifier l'article" : "Nouvel Article"}
          </h1>
          {article != null && <div className="text-sm text-gray-500 mt-1">ID: {article.id}</div>}
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
          <i className="fa-solid fa-circle-exclamation"></i>
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-700">Image principale (Thumbnail)</label>
        <div className="relative w-full h-64 rounded-2xl overflow-hidden border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors bg-gray-50 flex items-center justify-center cursor-pointer group">
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setThumbnail(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
          {thumbnail.length > 0 ? (
            <>
              <Image src={thumbnail} alt="Thumbnail" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-4 py-2 bg-white text-gray-800 rounded-lg font-medium text-sm shadow">Changer</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              <i className="fa-solid fa-cloud-arrow-up text-4xl mb-3"></i>
              <span>Cliquez ou glissez une image</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-700">Informations générales</label>
        <InputText
          className="shadow-sm border w-full p-3 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
          value={title}
          placeholder="Titre de l'article"
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputTextarea
          className="shadow-sm border w-full p-3 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg min-h-[120px]"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <Dropdown
            placeholder="Catégorie"
            className="shadow-sm border w-full border-gray-300 px-3 rounded-lg flex items-center"
            value={categorie == -1 ? 0 : categories[categorie].name}
            onChange={(e) => setCategorie(categories.findIndex((c) => c.name == e.value))}
            options={categories.map((e) => e.name)}
          />
          <InputText
            className="shadow-sm border w-full p-3 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
            value={price + ""}
            placeholder="Prix (DZD)"
            keyfilter={"int"}
            onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-700 flex justify-between items-end">
          <span>Captures d'écran (Screenshots)</span>
          <span className="text-sm font-normal text-gray-500">{screenshots.length + newscreenshots.length} image(s)</span>
        </label>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border rounded-xl bg-gray-50 min-h-[160px]">
          {screenshots.map((e, i) => e.length > 0 && (
            <div key={`sc-${i}`} className="aspect-square relative rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
              <button
                type="button"
                onClick={() => DeleteScreenShot(i)}
                className="absolute top-2 right-2 rounded-full text-white h-7 w-7 hover:bg-red-600 bg-red-500 z-10 shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              <Image alt="Screenshot" src={e} fill className="object-cover" />
            </div>
          ))}

          {newscreenshots.map((e, i) => e.length > 0 && (
            <div key={`new-${i}`} className="aspect-square relative rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
              <button
                type="button"
                onClick={() => setNewsceenshots(newscreenshots.filter((elm, index) => i != index))}
                className="absolute top-2 right-2 rounded-full text-white h-7 w-7 hover:bg-red-600 bg-red-500 z-10 shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              <Image alt="New Screenshot" src={e} fill className="object-cover" />
            </div>
          ))}

          <div className="aspect-square relative rounded-xl overflow-hidden border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors bg-white flex items-center justify-center cursor-pointer">
            <input
              type="file"
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              onChange={(e) => {
                if (e.target.files) {
                  const add: string[] = [];
                  for (let i = 0; i < e.target.files.length; i++) {
                    add.push(URL.createObjectURL(e.target.files[i]));
                  }
                  setNewsceenshots((prevItems) => [...prevItems, ...add]);
                }
              }}
            />
            <div className="flex flex-col items-center text-gray-400">
              <i className="fa-solid fa-plus text-2xl mb-1"></i>
              <span className="text-xs text-center px-2">Ajouter</span>
            </div>
          </div>
        </div>
      </div>

      {saving && (
        <div className="w-full flex flex-col gap-2 mt-2 bg-blue-50 p-4 rounded-xl border border-blue-100">
          <div className="flex justify-between text-sm font-medium text-blue-800">
            <span>Envoi en cours...</span>
            <span>({uploaded}/{totalFiles})</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={save}
        className="w-full mt-4 p-4 rounded-xl font-bold text-white transition-all shadow-md flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
        disabled={saving}
      >
        {saving ? (
          <>
            <i className="fa-solid fa-circle-notch fa-spin"></i>
            Enregistrement...
          </>
        ) : (
          <>
            <i className="fa-solid fa-floppy-disk"></i>
            Enregistrer l'article
          </>
        )}
      </button>
    </div>
  );
}

export default ArticleEditor;
