import Link from "next/link";

function WelcomSection() {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-12 pt-8 pb-4 bg-white mt-12 md:mt-16">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-[2rem] w-full overflow-hidden flex flex-col md:flex-row relative items-center border border-green-200">
                
                {/* Text Content */}
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 z-10 flex flex-col justify-center items-start">
                    <div className="bg-green-200 text-green-900 text-xs font-bold px-3 py-1 rounded-full mb-6 tracking-wide shadow-sm">
                        Bienvenue
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                        Trouvez tout<br />ce qu'il vous faut
                    </h1>
                    <p className="text-gray-600 text-lg mb-8 max-w-md">
                        Découvrez notre sélection de produits de qualité, aux meilleurs prix.
                    </p>
                    <Link href="/articles" className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all flex items-center gap-2">
                        Explorer la boutique <i className="fa-solid fa-arrow-right"></i>
                    </Link>

                    {/* Features row */}
                    <div className="flex flex-wrap gap-6 mt-12 text-sm text-gray-700 font-medium">
                        <div className="flex items-center gap-2">
                            <i className="fa-solid fa-star text-green-700"></i> Qualité garantie
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="fa-solid fa-shield-halved text-green-700"></i> Paiement sécurisé
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="fa-solid fa-truck-fast text-green-700"></i> Livraison rapide
                        </div>
                    </div>
                </div>

                {/* Image & Decorative Elements */}
                <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center p-8">
                    {/* Floating label */}
                    <div className="absolute top-1/4 right-1/4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg z-20 text-sm font-medium text-gray-800 max-w-[150px] text-center transform rotate-3">
                        Les meilleures offres du moment
                    </div>
                    
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img 
                            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80" 
                            alt="Shopping Online" 
                            className="object-cover rounded-3xl w-full h-[80%] shadow-2xl mix-blend-multiply"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WelcomSection;