"use client";

import SideBar from "@/components/Home/SideBar";
import TrendBar from "@/components/Home/TrendBar";
import Tweek from "@/components/Home/Tweek";
import TweekSkeleton from "@/components/Skeleton/TweekSkeleton";
import { ArrowLeft, CalendarDays } from 'lucide-react';
import { useEffect, useState } from "react";
import EditProfile from "@/components/PopupLayout/EditProfile/EditProfile";
import { useRecoilValue } from "recoil";
import { UserAtom } from "@/Store/atom/UserAtom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface TweekUser {
    firstName: string;
    lastName: string;
    userName: string;
}

interface TweekItem {
    id: string;
    content: string;
    date: string;
    tweekUser: TweekUser;
}

export default function Profile() {
    const { userName, firstName, lastName, bio } = useRecoilValue(UserAtom);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [joinedDate, setJoinedDate] = useState<string>("Date not available");
    const [tweeks, setTweeks] = useState<TweekItem[]>([]);
    const [showSkeleton, setShowSkeleton] = useState<boolean>(false);

    useEffect(() => {
        const fetchTweeks = async () => {
            try {
                setShowSkeleton(true);
                const res = await axios.get("/api/user/tweek");
                
                if(res.data.success){
                    let allTweeks = res.data.tweeks;
                    allTweeks.reverse();
                    setTweeks(allTweeks);
                    setShowSkeleton(false);
                }
            } catch (error:any) {
                toast.error(error.response.data.error);
                setShowSkeleton(false);
            }
        };

        fetchTweeks();
    }, []);


    return (
        <main className="w-[80%] flex justify-between items-start mx-auto min-h-screen relative">
            <div className="fixed left-36 top-0 w-[20%] min-h-screen">
                <SideBar />
            </div>

            {/* Profile section */}
            <section className="w-[50%] h-screen outline outline-1 outline-gray-700 pt-4 flex flex-col justify-start items-start overflow-y-scroll scroll-container mx-auto">
                <div className="w-full self-center px-4 flex justify-start items-start gap-3 pb-2">
                    <div className="hover:bg-gray-500 hover:bg-opacity-50 hover:rounded-full realtive w-7 h-7 flex justify-center items-center">
                        <ArrowLeft className="text-gray-400 absolute" />
                    </div>
                    <p className="w-fit font-semibold ">Khamitkar Sai Chandan 🚀</p>
                </div>
                <Divider />

                {/* banner */}
                <div className="h-screenc w-full">
                    <div className="flex justify-between bg-gray-700 w-full h-44 items-center mb-4 pr-4 relative">
                        <img src={"/user.png"} alt="user" className='rounded-full w-24 h-24 absolute -bottom-10 left-4 outline outline-4 outline-black' />
                    </div>
                    <button onClick={() => setShowModal(true)} className="text-white outline outline-1 outline-gray-500 rounded-3xl px-3 py-1 text-sm font-medium float-right mr-6 mb-6">Edit profile</button>

                    {/* user details */}
                    <div className="mt-16 mb-10 px-4 flex flex-col justify-start items-start gap-4">

                        {/* Name and username */}
                        <div className="space-y-1">
                            <p className="font-bold text-xl">{lastName}{' '}{firstName}</p>
                            <p className="text-gray-500 text-sm">@{userName}</p>
                        </div>

                        {/* Bio and join date section */}
                        <div className="space-y-2">
                            <p className="text-sm tracking-wide">{bio}</p>
                            <p className="text-gray-500 flex justify-start items-start gap-2 text-xs"><span><CalendarDays size={17} /></span><span>Joined {joinedDate} </span></p>
                        </div>
                    </div>
                    <p className="w-fit ml-4 border-b-4 border-custom-blue-1 font-semibold pb-2">Posts</p>
                    <Divider />
                </div>
                {
                    showSkeleton ? <TweekSkeleton/> :  tweeks.map((item) => (
                        <div key={item.id} className="w-full">
                            <Tweek firstName={item.tweekUser.firstName} lastName={item.tweekUser.lastName} userName={item.tweekUser.userName} date={item.date} content={item.content} />
                            <Divider />
                        </div>
                    ))
                }
  
                
                

            </section>

            <div className="fixed right-20 top-0 w-[20%] min-h-screen">
                <TrendBar />
            </div>
            {showModal && <EditProfile onClose={() => setShowModal(false)} />}
            <Toaster/>
        </main>
    )
};


const Divider = () => {
    return <div className="h-px bg-gray-700 w-full"></div>
}