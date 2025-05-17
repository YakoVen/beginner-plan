"use client"


interface filterbutton {
    name:string,
    active:boolean,
    onClick:()=>void,
}

function FilterButton({name,active , onClick}:filterbutton) {
    return (
        <button onClick={onClick} className={"border border-black  max-md:text-sm md:text-lg max-md:rounded-lg md:rounded-xl md:px-12 md:py-2 max-md:px-6 max-md:py-1  "+(active?" text-white bg-gray-900 ":" shadow-md ")}  >
            {name}
        </button>
    );
}

export default FilterButton;