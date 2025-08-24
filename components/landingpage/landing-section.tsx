import ItemCard from "../general/featured-carousel";
import PublicStoreStates from "./widgets/store-pub-states";

function LandingSection() {
    return (
        // Main container: Stacks vertically on mobile, switches to row on large screens.
        // Responsive padding and minimum height for better layout control.
        <div className="flex flex-col lg:flex-row items-center min-h-screen justify-center px-6 py-12 lg:px-12 lg:justify-around">
            
            {/* Left Column (Text content): Centered on mobile, left-aligned on large screens */}
            <div className="flex-grow h-full flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
                
                {/* Responsive heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
                    Bienvenu dans notre Store online
                </h1>
                
                {/* Responsive subheading */}
                <h4 className="text-lg lg:text-xl opacity-80 mt-4 max-w-lg">
                    les meilleur articles , les prix moin cher
                </h4>
                
                {/* Responsive button container: Stacks on small screens, row on larger screens */}
                <div className="flex flex-col sm:flex-row py-6 gap-4 items-center">
                    <button className="bg-black text-white py-3 px-6 rounded-lg w-full sm:w-auto">
                        Commencez le shopping
                    </button>
                    <button className="font-semibold">Top articles</button>
                </div>

                <div className="mt-4">
                    <PublicStoreStates />
                </div>
            </div>

            {/* Right Column (ItemCard): Hidden on mobile/tablet, visible on large screens */}
            <div className="hidden lg:flex justify-center items-center p-4">
                <ItemCard />
            </div>
        </div>
    );
}

export default LandingSection;