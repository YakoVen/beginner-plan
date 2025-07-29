"use client"
import { supabase } from "@/service/suberbase/superbase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    const [logged, setLogged] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const pathname = usePathname();

    useEffect(() => {


        const em = localStorage.getItem("e");
        const pass = localStorage.getItem("t");
        if (em != null && pass != null)
            supabase.auth.signInWithPassword({ email: em, password: pass }).then((e) => setLogged(e.data.session != null))
    }, [])



    return (

        <section className="">
            {!logged && <div className="h-screen flex flex-col gap-3 justify-center items-center">

                <div className="flex flex-col gap-2 py-12 px-5 border shadow" >
                    <div className=" flex justify-between items-center gap-3 ">
                        <span className="text-lg">Email:</span>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="p-3 rounded-lg border active:border-gray-500" />
                    </div>

                    <div className=" flex justify-between items-center gap-3">
                        <span className="text-lg" >Password:</span>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="p-3 rounded-lg border active:border-gray-500" />
                    </div>

                    <button onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                        const but = e.target as HTMLButtonElement;
                        but.disabled = true;
                        const { data } = await supabase.auth.signInWithPassword({ email: email, password: password });
                        const l = data.session != null;
                        if (!l)
                            alert("vos infos ne sont pas justes")
                        else {
                            localStorage.setItem("e", email);
                            localStorage.setItem("t", password);
                        }
                        setLogged(l);

                        but.disabled = false;

                    }} className="p-3 border border-black   hover:bg-black hover:text-white disabled:opacity-45"> Login </button>
                </div>
            </div>}
            {logged && <div className="pt-20">
                <div className="text-xl flex gap-3  pt-4">

                    <Link href={"/dashboard/"} className={(pathname == "/dashboard" ? "bg-blue-500" : "bg-blue-200") + " text-center w-1/2 px-6 py-3  rounded-lg hover:bg-blue-700 text-white "}>Commandes</Link>
                    <Link href={"/dashboard/articles"} className={(pathname == "/dashboard/articles" ? "bg-blue-500" : "bg-blue-200") + " px-6 py-3  text-center border-s w-1/2 rounded-lg hover:bg-blue-700 text-white"}>Articles</Link>
                </div>
                {children}</div>}

        </section>
    );
}