// RatingPreview.jsx
import RatingContainer from "./widgets/rating-container";

function RatingPreview() {
    // Create an array of 10 items to render dynamically
    const ratings = Array.from({ length: 10 });

    return (
        <div className="w-full px-4 sm:px-6 lg:px-12 pt-6 pb-12">
            {/* Title */}
            <div className="text-3xl md:text-4xl py-3 font-extrabold text-center md:text-left">
                Nos Clients
            </div>

            {/* Horizontal scroll container */}
            <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4">
                {ratings.map((_, index) => (
                    <div key={index} className="snap-start">
                        <RatingContainer />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RatingPreview;
