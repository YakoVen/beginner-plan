"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CarouselProps {
  images: string[];
}

function Carousel({ images }: CarouselProps) {
  const [image, setImage] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full">
      <div className="p-3 sm:p-5 border rounded-xl border-gray-300 w-full">
        {/* Main image */}
        <div className="rounded-xl overflow-hidden h-56 sm:h-72 md:h-96 w-full bg-slate-400 relative">
          {images.length > 0 ? (
            <Image
              src={images[image]}
              alt={`Image ${image + 1}`}
              fill
              className="object-cover transition-opacity duration-700"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white opacity-50">
              Pas d&apos;image
            </div>
          )}
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 p-2 sm:p-3 border border-gray-300 my-2 rounded-xl overflow-x-auto h-20 sm:h-24">
          {images.map((src, i) => (
            <Image
              key={i}
              onClick={() => setImage(i)}
              src={src}
              alt={`Thumbnail ${i + 1}`}
              height={64}
              width={64}
              className={`object-cover rounded-lg cursor-pointer transition-transform duration-300 ${
                i === image ? "ring-2 ring-black" : "hover:-translate-y-2"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
