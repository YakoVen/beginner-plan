"use client"

import { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Nullable } from 'primereact/ts-helpers';
import { getOrders, saveOrder } from '@/service/suberbase/databasehandle';
import { order } from '@/interfaces/order';

import CommandPreview from './command-preview';
import Image from 'next/image';
import CommandAmplifyed from './command-amplify';


function OrderTable() {
    const [orders, setOrders] = useState<order[]>([])
    const [command, setCommand] = useState("")

    const [amplify, setAmplify] = useState<order | null>(null)
    const [changed, setChanged] = useState(false);



    const [filtred, setFiltred] = useState<order[]>([]);
    const states = ["⚠️ en attend", "✅ Confirmée", "📤 envoyee", "❌ retour"];

    const [dateFilter, setDateFilter] = useState<Nullable<Date>>(null)
    const [nameFilter, setNameFilter] = useState("")
    const [stateFilter, setStateFilter] = useState(-1)


    useEffect(
        () => {

            if (orders.length == 0)
                getOrders().then((e) => {
                    setOrders(e);
                }
                );
            let f = orders;
            if (nameFilter.length > 0)
                f = f.filter((e: order) => e.name.includes(nameFilter));
            if (dateFilter != null)

                f = f.filter((e: order) => {
                    return new Date(e.date).toDateString() == dateFilter.toDateString()
                }
                );
            if (stateFilter >= 0)
                f = f.filter((e) => e.state == stateFilter);

            f.map(e => console.log(e.date));

            f.sort((a, b) => Date.parse(b.date.toString()) - Date.parse(a.date.toString()));

            setFiltred(f);
            setChanged(false);

        }, [orders, dateFilter, nameFilter, stateFilter]
    )

    return (
        <div className='py-6 px-3'>
            <div className='text-3xl'>Les Commandes</div>
            <div className='p-3 max-sm:fixed max-sm:bottom-0 max-sm:pb-20 bg-white w-full left-0 max-sm:border ' >
                <div>Filters </div>
                <div className=' flex gap-3  justify-center flex-wrap'>
                    <InputText className="shadow border border-gray-500 px-3" value={nameFilter} placeholder='name' onChange={(e) => setNameFilter(e.target.value)} />
                    <Calendar value={dateFilter} className='shadow px-3 border border-gray-500' placeholder='Filtre de date' onChange={(e) => { setDateFilter(e.value) }} />
                    <Dropdown placeholder='etat' className='shadow border border-gray-500 px-3 ' value={states[stateFilter]} onChange={(e) => setStateFilter(states.indexOf(e.value))} options={["", ...states]} optionLabel="state" />
                </div>
            </div>


            {
                <div >

                    {filtred.map((e, i) => (
                        <div key={i} className='overflow-auto w-screen px-2'>
                            <div className='flex p-3 border text-center items-center gap-3 justify-between w-fit min-w-full'>
                                <div className='w-[50px] text-xs overflow-x-auto'>{e.id} </div>
                                <div className='min-w-[100px]   overflow-x-auto '> {e.name} </div>
                                <div className=' overflow-x-auto '> {e.phone} </div>
                                <div className=' overflow-x-auto'> <div className='flex gap-2 items-center '>
                                    <div className='h-12  rounded-xl overflow-hidden  w-16 relative'>
                                        <Image alt='' fill src={e.command.thumb} className='object-cover' />
                                    </div>
                                    <div className='w-36 overflow-hidden'>
                                        {e.command.title.slice(0, 15) + " × "} <span className='font-extrabold text-lg text-green-600'>{e.quantity}</span>
                                    </div>
                                    <button onClick={() => setCommand(e.command.article_id)} className='p-3 rounded-lg border border-black hover:bg-black hover:text-white'>voire </button></div>
                                </div>



                                <div className=' min-w-[100px] md:w-60 overflow-x-auto'> {e.adress} </div>
                                <div className=' overflow-x-auto'>
                                    <Dropdown value={states[e.state]} onChange={async (selected) => {
                                        const n = e;
                                        n.state = states.indexOf(selected.value);
                                        await saveOrder(n)
                                        setChanged(true)
                                        getOrders().then((e) => {
                                            setOrders(e);
                                        });

                                    }} options={states} optionLabel="state" />
                                </div>

                                <div><button onClick={() => setAmplify(e)} className='bg-yellow-400 p-3  rounded-xl'> Amplifier </button> </div>
                            </div>
                        </div>)
                    )
                    }
                </div>
            }

            {
  /*          <DataTable value={filtred}  tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="Id" bodyClassName='max-w-20 overflow-auto' sortable></Column>
                <Column field="name" header="Nom"></Column>
                <Column field="phone" header="Telephone"></Column>
                <Column field="command" header="Command" body={(e) => {
                    return <div className='flex gap-2 items-center '>
                        <div className='h-12  rounded-xl overflow-hidden  w-16 relative'>
                            <Image alt='' fill src={e.command.thumb} className='object-cover' />
                        </div>
                        <div className='w-36 overflow-hidden'>
                            {e.command.title.split(0, 15)}
                        </div>
                        <button onClick={() => setCommand(e.command.article_id)} className='p-3 rounded-lg border border-black hover:bg-black hover:text-white'>voire </button></div>

                }}></Column>
                <Column field="quantity" header="Quantite"></Column>
                <Column field="adress" header="Adress" ></Column>
                <Column header="Etat" body={(p) => {
                    return <Dropdown value={states[p.state]} onChange={async (e) => {
                        const n = p;
                        n.state = states.indexOf(e.value);
                        await saveOrder(n)
                      setChanged(true)

                    }} options={states} optionLabel="state" />
                }}></Column>

                <Column header="" body={(e) => { return <button onClick={()=>setAmplify(e)} className='bg-yellow-400 p-3  rounded-xl'> Amplifier </button> }}></Column>


            </DataTable>
            
*/}
            {command.length > 0 && <CommandPreview article_id={command}
                close={() => setCommand("")} />
            }
            {amplify && <CommandAmplifyed order={amplify} article_id={amplify.command.article_id}
                close={() => setAmplify(null)} />
            }
        </div>
    );
}

export default OrderTable;