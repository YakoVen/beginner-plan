function FeaturedCard({title , price}:{title:string , price:number}) {
    return (
        <div className="min-w-[400px] max-w-[100vw]   p-3 rounded-xl" style={{boxShadow:"0px 0px 20px #00000030"}}>
            <div className="bg-zinc-200 h-52 rounded-lg "></div>
            <div>
                <div className="text-xl font-extrabold">{title}Nike</div>
                <div>{price}dzd</div>
            </div>
        </div>
    );
}

export default FeaturedCard;