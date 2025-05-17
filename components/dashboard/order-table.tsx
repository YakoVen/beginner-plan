"use client"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
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

    const [amplify, setAmplify] = useState<order|null>(null)

    /*[
            { id: "3948294903",date:Date.now().toString(), name: "yacine yacine", phone: "0672811903", command: "349934", quantite: 4, adress: "Boumerdes,Boumerdes", state: 0 }
            , { id: "9875548975",date:Date.now().toString(), name: "rayan rayan", phone: "0549915903", command: "349934", quantite: 1, adress: "Alger,Bourdj Kifan", state: 2 }

        ]
*/
    const [filtred, setFiltred] = useState<order[]>([]);
    const states = ["⚠️ en attend", "✅ envoyee", "❌ retour",];

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
                f = f.filter((e:order) => e.name.includes(nameFilter));
            if (dateFilter != null)
                
                f = f.filter((e:order) =>{
                    return new Date(e.date).toDateString() == dateFilter.toDateString()
                }
            );
            if (stateFilter >=0)
                f = f.filter((e) => e.state == stateFilter);

            setFiltred(f);

        }, [orders, dateFilter, nameFilter, stateFilter]
    )

    return (
        <div className='py-6'>
            <div className='text-3xl'>Les Commandes</div>
            <div className='p-3 flex gap-3 justify-center'>
                <InputText className="shadow border border-gray-500 px-3" value={nameFilter} placeholder='name' onChange={(e) => setNameFilter(e.target.value)} />
                <Calendar value={dateFilter} className='shadow px-3 border border-gray-500' placeholder='Filtre de date' onChange={(e) => { setDateFilter(e.value) }} />
                <Dropdown placeholder='etat' className='shadow border border-gray-500 px-3 ' value={states[stateFilter]} onChange={(e) => setStateFilter(states.indexOf(e.value))} options={["", ...states]} optionLabel="state" />
            </div>

            <DataTable value={filtred} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="Id" bodyClassName='max-w-20 overflow-auto'></Column>
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
                        setOrders(orders.map((o) => {
                            if (o.id == p.id)
                                return n;
                            else
                                return o;
                        }))

                    }} options={states} optionLabel="state" />
                }}></Column>

                <Column header="" body={(e) => { return <button onClick={()=>setAmplify(e)} className='bg-yellow-400 p-3  rounded-xl'> Amplifier </button> }}></Column>


            </DataTable>

            {command.length > 0 && <CommandPreview  article_id={command}
                close={() => setCommand("")} />
            }
              {amplify  && <CommandAmplifyed order={amplify} article_id={amplify.command.article_id}
                close={() => setAmplify(null)} />
            }
        </div>
    );
}

export default OrderTable;