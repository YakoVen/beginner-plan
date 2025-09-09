"use client";
import { article } from "@/interfaces/article";
import { categories } from "@/service/constants";
import {
  saveArticle,
} from "@/service/suberbase/databasehandle";
import { supabase } from "@/service/suberbase/superbase";
import { urlToFile } from "@/service/Utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useState } from "react";



function ArticleEditor({ article }: { article: article | null }) {



  const [title, setTitle] = useState(article != null ? article.title : "");
  const [description, setDescription] = useState(article != null ? article.disc : "");
  const [categorie, setCategorie] = useState(article != null ? article.category : -1);
  const [price, setPrice] = useState(article != null ? article.price : 0);

  const [thumbnail, setThumbnail] = useState(article != null ? article.thumbnail : "");
  const [screenshots, setSceenshots] = useState(article?.screenshots != null ? article.screenshots : []);

  const [newscreenshots, setNewsceenshots] = useState<string[]>([]);


  const [saving, setSaving] = useState(false);
  const [uploaded, setUploaded] = useState(0);


  const nav = useRouter();


  const DeleteScreenShot = async (i: number) => {

    await supabase.storage.from("articles").remove([article + "/screenshots/" + i]);
    setSceenshots(screenshots.filter((elm, index) => i != index));

  }

  const save = async () => {
    const id =
      "art-" + Date.now().toString() + (Math.random() * 999).toFixed(0);

    let thumb_url = "";
    const sc_url = [];
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
        console.log("UPLOADING THUMBNAILE ");
        const thumbnail_file = await urlToFile(thumbnail, "file")
        const thumb_upload = await supabase.storage
          .from("articles")
          .upload(id + "/thumbnail", thumbnail_file, { upsert: true });
        if (thumb_upload.data)
          thumb_url = supabase.storage
            .from("articles")
            .getPublicUrl(thumb_upload.data.path).data.publicUrl;
        if (thumb_upload.error) console.log(thumb_upload.error);

        console.log("UPLOADING THUMBNAILE DONE ");



        // upload screenshots
        console.log("UPLOADING SCREENSHOTS ");
        const merged = screenshots.concat(newscreenshots)
        for (let i = 0; i < merged.length; i++) {

          const sc = merged[i];
          const file = await urlToFile(sc, i + "");

          const sc_upload = await supabase.storage
            .from("articles")
            .upload(id + "/screenshots/" + i, file, { upsert: true })

          setUploaded(uploaded + 1);

          if (sc_upload.data)
            sc_url.push(
              supabase.storage
                .from("articles")
                .getPublicUrl(sc_upload.data.path).data.publicUrl
            );
          if (sc_upload.error) console.log(sc_upload.error);

        }
        console.log("UPLOADING SCREENSHOTS DONE ");


        if (thumb_url.length > 0) {
          //create data
          const article_data: article = {
            id: article ? article.id : id,
            title: title,
            disc: description,
            price: price,
            category: categorie,
            thumbnail: thumb_url,
            screenshots: sc_url,
            active: true,
          };
          console.log("saving data");

          await saveArticle(article_data);
          setSaving(false);
          nav.replace("/dashboard/articles")
        } else {
          alert("Uploading error: Vérifiez votre connexion. ");
          setSaving(false);
        }
      } else {
        alert(" Completez les informations  ");
        setSaving(false);
      }
    } catch (e) {
      console.log(e);

      alert(" Erreur ... vérifiez votre connexion.  ");
      setSaving(false);
    }
  };


  return (
    <div className=" max-w-lg mx-auto p-6 flex flex-col gap-2 border">
      {article != null &&
        <div>
          <div className="text-xl ">Modifier ce article</div>
          <div className="text-xs opacity-65">{article.id}</div>
        </div>}

      <div>
        <div className="max-w-[98vw] h-52 bg-slate-300 rounded-2xl relative rounded-b-none">
          {thumbnail.length > 0 && (
            <Image
              src={thumbnail}
              alt=""
              fill
              className="object-cover"
            />
          )}
        </div>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) setThumbnail(URL.createObjectURL(e.target.files[0]));
          }}
          className="p-3 border w-full rounded-t-none   rounded-xl bg-slate-300 text-center  text-zinc-50 font-extrabold"
          style={{ textShadow: "0px 0px 5px black" }}
        />
      </div>
      <InputText
        className="shadow border w-full p-3 border-gray-300"
        value={title}
        placeholder="titre"
        onChange={(e) => setTitle(e.target.value)}
      />
      <InputTextarea
        className="shadow border w-full p-3 border-gray-300"
        value={description}
        placeholder="discription"
        onChange={(e) => setDescription(e.target.value)}
      />
      <Dropdown
        placeholder="etat"
        className="shadow border w-full border-gray-300 px-3 "
        value={categorie == -1 ? 0 : categories[categorie].name}
        onChange={(e) => setCategorie(categories.indexOf(categories.filter((c) => c.name == e.value)[0]))}
        options={categories.map((e) => e.name)}
        optionLabel="state"
      />

      <div className="p-3 border border-gray-400 w-full  flex flex-wrap gap-3 justify-center">
        {screenshots.length + newscreenshots.length == 0 && <div>pas de photos</div>}

        {screenshots.map((e, i) => {
          if (e.length > 0)
            return (
              <div
                key={i}
                className="h-20 w-20 relative rounded-xl overflow-hidden"
              >
                {" "}
                <button
                  onClick={() => {
                    DeleteScreenShot(i);
                  }}
                  className="absolute top-0 right-0 rounded-full text-white h-6 w-6  hover:bg-red-500 bg-red-400 z-10"
                >
                  x
                </button>

                <Image alt="" src={e} fill />{" "}
              </div>
            )
          else return ""
        })}

        {newscreenshots.map((e, i) => {
          if (e.length > 0)
            return (
              <div
                key={i}
                className="h-20 w-20 relative rounded-xl overflow-hidden"
              >
                {" "}
                <button
                  onClick={() => {
                    setNewsceenshots(newscreenshots.filter((elm, index) => i != index));
                  }}
                  className="absolute top-0 right-0 rounded-full text-white h-6 w-6  hover:bg-red-500 bg-red-400 z-10"
                >
                  x
                </button>

                <Image alt="" src={e} fill />{" "}
              </div>
            )
          else return ""
        })}
      </div>
      <input
        type="file"
        multiple

        className="p-3 border border-green-400 rounded-xl bg-green-400 text-center text-zinc-50 font-extrabold"
        onChange={(e) => {
          if (e.target.files) {
            const add: string[] = [];
            for (let i = 0; i < e.target.files.length; i++) {
              const element = e.target.files[i];
              add.push(URL.createObjectURL(element))

            }
            setNewsceenshots((prevItems) => [...prevItems, ...add]);
          }
        }}
      />
      <InputText
        className="shadow border w-full p-3 border-gray-300"
        value={price + ""}
        placeholder="price"
        keyfilter={"int"}
        onChange={(e) => setPrice(parseInt(e.target.value))}
      />
      <button
        onClick={save}
        className="w-full p-3 bg-slate-500 rounded-xl text-zinc-300 font-extrabold disabled:opacity-10"
        disabled={saving}
      >
        Save
      </button>
    </div>
  );
}

export default ArticleEditor;
