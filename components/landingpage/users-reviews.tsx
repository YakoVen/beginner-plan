function UsersReviews() {
  return (
    <div className="p-4 sm:p-8 lg:p-12 w-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">
        Avis de nos clients
      </h2>

      <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-4">
        <div className="flex-none snap-center w-4/5 sm:w-[400px] lg:w-[500px] h-32 rounded-xl bg-zinc-100 border p-4 flex items-center justify-center text-gray-400">
          Avis bientôt disponibles
        </div>
      </div>
    </div>
  );
}

export default UsersReviews;