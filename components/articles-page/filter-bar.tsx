"use client"
import { Slider } from "primereact/slider";
import { Checkbox } from "primereact/checkbox";
import { useEffect, useState } from "react";
import { categories } from "@/service/constants";

interface FilteringProps {
  value: { price: [number, number]; categories: number[] };
  max: number;
  onSelected: (filter: any) => void;
  onPrice: (filter: any) => void;
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
          className="fixed md:hidden rounded-full h-14 w-14 border border-black 
                     bg-black text-white font-bold shadow-lg hover:scale-110 
                     bottom-4 left-4 z-40"
          onClick={() => setOpen(true)}
        >
          Filter
        </button>
      )}

      {/* Sidebar / Drawer */}
      <div
        className={`fixed md:static top-0 left-0 h-screen md:h-full bg-white z-30 
                    transform transition-transform duration-500 ease-in-out 
                    w-72 md:w-80 shadow-lg md:shadow-none 
                    ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="pt-20 p-4 flex flex-col h-full">
          <div className="text-2xl font-extrabold mb-6">Filtres</div>

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
                    else onSelected((prv: any) => [...prv, i]);
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
                onPrice(e.value);
              }}
              range
            />
            <div className="flex justify-between text-xs opacity-60 mt-2">
              <div>{value.price[0]} dzd</div>
              <div>{value.price[1]} dzd</div>
            </div>
          </div>

          {/* Close button (mobile only) */}
          <div className="mt-auto md:hidden">
            <button
              onClick={() => setOpen(false)}
              className="border border-orange-600 rounded-lg p-3 w-full text-orange-600 hover:bg-orange-50 transition"
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
