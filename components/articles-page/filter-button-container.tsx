"use client";

import FilterButton from "./widgets/filter-button";
import { categories } from "@/service/constants";

interface Filtering {
  value: { price: number[]; categories: number[] };
  onChange: (filter: number[] | ((prev: number[]) => number[])) => void;
  search: string;
  clearSearch: () => void;
}

function FilterButtonContainer({
  value,
  search,
  onChange,
  clearSearch,
}: Filtering) {
  return (
    <div>
      {/* Categories buttons */}
      <div className="flex flex-wrap gap-2 md:gap-3 justify-center max-w-full overflow-x-auto">
        {categories.map((e, i) => (
          <div key={i} className="flex-shrink-0">
            <FilterButton
              active={value.categories.includes(i)}
              name={e.name}
              onClick={() => {
                if (value.categories.includes(i)) {
                  onChange(value.categories.filter((sel) => sel !== i));
                } else {
                  onChange((prev: number[]) => [...prev, i]);
                }
              }}
            />
          </div>
        ))}
      </div>

      {/* Search indicator */}
      {search.length > 0 && (
        <div className="mt-3 px-2 md:px-6 text-sm text-gray-700 flex items-center justify-center gap-2 flex-wrap">
          <span>
            Résultats pour : <span className="font-medium">{search}</span>
          </span>
          <button
            onClick={clearSearch}
            className="px-2 py-1 bg-gray-400 hover:bg-gray-600 rounded-full text-white text-xs transition"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default FilterButtonContainer;
