import ItemCard from "../general/item-card";

function LandingSection() {
    return (
        <div className="flex justify-around h-screen justify-center p-12">
            <div className="flex-grow h-full flex  flex-col justify-center">
                <h1 className="text-6xl font-extrabold"> Bienvenu dans notre Store online  </h1>
                <h4 className="text-xl opacity-80"> les meilleur articles , les prix moin cher </h4>
                <div className="flex py-6 gap-4">
                    <button className="bg-black text-white py-3 px-6 rounded-lg">Commencez le shopping</button>
                    <button>Top articles</button>
                </div>
            </div>
            <div className="flex justify-center gap-4  items-center p-20">
                <ItemCard />
            </div>
        </div>
    );
}

export default LandingSection;