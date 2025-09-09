import PublicStoreStates from "./widgets/store-pub-states";
import FeaturedCarousel from "../general/featured-carousel";
function StoreSection() {
    return (
      <div className="flex flex-col md:flex-row md:items-start gap-8 w-full mt-10">
        {/* العناصر الثلاثة */}
        <div className="hidden md:flex flex-col justify-center md:w-1/4 lg:w-1/5">
          <PublicStoreStates />
        </div>
  
        {/* الكارد */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          <FeaturedCarousel />
        </div>
      </div>
    );
  }
  export default StoreSection;