"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CarouselProps {
  images: string[];
}

function Carousel({ images }: CarouselProps) {
  const [image, setImage] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setImage((prev) => (prev + 1) % images.length);
      setImageLoading(true);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full">
      <div className="p-3 sm:p-5 border rounded-xl border-gray-300 w-full">
        {/* Main image */}
        <div className="rounded-xl overflow-hidden h-72 sm:h-96 md:h-[440px] w-full bg-slate-100 relative">
          {images.length > 0 ? (
            <>
              {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                      <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                  </div>
              )}
              <Image
                src={images[image]}
                alt={`Image ${image + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
                className="object-cover transition-opacity duration-700"
                onLoad={() => setImageLoading(false)}
              />
            </>
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
              onClick={() => {
                setImage(i);
                setImageLoading(true);
              }}
              src={src}
              alt={`Thumbnail ${i + 1}`}
              height={64}
              width={64}
              className={`object-cover rounded-lg cursor-pointer transition-transform duration-300 ${
                i === image ? "ring-2 ring-blue-600" : "hover:-translate-y-2"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
