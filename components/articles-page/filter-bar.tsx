"use client"
import { Slider } from "primereact/slider";
import { Checkbox } from "primereact/checkbox";
import { useEffect, useState } from "react";
import { categories } from "@/service/constants";

interface FilteringProps {
  value: { price: [number, number]; categories: number[] };
  max: number;
  onSelected: (filter: number[] | ((prev: number[]) => number[])) => void;
  onPrice: (filter: [number, number]) => void;
}

function FilterBar({ value, max, onPrice, onSelected }: FilteringProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // On desktop, sidebar is open by default
    if (window.innerWidth >= 768) {
      setOpen(true);
    }
  }, []);

  return (
    <div className="h-full">
      {/* Floating button (mobile only) */}
      {!open && (
        <button
          className="fixed md:hidden rounded-full h-14 w-14 border border-blue-600
                     bg-blue-600 text-white font-bold shadow-lg hover:scale-110 
                     bottom-4 left-4 z-50"
          onClick={() => setOpen(true)}
        >
          <i className="fa-solid fa-filter"></i>
        </button>
      )}

      {/* Backdrop for mobile */}
      {open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar / Drawer */}
      <div
        className={`fixed md:static top-0 left-0 h-screen md:h-full bg-white z-[45] md:z-auto
                    transform transition-transform duration-500 ease-in-out 
                    w-72 md:w-full shadow-lg md:shadow-none flex flex-col
                    ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="pt-20 md:pt-4 p-4 flex flex-col h-full overflow-hidden">
          <div className="text-2xl font-extrabold mb-6 flex-shrink-0">Filtres</div>

          <div className="flex-grow overflow-y-auto pb-4">
            {/* Categories */}
            <div className="mb-6">
              <div className="font-semibold mb-2">Catégories</div>
              {categories.map((c, i) => (
                <div key={i} className="flex items-center gap-2 py-1">
                  <Checkbox
                    className="shadow"
                    onChange={() => {
                      if (value.categories.includes(i))
                        onSelected(value.categories.filter((sel) => sel !== i));
                      else onSelected((prv: number[]) => [...prv, i]);
                    }}
                    checked={value.categories.includes(i)}
                  />
                  <span className="opacity-70">{c.name}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="font-semibold mb-2">Prix</div>
              <Slider
                value={value.price}
                min={0}
                max={max + max / 10}
                onChange={(e) => {
                  onPrice(e.value as [number, number]);
                }}
                range
              />
              <div className="flex justify-between text-xs opacity-60 mt-2">
                <div>{value.price[0]} dzd</div>
                <div>{value.price[1]} dzd</div>
              </div>
            </div>
          </div>

          {/* Close button (mobile only) */}
          <div className="mt-auto pt-2 md:hidden flex-shrink-0 bg-white border-t border-gray-100">
            <button
              onClick={() => setOpen(false)}
              className="border border-blue-600 rounded-lg p-3 w-full text-blue-600 hover:bg-blue-50 transition"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
