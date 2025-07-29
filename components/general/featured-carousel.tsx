"use client"
import { article } from "@/interfaces/article";
import { getArticles } from "@/service/suberbase/databasehandle";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


function FeaturedCarousel() {
const nav = useRouter();
    const [articles, setArticles] = useState<article[]>([]);

    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);



    useEffect(()=>{ getArticles().then(res => { setArticles(res)}
        );} ,[])

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setIndex((prevIndex) => {
                    if (prevIndex == articles.length - 1) return 0;
                    else return prevIndex + 1;
                }
                );
                setFade(true);
            }, 700); // match fade-out duration
        }, 10000); // 10 seconds

        return () => clearInterval(interval); // Cleanup
    }, [articles , index])

    return (
        <div className="flex flex-col h-[600px] w-96 rounded-2xl overflow-hidden" >
            <div className={`bg-slate-300 flex-grow  transition-all duration-700 relative ${fade ? "opacity-100" : "opacity-0"
                }`}>
                {articles.length > 0 && <Image src={articles[index].thumbnail} alt="" fill />
                }
            </div>
            <div className="h-40 bg-gray-700 flex flex-col justify-center p-6 gap-2">

                <div className="text-white flex justify-between items-center">
                    <div className="text-xl font-extrabold">{articles.length > 0 ? articles[index].title.slice(0, 40) : "LOADING ....  "}</div>
                    <div className="min-w-fit">
                        <div className="font-bold">Price:</div>
                        <div>{articles.length > 0 ? articles[index].price : "0000.00"} dzd</div>
                    </div>
                </div>
                <div className="text-white font-extrabolder flex gap-3 justify-around">
                    <button className="bg-gray-800  rounded-lg w-44 py-3 text-center" onClick={()=>{setIndex( (index<articles.length-1) ?index+1 :0)}}>next </button>
                    <button className="bg-gray-800  rounded-lg w-44 py-3 text-center" onClick={()=>{nav.replace("/articles/" + articles[index].id)}}>View item</button>

                </div>
            </div>
        </div>
    );
}

export default FeaturedCarousel;