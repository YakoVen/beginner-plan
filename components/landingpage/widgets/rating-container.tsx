// RatingContainer.tsx
function RatingContainer({ testimonial }: { testimonial: any }) {
    return (
        <div className="w-72 sm:w-80 h-auto min-h-[160px] p-6 rounded-2xl bg-white border border-gray-100 shadow-sm flex-shrink-0 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.location}</div>
                    </div>
                    <div className="text-yellow-400 text-lg">
                        {"★".repeat(testimonial.rating)}{"☆".repeat(5 - testimonial.rating)}
                    </div>
                </div>
                <p className="text-gray-700 text-sm md:text-base italic">"{testimonial.text}"</p>
            </div>
        </div>
    );
}

export default RatingContainer;
