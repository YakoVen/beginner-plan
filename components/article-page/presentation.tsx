import { article } from "@/interfaces/article";
import Carousel from "./widgets/carousel";



function Presentation({ article }: { article: article }) {
    return (
        <div className="md:w-96 lg:w-1/2 max-w-lg   min-h-full overflow-y-auto border border-gray-400 flex flex-col items-center  p-4">
            <Carousel images={[article.thumbnail,...article.screenshots]} />
            <div className="text-2xl">{article?.title}</div>
            <p className="p-1 text-sm border rounded-lg" style={{whiteSpace:"pre-line"}}>
                {article?.disc}
            </p>
        </div>
    );
}

export default Presentation;