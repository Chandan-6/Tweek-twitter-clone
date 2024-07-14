"use client";

import SideBar from "@/components/Home/SideBar";
import TrendBar from "@/components/Home/TrendBar";
import Tweek from "@/components/Home/Tweek";
import TweekSkeleton from "@/components/Skeleton/TweekSkeleton";
import { TweekItem } from "@/helpers/types";
import { useRecoilValue } from "recoil";
import { UserAtom } from "@/Store/atom/UserAtom";
import BottomNav from "@/components/Home/BottomNav";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Bookmarks() {

    // Keeping null to avoid error
    const textareaRef = useRef(null);

    const [showSkeleton, setShowSkeleton] = useState<boolean>(false);
    const [allBookmarks, setAllBookmarks] = useState<TweekItem[]>([]);

    const { email } = useRecoilValue(UserAtom);

    // Will render all posts from DB
    useEffect(() => {
        const fetchAllTweeks = async () => {
            try {
                setShowSkeleton(true);
                const res = await axios.get("/api/user/bookmarks");

                if(res.data.success){
                    let allBookmarks = res.data.bookmarks;
                    allBookmarks.reverse();
                    setAllBookmarks(allBookmarks);
                    console.log("All bookmarks data got is : ", res.data.bookmarks);
                    setShowSkeleton(false);
                }
                
            } catch (error:any) {
                toast.error(error.response.data.error);
                setShowSkeleton(false);
            }
        };

        fetchAllTweeks();
    },[]);

    return (
            <main className="w-[80%] tablet:w-full flex justify-between items-start mx-auto min-h-screen relative">
                <div className="fixed left-36 lg:left-10 md:left-24 top-0 w-[20%] md2:left-10 min-h-screen">
                    <SideBar />
                </div>

                {/* tweek section */}
                <section className="w-[50%] lg:w-[53%] md:w-[70%] tablet:w-[80%] h-screen outline outline-1 outline-gray-700 pt-4 flex flex-col justify-start items-start overflow-y-scroll scroll-container mx-auto lg:mr-56 md:mr-0 tablet:mx-auto">
                    <div className="w-full self-center px-4">
                        <p className="w-fit pb-2 border-b-4 border-custom-blue-1 font-semibold md2:text-sm">Your Bookmarks</p>
                    </div>
                    <Divider />


                    {/* tweeks from the database will be shown here */}
                    <div className="w-full h-full flex flex-col justify-start items-start">
                        {showSkeleton ? <RepeatedSkeleton/> : allBookmarks.map((item) => (
                        <div key={item.id} className="w-full">
                            <Tweek 
                                id={item.tweek.id}
                                firstName={item.tweek.tweekUser.firstName}
                                lastName={item.tweek.tweekUser.lastName}
                                userName={item.tweek.tweekUser.userName}
                                date={item.tweek.date}
                                content={item.tweek.content}
                                likes={item.tweek.likes}
                                CurrentUserEmail={email}
                                bookmarkedUserEmail={item.userId} />
                            <Divider />
                        </div>
                    ))}

                    </div>
                </section>

                <div className="fixed right-20 top-0 w-[20%] min-h-screen">
                    <TrendBar />
                </div>
                <Toaster/>
                <BottomNav textareaRef={textareaRef}/>
            </main>
    )
};


const Divider = () => {
    return <div className="h-px bg-gray-700 w-full"></div>
};


const RepeatedSkeleton = () =>{
    return <>
        <TweekSkeleton/>
        <Divider />
        <TweekSkeleton/>
        <Divider />
        <TweekSkeleton/>
        <Divider />
        <TweekSkeleton/>
        <Divider />
    </>
}