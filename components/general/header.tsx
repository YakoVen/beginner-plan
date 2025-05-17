"use client"
import { store_name } from "@/service/constants";
import Link from "next/link";
import { useState } from "react";

function Header() {
    const [open,setOpen] = useState(false);
    const [search,setSearch] = useState("");
    const links = [{ name: "Shop", link: "/articles" }, { name: "Contact", link: "/#contact" }, { name: "About", link: "/#about" }]
    return (
        <div>
            <div className="flex items-center max-md:px-6  md:px-12 h-20 shadow w-screen fixed top-0 z-50 bg-white ">
               <Link href={"/"}>
                <div className="flex items-center ">
               
                    <img width="35" height="35" src="https://img.icons8.com/ios-filled/50/1A1A1A/online-store.png" alt="online-store" />
                    <div className="text-2xl px-1 max-md:hidden">{store_name}</div>

                </div>
                </Link>

                <div className="max-md:hidden    flex-grow flex justify-center items-center gap-4">
                    <Link href={links[0].link}>{links[0].name}</Link>
                    <Link href={links[1].link}>{links[1].name}</Link>
                    <Link href={links[2].link}>{links[2].name}</Link>
                </div>
                <div className="flex gap-3  max-md:hidden">
                    <input value={search} onChange={(e)=>setSearch(e.target.value)} className="border  py-1  px-4 rounded-lg" placeholder="search" />
                    <Link href={"/articles?search="+search}> <img width="30" height="30" src="https://img.icons8.com/sf-regular-filled/48/1A1A1A/shopping-cart-loaded.png" alt="shopping-cart-loaded" /></Link>
                </div>



                <div className="flex-grow md:hidden"></div>

                <div className="md:hidden">
                    <button className="shadow h-11 min-w-11 rounded-xl text-2xl  active::bg-gray-600" onClick={()=>{setOpen(!open)}}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
                </div>

            </div>


            <div  className={"md:hidden z-40 items-center flex flex-col pt-20 px-6 w-full shadow bg-white left-0 top-0  fixed  gap-1 overflow-hidden transition-all duration-700 " + (open?"h-screen ":"   h-0") }>
              <div className="p-3"></div>
                <Link className="text-lg " href={links[0].link} onClick={()=>setOpen(false)}>{links[0].name}</Link>
                <Link href={links[1].link} className="text-lg " onClick={()=>setOpen(false)}>{links[1].name}</Link>
                <Link href={links[2].link} className="text-lg " onClick={()=>setOpen(false)}>{links[2].name}</Link>
            </div>
        </div>
    );
}

export default Header;