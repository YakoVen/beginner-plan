function ItemCard() {
    return (
        <div className="flex flex-col h-[600px] w-96 rounded-2xl overflow-hidden" >
            <div className="bg-slate-300 flex-grow"></div>
            <div className="h-40 bg-gray-700 flex flex-col justify-center p-6 gap-2">

                <div className="text-white flex justify-between items-center">
                    <div className="text-2xl font-extrabold">White T-Shirt</div>
                    <div>
                        <div className="font-bold">Price:</div>
                        <div>1000 dzd</div>
                    </div>
                </div>
                <div className="text-white font-extrabolder flex gap-3 justify-around">
                    <button className="bg-gray-800  rounded-lg w-44 py-3 text-center">Add to cart</button>
                    <button className="bg-gray-800  rounded-lg w-44 py-3 text-center">View item</button>

                </div>
            </div>
        </div>
    );
}

export default ItemCard;