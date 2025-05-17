"use client"
import { Slider } from 'primereact/slider';

import { Checkbox } from 'primereact/checkbox';
import { useEffect, useState } from 'react';
import { categories } from '@/service/constants';




interface filtering {
    value: { price: [number, number], categories: number[] }
    max :number,
    onSelected: (filter:any) => void,
    onPrice: (filter:any) => void,

}


function FilterBar({ value, max, onPrice, onSelected }: filtering) {
    const [open, setOpen] = useState(false)

    const [inits, setInit] = useState(false)




    useEffect(() => {
        if (!inits) {
            setOpen(window.innerWidth > 640);
            setInit(true)
        }
    }, [])
    return (
        <div className='h-screen'>
            {!open&& <button className='fixed  rounded-full h-14 w-14  border  border-black bg-black text-white font-bold shadow shadow-lg hover:scale-110 bottom-0 left-0 z-40 m-4 max-sm:top-1/2 max-sm:m-0 max-sm:rotate-90 max-sm:-translate-x-1/2 max-sm:pb-5' onClick={()=>{setOpen(true)}} > filter</button>}
        <div className={"   pt-20 p-3 flex flex-col  bg-white z-20  max-w-[99vw] h-full max-md:fixed max-md:top-0   max-md:h-screen    transition-all duration-700 overflow-hidden " + (open ? " max-md:w-screen md:min-w-64 md:w-80" : " w-0  px-0 ")} >
            <div className='text-4xl font-extrabold max-md:pt-20'>Filter</div>

            <div className='flex-grow flex flex-col justify-center'>
                <div >
                    <div>Categories</div>
                    {categories.map((e, i) =>
                        <div key={i} className='px-6 py-1'>
                            <div>
                                <Checkbox className='shadow' onClick={() => {
                                    if (value.categories.includes(i))
                                        onSelected(value.categories.filter((sel) => i != sel))
                                    else
                                        onSelected((prv:any) => [...prv, i])

                                }} checked={value.categories.includes(i)}></Checkbox>
                                <span className='px-3 opacity-65'>{e.name}</span>
                            </div>
                        </div>)}
                </div>

                <div>
                    <div className='py-6'>  prix</div>
                    <Slider value={value.price} min={0} max={max +max/10} onChange={(e) => { onPrice(e.value) }} range />
                    <div className='flex justify-between text-xs opacity-50 py-3'>
                    <div>{value.price[0]}</div>
                    <div>{value.price[1]}</div>
                    </div>
                </div>

            </div>

            <div>
                <button onClick={() => setOpen(false)} className='border border-orange-600 rounded-xl p-6 w-full  text-orange-600'>Fermer</button>
            </div>


        </div>
        </div>
    );
}

export default FilterBar;