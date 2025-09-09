import FeaturedCard from "./widgets/item-card";

function FeaturedProducts() {
    return (
        <div className="p-6 sm:p-8 md:p-12">
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 text-center">
                Recommendation pour vous !
            </h1>

            <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10 overflow-x-auto">
                {/*
                <FeaturedCard price={1500} title="Nike T-shirl"/>
                <FeaturedCard price={2000} title="Oversize shirt"/>
                <FeaturedCard price={2500} title="Sweet"/>
                */}
            </div>
        </div>
    );
}

export default FeaturedProducts;
