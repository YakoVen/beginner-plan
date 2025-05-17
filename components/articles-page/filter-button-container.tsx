"use client"

import FilterButton from "./widgets/filter-button";
import { categories } from "@/service/constants";
interface filtering {
    value: { price: number[], categories: number[] }
    onChange: (filter:any) => void,
    search: string, 
    clearSearch : ()=>void

}
function FilterButtonContainer({ value, search, onChange ,clearSearch }: filtering) {



    return (
        <div className="py-6 px-6  ">
            <div className="flex flex-wrap gap-3  justify-center max-w-full overflow-x-auto">
                {categories.map((e, i) => <FilterButton key={i} active={value.categories.includes(i)} name={e.name} onClick={() => {
                    if (value.categories.includes(i))
                        onChange(value.categories.filter((sel) => i != sel))
                    else
                        onChange((prv:any) => [...prv, i])
                }} />)}

            </div>

            {search.length > 0 && <div className=" px-6 text-xs text-gray-700">Recherch de : {search} <button onClick={clearSearch} className="p-1 bg-gray-300 rounded-full text-white ">X</button></div>}
        </div>
    );
}

export default FilterButtonContainer;