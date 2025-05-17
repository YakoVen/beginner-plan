"use client";
import Image from "next/image";

import { useEffect, useState } from "react";

interface carousel {
  images: string[];
}

function Carousel({ images }: carousel) {
  const [image, setImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (image + 1 == images.length) setImage(0);
      else setImage(image + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [image]);
  return (
    <div className="w-full">
      <div className="p-5 border rounded-xl border-gray-300 w-full">
        <div className="rounded-xl overflow-hidden   h-96 w-full bg-slate-400  relative">
          <Image src={images[image]} alt="" fill className="object-cover" />
        </div>
        <div className="flex gap-1 p-3 border border-gray-300 my-2 rounded-xl overflow-x-auto">
          {images.map((e, i) => {
            return (
              <Image
                key={i}
                onClick={() => setImage(i)}
                src={e}
                alt=""
                height={80}
                width={80}
                className="object-cover hover:-translate-y-2"
              />
            );
          })}
          {images.length==0 && <div className="text-center opacity-35"> pas d &apos image </div>}
        </div>
      </div>{" "}
    </div>
  );
}

export default Carousel;
