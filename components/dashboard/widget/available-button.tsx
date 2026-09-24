"use client"

interface AvailableProps {
    active: boolean;
    disabled?: boolean;
    onClick: () => void;
}

function AvailableButton({ active, disabled, onClick }: AvailableProps) {
    return (
        <button 
          type="button"
          disabled={disabled}
          onClick={onClick} 
          className={`px-3 disabled:bg-slate-500 disabled:opacity-90 py-2 border rounded-xl text-sm text-red-50 font-extrabold transition ${active ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
        >
         {active ? "Disponible" : "Indisponible"} 
      </button>
    );
}

export default AvailableButton;