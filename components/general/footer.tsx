import { contact_info } from "@/service/constants";

function Footer() {
    return (
        <div className="bg-black text-white text-sm md:px-6 py-8" id="contact">
            <div className="flex justify-around opacity-60 flex-wrap">
                <div className="text-white">
                    <div className="font-extrabold">Nos Contacts</div>

                    <div className="px-3">
                        <div>N° Telephone  1: {contact_info.phone1}</div>
                        <div>N° Telephone  2: {contact_info.phone2}</div>
                        <div>E-mail : {contact_info.email} </div>
                    </div>



                </div>
                <div className="text-white">
                    <div className="font-extrabold">Suivez nous aux reseaux sociaux</div>

                    <div className="px-3">
                        {
                            contact_info.socials.filter((e,i)=>i<4).map((e,i) => <div style={{textTransform:"capitalize"}} key={i}>{e.platform} : <a href={e.link}>{e.name}</a> </div>)
                        }

                    </div>



                </div>
            </div>
        </div>
    );
}

export default Footer;