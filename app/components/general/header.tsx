import Link from "next/link";

function Header() {
    return (
        <div className="flex items-center px-12 py-6  w-screen fixed top-0 ">
            <div className="flex items-center ">
                <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/1A1A1A/online-store.png" alt="online-store" />
                <div className="text-2xl px-1">Your Store</div>

            </div>
            <div className="flex-grow flex justify-center items-center gap-4">
                <Link href={"#"}>Shop</Link>
                <Link href={"#"}>Contact</Link>
                <Link href={"#"}>About</Link>
            </div>
            <div className="flex gap-3">
                <input className="border  py-1  px-4 rounded-lg"  placeholder="search"/>
                <button> <img width="30" height="30" src="https://img.icons8.com/sf-regular-filled/48/1A1A1A/shopping-cart-loaded.png" alt="shopping-cart-loaded"/></button>
            </div>
        </div>
    );
}

export default Header;