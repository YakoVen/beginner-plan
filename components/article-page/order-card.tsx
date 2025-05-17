"use client"

import { article } from '@/interfaces/article';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from "react";
import wilaya_data from "@/assets/json/wilaya.json"
import commune_data from "@/assets/json/commune.json"
import { order } from '@/interfaces/order';
import { saveOrder } from '@/service/suberbase/databasehandle';
function OrderCard({ article }: { article: article }) {
    const [name, setName] = useState("");
    const [secname, setSecName] = useState("");
    const [wilaya, setWilaya] = useState<any>(null);
    const [commune, setCommune] = useState<any>(null);
    const [phone, setPhone] = useState("");

    const [amount, setAmount] = useState(1);

    const [saving, setSaving] = useState(false);

    const [incomplete,setIncomplete]=useState(true);
    const [message , setMessage] = useState("")
        

    useEffect(()=>{
     const f =   name.length==0 || secname.length==0 || wilaya==null || commune==null || phone.length==0 || amount==0   ;
     setIncomplete(f);
    },[name,secname,wilaya,commune,phone,amount ])
    const PlaceOrder = async () => {
        if( name.length==0 || secname.length==0 || wilaya==null || commune==null || phone.length==0 || amount==0   )return;
        setSaving(true);
        if(wilaya && commune){
        const order: order = {
            id: "order-" + Date.now() + (Math.random() * 999999999).toFixed(0),
            date:new Date(),
            adress: wilaya.name + "," + commune.name,
            command: { article_id: article.id, title: article.title, price: article.price,thumb: article.thumbnail } ,
            name: name+" "+secname,
            phone:phone,
            quantity:amount,
            state:0
        }
        await saveOrder(order);
        setMessage("Votre command est envoyer , Notre equipe vous contactera le plus tot possible pour confirmer votre command");
        setSaving(false);
    }
    }
    return (
        <div className="flex-grow p-6 border flex  flex-col border-gray-400  overflow-auto">
            <div className="text-4xl py-6">Prix:{" " + article.price + " dzd"}</div>
            <div className="p-6 border">
                <div>Nom </div>
                <InputText className="p-3 w-full border" required value={name} onChange={(e) => setName(e.target.value)} />
                <div>Prenom </div>
                <InputText className="p-3 w-full border  " required value={secname} onChange={(e) => setSecName(e.target.value)} />
                <div>Telephone</div>
                <InputText className="p-3 w-full border" required keyfilter={"int"} value={phone + ""} onChange={(e) => setPhone(e.target.value)} />
                <div>Wilaya</div>
                <Dropdown value={wilaya} required onChange={(e) => {
                    ; setWilaya(e.value)
                }} options={wilaya_data} optionLabel="name"
                    editable placeholder="Wilaya" className="p-3 w-full border" />
                <div>Commune</div>
                <Dropdown value={commune} required onChange={(e) => setCommune(e.value)} options={commune_data.filter((e) => wilaya!=null&& e.wilaya_id == wilaya.id)} optionLabel="name"
                    editable placeholder="Commune" className="p-3 w-full border" />
                <div>Nombre de piece</div>
                <InputText className="p-3 w-full border" value={amount + ""} keyfilter={"int"} onChange={(e) => setAmount(Number.parseInt(e.target.value))} />

            </div>
            <div className="text-end p-3">
                prix total : <span className='font-bold'>{" " + article.price + " dzd"} </span> +frais de livraison
            </div>
            <div>
                <button disabled={saving||incomplete} onClick={PlaceOrder} className="disabled:opacity-20 p-3 w-full border rounded-xl border-black text-xl disabled:hover:bg-white disabled:hover:text-black hover:bg-black hover:text-white"> Commendez! </button>
            </div>

{message.length>0 &&
<div className='fixed h-screen w-screen top-0 left-0 bg-slate-100 bg-opacity-20 flex justify-center items-center'>
                <div className='p-12 shadow  shadow-2xl rounded-xl w-96 bg-white text-lg text-center'>
                    <div className='text-cente  text-4xl'>Merci !</div>
                    {message}
                    <br/>
                    <button onClick={()=>{
                        setMessage("");
                        setName("");
                        setSecName("");
                        setPhone("");
                        setAmount(1);
                        setCommune(null);
                        setWilaya(null);
                        
                    }
                    } className='border border-black hover:bg-black hover:bg-white p-2 rounded-lg m-3 w-full'>ok</button>
                </div>
            </div>}
            
        </div>
    );
}

export default OrderCard;