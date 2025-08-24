"use client";

interface FilterButtonProps {
  name: string;
  active: boolean;
  onClick: () => void;
}

function FilterButton({ name, active, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`border border-black font-medium transition-all duration-200
        max-md:text-sm md:text-lg
        max-md:rounded-lg md:rounded-xl
        max-md:px-6 max-md:py-1 md:px-12 md:py-2
        ${active ? "text-white bg-gray-900" : "bg-white shadow-md hover:bg-gray-100"}
      `}
    >
      {name}
    </button>
  );
}

export default FilterButton;
