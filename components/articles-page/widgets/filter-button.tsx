"use client";

interface FilterButtonProps {
  name: string;
  active: boolean;
  onClick: () => void;
}

function FilterButton({ name, active, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border font-medium transition-all duration-200 text-sm rounded-full px-5 py-2
        ${active ? "border-blue-600 bg-blue-600 text-white shadow-md" : "border-gray-300 bg-white shadow-sm hover:bg-gray-50"}
      `}
    >
      {name}
    </button>
  );
}

export default FilterButton;
