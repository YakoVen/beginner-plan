function PublicStoreStates() {
    return (
        <div className="flex flex-row gap-4 md:gap-6 pt-4 md:pt-6 justify-center md:justify-start 
                        text-base sm:text-sm md:text-sm text-gray-600">
            <div className="px-2 md:px-4 border-e border-gray-300">
                <div className="font-bold text-lg sm:text-base md:text-lg text-gray-800">Qualité</div>
                <div>Garantie</div>
            </div>
            <div className="px-2 md:px-4 border-e border-gray-300">
                <div className="font-bold text-lg sm:text-base md:text-lg text-gray-800">Livraison</div>
                <div>Rapide</div>
            </div>
            <div className="px-2 md:px-4">
                <div className="font-bold text-lg sm:text-base md:text-lg text-gray-800">Service</div>
                <div>Client à l'écoute</div>
            </div>
        </div>
    );
}
export default PublicStoreStates;