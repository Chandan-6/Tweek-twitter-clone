"use client";

import { useSession, signOut } from "next-auth/react";
import { UserAtom } from '@/Store/atom/UserAtom';
import { Home, Search, MessagesSquare, Bookmark, User, LogOut } from 'lucide-react';
import React from "react";
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

// props list of Contents component
const list = [
    {
        id: 1,
        logo: Home,
        title: "Home",
        navigate: "home"
    },
    {
        id: 2,
        logo: Search,
        title: "Explore",
        navigate: "explore"
    },
    {
        id: 3,
        logo: MessagesSquare,
        title: "Messages",
        navigate: "messages"
    },
    {
        id: 4,
        logo: Bookmark,
        title: "Bookmarks",
        navigate: "bookmarks"
    },
    {
        id: 5,
        logo: User,
        title: "Profile",
        navigate: `profile`
    },
];

export default function SideBar() {
    const router = useRouter();
    const { userName, firstName, lastName, userProfile, email } = useRecoilValue(UserAtom);
    const { data: session } = useSession();
    
    // logout
    const logout = async () => {
        try {
            if(session && session.user){
                await signOut({ callbackUrl: "/login", redirect: false });
            }
            await axios.get("/api/user/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    return (
        <>
            <div className='flex flex-col justify-between items-start h-screen py-4 tablet:hidden'>
                <div className="space-y-8 flex flex-col justify-center items-start">
                    <img src={"/tweek.png"} alt="tweek logo" className='w-6 h-6 mb-4' />
                    {
                        list.map((item) => <Contents key={item.id} logo={item.logo} title={item.title} navigate={item.navigate} />)
                    }
                </div>
                {/* User profile basic details */}
                <div className="flex flex-col space-y-4">
                    <button onClick={logout} className='w-[60%] rounded-3xl bg-red-200 text-red-600 font-bold py-1 px-4 text-sm md:text-xs flex justify-center items-center gap-2'>
                        <span><LogOut size={13} /></span><span>Logout</span>
                    </button>
                    <a href={`profile?auth_user=true&email=${email}`} className="w-[85%] flex justify-between items-center gap-4">
                        <div className='flex justify-center items-center gap-2'>
                            <img src={userProfile !== '' ? userProfile : "/user.png"} alt="user" className='rounded-full w-9 h-9' />
                            <div>
                                <p className='font-semibold text-xs'>{lastName}{' '}{firstName}</p>
                                <p className='text-gray-600 text-sm w-[70%] overflow-hidden'>@{userName}</p>
                            </div>
                        </div>
                        {/* <Ellipsis /> */}
                    </a>
                </div>
                <Toaster />
            </div>
        </>
    )
};

interface contentsInterface {
    logo: React.FC<React.SVGProps<SVGSVGElement>>,
    title: string,
    navigate: string,
}

const Contents: React.FC<contentsInterface> = ({ logo: Logo, title, navigate }) => {
    const router = useRouter();
    const { email } = useRecoilValue(UserAtom);

    const handleNavigation = () => {
        if (navigate === 'profile') { router.push(`profile?auth_user=true&email=${email}`) }
        else { router.push(navigate) }
    }
    return (
        <div onClick={handleNavigation} className='flex justify-center items-center gap-4 cursor-pointer select-none'>
            <Logo className='w-6 h-6 text-white' />
            <p className='text-white font-semibold tracking-wide'>{title}</p>
        </div>
    )
};