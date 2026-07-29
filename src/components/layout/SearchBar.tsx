import { Search } from "lucide-react";

export default function SearchBar() {
    return (

        <div className="flex flex-1 max-w-2xl mx-10">

            <input

                type="text"

                placeholder="O que você está procurando hoje?"

                className="w-full h-14 rounded-l-full bg-zinc-800 text-white px-8 outline-none"

            />

            <button

                className="w-16 bg-yellow-500 rounded-r-full flex items-center justify-center"

            >

                <Search />

            </button>

        </div>

    )
}