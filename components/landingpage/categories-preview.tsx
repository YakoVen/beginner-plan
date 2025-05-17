import CategorieCard from "./widgets/categorie-widget";

function CategoriesPreview() {
    return (
        <div className="p-12">
            <h2 className="text-2xl font-extrabold">Vous venez achetez quoi?</h2>
            <div className="max-w-full flex overflow-x-auto  max-sm:flex-wrap gap-5  w-fit mx-auto">
            <CategorieCard CategorieTitle="T-shirts"/>
            <CategorieCard CategorieTitle="Sweet"/>
            <CategorieCard CategorieTitle="Jacket"/>
            <CategorieCard CategorieTitle="Pontalon"/>

            </div>
        </div>
    );
}

export default CategoriesPreview;