import { contact_info } from "@/service/constants";

function Footer() {
    return (
        <div className="bg-black text-white text-sm px-4 sm:px-6 py-8" id="contact">
            <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0 opacity-70 flex-wrap">
                
                {/* Contacts */}
                <div className="w-full md:w-1/2 lg:w-1/3">
                    <div className="font-extrabold mb-2">Nos Contacts</div>
                    <div className="px-2 space-y-1">
                        <div>N° Téléphone 1: {contact_info.phone1}</div>
                        <div>N° Téléphone 2: {contact_info.phone2}</div>
                        <div>E-mail : {contact_info.email}</div>
                    </div>
                </div>

                {/* Socials */}
                <div className="w-full md:w-1/2 lg:w-1/3">
                    <div className="font-extrabold mb-2">Suivez-nous sur les réseaux sociaux</div>
                    <div className="px-2 space-y-1">
                        {contact_info.socials
                            .filter((_, i) => i < 4)
                            .map((e, i) => (
                                <div
                                    className="capitalize"
                                    key={i}
                                >
                                    {e.platform} :{" "}
                                    <a
                                        href={e.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline"
                                    >
                                        {e.name}
                                    </a>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
