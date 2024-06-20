"use client";

import SideBar from "@/components/Home/SideBar";
import TrendBar from "@/components/Home/TrendBar";
import Tweek from "@/components/Home/Tweek";
export default function Home() {
    return (

            <main className="w-[80%] flex justify-between items-start mx-auto min-h-screen relative">
                <div className="fixed left-36 top-0 w-[20%] min-h-screen">
                    <SideBar />
                </div>

                {/* tweek section */}
                <section className="w-[50%] h-screen outline outline-1 outline-gray-700 pt-4 flex flex-col justify-start items-start overflow-y-scroll scroll-container mx-auto">
                    <div className="w-full self-center px-4">
                        <p className="w-fit pb-2 border-b-4 border-custom-blue-1 font-semibold ">For you</p>
                    </div>
                    <Divider />

                    {/* new tweek section */}
                    <div className="flex justify-between items-center mb-4 w-full pr-4">
                        <div className='flex justify-center items-center gap-2 px-4'>
                            <img src={"/me.jpg"} alt="user" className='rounded-full w-9 h-9' />
                            <div className="my-6">
                                <input className='font-medium text-lg text-white bg-transparent placeholder-slate-600 outline-none border-none' placeholder="What is happening?!" />
                            </div>
                        </div>
                        <div className="w-24 mt-20 float-right bg-custom-blue-1 text-white font-medium text-xs rounded-3xl py-2 text-center cursor-pointer transition-all duration-500 hover:scale-105 ">POST
                        </div>
                    </div>
                    <Divider />

                    {/* tweeks from the database will be shown here */}
                    <div className="w-full h-full border-x border-gray-700  flex flex-col justify-start items-start">
                        <Tweek />
                        <Divider />
                        <Tweek />
                        <Divider />
                        <Tweek />
                        <Divider />
                        <Tweek />
                        <Divider />
                    </div>
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