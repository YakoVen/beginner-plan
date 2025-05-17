import RatingContainer from "./widgets/rating-container";

function RatingPreview() {
    return (
        <div className="px-12 pt-6 pb-12 ">
            <div className="text-4xl py-3 font-extrabold ">Nos Client</div>
            <div className=" overflow-hidden flex gap-3">
                <RatingContainer/>
                <RatingContainer/>
                <RatingContainer/>
                <RatingContainer/>
                <RatingContainer/>
                <RatingContainer/>
                <RatingContainer/>
                <RatingContainer/>
                <RatingContainer/>
                <RatingContainer/>

            </div>
        </div>
    );
}

export default RatingPreview;