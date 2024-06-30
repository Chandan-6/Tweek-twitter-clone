"use client";

import SideBar from "@/components/Home/SideBar";
import TrendBar from "@/components/Home/TrendBar";
import Tweek from "@/components/Home/Tweek";
import { useState } from "react";
import Loading from "@/components/Loading";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {

    const [content, setContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const post = async () => {
        try {
            setIsLoading(true);
            const res = await axios.post("/api/user/tweek", {content});
            if(res.data.success){
                setIsLoading(false);
                toast.success("Post sent successfully.");
                setContent('');
            }
            else{
                setIsLoading(false);
                toast.error(res.data.error || "Error in sending post!!");
            }
        } catch (error:any) {
            setIsLoading(false);
            toast.error(error.response.data.error);
        }
    }

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

                {/* New tweek section */}
                <div className="flex justify-start items-center mb-4 w-full pr-4">
                    <div className='w-full flex justify-start items-start gap-2 px-4'>
                        <img src={"/user.png"} alt="user" className='rounded-full w-9 h-9 mt-6' />
                        <div className="w-full my-6">
                            <textarea 
                            className='w-full h-fit font-medium text-lg text-white text-justify bg-transparent placeholder-slate-600 outline-none border-none' 
                            placeholder="What is happening?!"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            rows={10}
                            />

                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-end items-end">
                    <button onClick={post} className="w-24 float-right bg-custom-blue-1 text-white font-medium text-xs rounded-3xl m-4 py-2 text-center cursor-pointer transition-all duration-500 hover:scale-105 ">{isLoading ? <Loading/> : 'POST'}
                    </button>
                    <Divider />
                </div>

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