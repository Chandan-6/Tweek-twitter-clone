"use client";

import SideBar from "@/components/Home/SideBar";
import TrendBar from "@/components/Home/TrendBar";
import Tweek from "@/components/Home/Tweek";
import TweekSkeleton from "@/components/Skeleton/TweekSkeleton";
import { TweekItem } from "@/helpers/types";
import Loading from "@/components/Loading";
import BottomNav from "@/components/Home/BottomNav";
import FixedLogo from "@/components/MobileMode/FixedLogo";
import FixedSettings from "@/components/MobileMode/FixedSettings";

import { useRecoilValue } from "recoil";
import { UserAtom } from "@/Store/atom/UserAtom";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {

    const [content, setContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showSkeleton, setShowSkeleton] = useState<boolean>(false);
    const [allTweeks, setAllTweeks] = useState<TweekItem[]>([]);
    const [postSaved, setPostSaved] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { email, userProfile } = useRecoilValue(UserAtom);

    const handlePostChange = (e:  ChangeEvent<HTMLTextAreaElement>) => {
        let textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset the height
            textarea.style.height = `${textarea.scrollHeight}px`; // Set new height based on scrollHeight
        }
        setContent(e.target.value)
    }

    // Helps to store the new post in DB
    const post = async () => {
        try {
            setIsLoading(true);
            const res = await axios.post("/api/user/tweek", {content});
            if(res.data.success){
                setIsLoading(false);
                toast.success("Post sent successfully.");
                setContent('');
                setPostSaved(prev => !prev);
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

    // Will render all posts from DB
    useEffect(() => {
        const fetchAllTweeks = async () => {
            try {
                setShowSkeleton(true);
                const res = await axios.get("/api/people/tweek");

                if(res.data.success){
                    let allTweeks = res.data.tweeks;
                    allTweeks.reverse();
                    setAllTweeks(allTweeks);
                    setShowSkeleton(false);
                }
                
            } catch (error:any) {
                toast.error(error.response.data.error);
                setShowSkeleton(false);
            }
        };

        fetchAllTweeks();
    },[postSaved]);

    return (
            <main className="w-[80%] tablet:w-full flex justify-between items-start mx-auto min-h-screen relative">
                <div className="fixed left-36 lg:left-10 md:left-24 top-0 w-[20%] md2:left-10 min-h-screen">
                    <SideBar />
                </div>
                <FixedLogo/>
                {/* tweek section */}
                <section className="w-[50%] lg:w-[53%] md:w-[70%] tablet:w-[80%] h-screen outline outline-1 outline-gray-700 pt-4 flex flex-col justify-start items-start overflow-y-scroll scroll-container mx-auto lg:mr-56 md:mr-0 tablet:mx-auto">
                    <div className="w-full self-center px-4">
                        <p className="w-fit pb-2 border-b-4 border-custom-blue-1 font-semibold md2:text-sm">For you</p>
                    </div>
                    <Divider />

                {/* New tweek section */}
                <div className="flex justify-start items-center mb-4 w-full pr-4">
                    <a href={`profile?auth_user=${true}&email=${email}`} className='w-full flex justify-start items-start gap-2 px-4'>
                        <img src={userProfile !== '' ? userProfile : "/user.png"} alt="user" className='rounded-full w-9 h-9 mt-6' />
                        <div className="w-full my-6">
                            <textarea 
                            ref={textareaRef}
                            className='w-full h-fit font-medium text-lg md2:text-sm text-white text-justify bg-transparent placeholder-slate-600 outline-none border-none resize-none' 
                            placeholder="What is happening?!"
                            value={content}
                            onChange={(e) => handlePostChange(e)}
                            style={{ overflow: 'hidden' }} // Hide the scrollbar
                            required
                            rows={1}
                            />

                        </div>
                    </a>
                </div>
                <div className="w-full flex flex-col justify-end items-end">
                    <button onClick={post} className="w-24 float-right bg-custom-blue-1 text-white font-medium text-xs rounded-3xl m-4 py-2 text-center cursor-pointer transition-all duration-500 hover:scale-105 tablet:z-20">{isLoading ? <Loading/> : 'POST'}
                    </button>
                    <Divider />
                </div>

                    {/* tweeks from the database will be shown here */}
                    <div className="w-full h-full flex flex-col justify-start items-start">
                        {showSkeleton ? <RepeatedSkeleton/> : allTweeks.map((item) => (
                        <div key={item.id} className="w-full">
                                <Tweek
                                id={item.id}
                                firstName={item.tweekUser.firstName}
                                lastName={item.tweekUser.lastName}
                                userName={item.tweekUser.userName}
                                date={item.date} content={item.content}
                                likes={item.likes}
                                CurrentUserEmail={email}
                                bookmarkedUserEmail={item.bookmarks?.[0]?.userId} 
                                userProfile={item.tweekUser.userProfile}
                                />
                            <Divider />
                        </div>
                    ))}

                    </div>
                </section>

                <div className="fixed right-20 top-0 w-[20%] min-h-screen">
                    <TrendBar />
                </div>
                <div className="hidden tablet:block">
                    <FixedSettings/>
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