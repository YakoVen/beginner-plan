function UsersReviews() {
    return (
        <div className="p-4 sm:p-8 lg:p-12 w-full">
            <div className="text-2xl sm:text-3xl font-bold mb-6">Avis de nos clients</div>

            {/* 
              - `overflow-x-auto`: Enables horizontal scrolling only when content overflows.
              - `gap-6`: Adds space between the review cards.
              - `snap-x snap-mandatory`: Creates a snapping effect for a smoother scroll experience.
              - `pb-4`: Adds some padding at the bottom to ensure the scrollbar doesn't hide content.
            */}
            <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-4">
                {/* 
                  - `flex-none`: Prevents the card from shrinking.
                  - `snap-center`: Aligns the card to the center when scrolling stops.
                  - Responsive widths: Adjusts the card size for different breakpoints.
                */}
                <div className="flex-none snap-center w-4/5 sm:w-[400px] lg:w-[500px] h-32 rounded-xl bg-zinc-200 p-4">
                    {/* You can add your review content here */}
                </div>
                <div className="flex-none snap-center w-4/5 sm:w-[400px] lg:w-[500px] h-32 rounded-xl bg-zinc-200 p-4">
                    {/* You can add your review content here */}
                </div>
                <div className="flex-none snap-center w-4/5 sm:w-[400px] lg:w-[500px] h-32 rounded-xl bg-zinc-200 p-4">
                    {/* You can add your review content here */}
                </div>
                <div className="flex-none snap-center w-4/5 sm:w-[400px] lg:w-[500px] h-32 rounded-xl bg-zinc-200 p-4">
                    {/* You can add your review content here */}
                </div>
            </div>
        </div>
    );
}

export default UsersReviews;