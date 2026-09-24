import RatingContainer from "./widgets/rating-container";

function RatingPreview() {
    const testimonials = [
        { name: "Amine M.", rating: 5, text: "Excellent service, livraison très rapide et produit conforme à la description.", location: "Alger" },
        { name: "Sarah B.", rating: 4, text: "Très satisfaite de mon achat. La qualité est au rendez-vous. Je recommande !", location: "Oran" },
        { name: "Karim T.", rating: 5, text: "Rien à dire, tout est parfait. Le service client est très réactif.", location: "Constantine" },
        { name: "Leila R.", rating: 5, text: "Des articles magnifiques et des prix très raisonnables. Je suis cliente fidèle.", location: "Annaba" }
    ];

    return (
        <div className="w-full px-4 sm:px-6 lg:px-12 pt-6 pb-12 bg-gray-50">
            {/* Title */}
            <div className="text-center md:text-left mb-8">
                <div className="text-3xl md:text-4xl py-3 font-extrabold">
                    Ce que disent nos clients
                </div>
                <div className="text-gray-500 text-lg">
                    Ils nous ont fait confiance
                </div>
            </div>

            {/* Horizontal scroll container */}
            <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4">
                {testimonials.map((t, index) => (
                    <div key={`rating-${index}`} className="snap-start flex-shrink-0">
                        <RatingContainer testimonial={t} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RatingPreview;
