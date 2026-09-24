import Link from "next/link";
import FeaturedCarousel from "../general/featured-carousel";
import PublicStoreStates from "./widgets/store-pub-states";

function LandingSection() {
  return (
    <div className="flex flex-col lg:flex-row items-center min-h-screen justify-center px-6 py-12 lg:px-12 lg:justify-around">
      {/* Left Column */}
      <div className="flex-grow h-full flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
          Bienvenue dans notre Store en ligne
        </h1>

        <p className="text-lg lg:text-xl opacity-80 mt-4 max-w-lg">
          Les meilleurs articles aux meilleurs prix
        </p>

        <div className="flex flex-col sm:flex-row py-6 gap-4 items-center">
          <Link
            href="/articles"
            className="bg-black text-white py-3 px-6 rounded-lg w-full sm:w-auto text-center transition-colors hover:bg-gray-800"
          >
            Commencez le shopping
          </Link>
          <Link href="/articles" className="font-semibold hover:underline">
            Top articles
          </Link>
        </div>

        <div className="mt-4">
          <PublicStoreStates />
        </div>
      </div>

      {/* Right Column */}
      <div className="hidden lg:flex justify-center items-center p-4">
        <FeaturedCarousel />
      </div>
    </div>
  );
}

export default LandingSection;