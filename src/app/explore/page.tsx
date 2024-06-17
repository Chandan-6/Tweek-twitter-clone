"use client";

import SideBar from "@/components/Home/SideBar";
import TrendBar from "@/components/Home/TrendBar";
import { ArrowLeft, Search } from 'lucide-react';
import { tree } from "next/dist/build/templates/app-page";
import { useState } from "react";

export default function Explore() {

    const [searchFocus, setSearchFocus] = useState<boolean>(false);

    const handleFocus = () => {
        setSearchFocus(true);
    }

    return (
        <main className="w-[80%] flex justify-between items-start mx-auto min-h-screen relative">
            <div className="fixed left-36 top-0 w-[20%] min-h-screen">
                <SideBar />
            </div>

            {/* search section */}
            <section className="w-[50%] h-screen outline outline-1 outline-gray-700 pt-4 flex flex-col justify-start items-start overflow-y-scroll scroll-container mx-auto">
                <div className="w-full self-center px-4 flex justify-start items-start gap-3 pb-2 mb-4">
                    <div className="hover:bg-gray-500 hover:bg-opacity-50 hover:rounded-full realtive w-7 h-7 flex justify-center items-center">
                        <ArrowLeft className="text-gray-400 absolute" />
                    </div>
                    <div onChange={handleFocus} onClick={handleFocus} className={`w-full bg-gray-700 text-gray-400 rounded-3xl flex gap-2 py-2 pl-2 justify-start items-center cursor-pointer ${searchFocus && "outline outline-4 outline-custom-blue-1" } `}>
                        <Search />
                        <input type="text" className="border-none outline-none bg-transparent w-full pr-1 overflow-x-hidden" name="searchBar" placeholder="Search" />
                    </div>
                </div>
                <p className="w-fit ml-4 border-b-4 border-custom-blue-1 font-semibold pb-2">People</p>
                <Divider />

            </section>

            <div className="fixed right-20 top-0 w-[20%] min-h-screen">
                <TrendBar />
            </div>
        </main>
    )
};


const Divider = () => {
    return <div className="h-px bg-gray-700 w-full"></div>
}
