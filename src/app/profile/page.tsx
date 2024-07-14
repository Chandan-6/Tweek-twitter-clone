"use client";

import SideBar from "@/components/Home/SideBar";
import TrendBar from "@/components/Home/TrendBar";
import Tweek from "@/components/Home/Tweek";
import TweekSkeleton from "@/components/Skeleton/TweekSkeleton";
import { ProfileSkeleton, SingleSkeleton } from "@/components/Skeleton/ProfileSkeleton";
import { TweekItem, TweekUser } from "@/helpers/types";

import { ArrowLeft, CalendarDays } from 'lucide-react';
import { useEffect, useState, useRef } from "react";
import EditProfile from "@/components/PopupLayout/EditProfile/EditProfile";
import BottomNav from "@/components/Home/BottomNav";
import { useRecoilValue } from "recoil";
import { UserAtom } from "@/Store/atom/UserAtom";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from 'next/navigation'


export default function Profile() {
    
    const { email } = useRecoilValue(UserAtom);
    // Keeping null to avoid error
    const textareaRef = useRef(null);

    const searchParams = useSearchParams();
    const auth_user = searchParams.get('auth_user');
    const email_current = searchParams.get('email');
    console.log("authuser : ", auth_user);
    
    const [showModal, setShowModal] = useState<boolean>(false);
    const [joinedDate, setJoinedDate] = useState<string>("Date not available");
    const [tweeks, setTweeks] = useState<TweekItem[]>([]);
    const [showSkeleton, setShowSkeleton] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<TweekUser>({
        firstName: '',
        lastName: '',
        userName: '',
        bio : ''
    })

    useEffect(() => {
        const fetchTweeks = async () => {
            try {
                setShowSkeleton(true);
                const res = await axios.get(`/api/user/tweek?auth_user=${auth_user}&email=${email_current}`);

                if(res.data.success){
                    let allTweeks = res.data.tweeks;
                    allTweeks.reverse();
                    setTweeks(allTweeks);
                        setUserDetails((prev) => ({
                            ...prev,
                            firstName: res.data.details.firstName,
                            lastName : res.data.details.lastName,
                            userName : res.data.details.userName,
                            bio : res.data.details.bio
                        }))
                    setShowSkeleton(false);
                }
            } catch (error:any) {
                toast.error(error.response.data.error);
                setShowSkeleton(false);
            }
        };

        fetchTweeks();
    }, [auth_user, email]);


    return (
        <main className="w-[80%] tablet:w-full flex justify-between items-start mx-auto min-h-screen relative">
            <div className="fixed left-36 lg:left-10 md:left-24 top-0 w-[20%] md2:left-10 min-h-screen">
                <SideBar />
            </div>

            {/* Profile section */}
            <section className="w-[50%] lg:w-[53%] md:w-[70%] tablet:w-[80%] h-screen outline outline-1 outline-gray-700 pt-4 flex flex-col justify-start items-start overflow-y-scroll scroll-container mx-auto lg:mr-56 md:mr-0 tablet:mx-auto">
                <div className="w-full self-center px-4 flex justify-start items-start gap-3 pb-2">
                    <div className="hover:bg-gray-500 hover:bg-opacity-50 hover:rounded-full realtive w-7 h-7 flex justify-center items-center">
                        <ArrowLeft className="text-gray-400 absolute tablet:size-5" />
                    </div>

                    {
                        showSkeleton ? <SingleSkeleton /> : <p className="w-fit font-semibold tablet:text-sm ">{userDetails?.lastName}{' '}{userDetails?.firstName}</p>
                    }
                    
                </div>
                <Divider />

                {/* banner */}
                <div className="h-screenc w-full">
                    <div className="flex justify-between bg-gray-700 w-full h-44 items-center mb-4 pr-4 relative">
                        <img src={"/user.png"} alt="user" className='rounded-full w-24 h-24 md:w-20 md:h-20 absolute -bottom-10 left-4 outline outline-4 outline-black' />
                    </div>

                    {/* Edit profile option is only visible to auth_user */}
                    {
                        auth_user === 'true' ?  <button onClick={() => setShowModal(true)} className="text-white outline outline-1 outline-gray-500 rounded-3xl px-3 py-1 text-sm font-medium float-right mr-6 mb-6 tablet:z-50">Edit profile</button> : ''
                    }

                    {/* user details */}
                    {
                        showSkeleton ? <ProfileSkeleton /> : <div className="tablet:w-full mt-16 mb-10 px-4 flex flex-col justify-start items-start gap-4">

                            {/* Name and username */}
                            <div className="space-y-1">
                                <p className="font-bold text-xl md:text-base tablet:text-sm tablet:tracking-wide">{userDetails?.lastName}{' '}{userDetails?.firstName}</p>
                                <p className="text-gray-500 text-sm">@{userDetails?.userName}</p>
                            </div>

                            {/* Bio and join date section */}
                            <div className="space-y-2">
                                <p className="text-sm tracking-wide tablet:text-white/80 ">{userDetails?.bio}</p>
                                <p className="text-gray-500 flex justify-start items-start gap-2 text-xs"><span><CalendarDays size={17} /></span><span>Joined {joinedDate} </span></p>
                            </div>
                        </div>
                    }

                    <p className="w-fit ml-4 border-b-4 border-custom-blue-1 font-semibold pb-2">Posts</p>
                    <Divider />
                </div>

                {/* All posts/tweeks of the user */}
                {
                    showSkeleton ? <TweekSkeleton/> :  tweeks.map((item) => (
                        <div key={item.id} className="w-full">
                            <Tweek id={item.id} firstName={item.tweekUser.firstName} lastName={item.tweekUser.lastName} userName={item.tweekUser.userName} date={item.date} content={item.content} likes={item.likes} CurrentUserEmail={email} bookmarkedUserEmail={""} />
                            <Divider />
                        </div>
                    ))
                }

            </section>

            <div className="fixed right-20 top-0 w-[20%] min-h-screen">
                <TrendBar />
            </div>

            {/* OnClick Edit profile will appear */}
            {showModal && <EditProfile onClose={() => setShowModal(false)} />}
            <Toaster/>
            <BottomNav textareaRef={textareaRef}/>
        </main>
    )
};


const Divider = () => {
    return <div className="h-px bg-gray-700 w-full"></div>
}