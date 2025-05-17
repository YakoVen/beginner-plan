"use client"
interface available{
    active:boolean,
    onClick:(e:any)=>void
}
function AvailableButton({active,onClick}:available) {
    return (
        <button onClick={onClick} className={"px-3  disabled:bg-slate-500 disabled:opacity-90  py-2  border rounded-xl text-md   text-red-50 font-extrabold " + (active?"bg-green-500":"bg-red-500")}>
         {active?"Disponible":"Indisponible"} 
      </button>
    );
}

export default AvailableButton;