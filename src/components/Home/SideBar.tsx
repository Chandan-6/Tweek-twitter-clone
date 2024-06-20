"use client";

import { UserAtom } from '@/Store/atom/UserAtom';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Home, Search, MessagesSquare, Bookmark, User, Ellipsis } from 'lucide-react';
import React from "react";
import { useRecoilValue } from 'recoil';

// props list of Contents component
const list = [
    {
        id : 1,
        logo : Home,
        title : "Home"
    },
    {
        id : 2,
        logo : Search,
        title : "Explore"
    },
    {
        id : 3,
        logo : MessagesSquare,
        title : "Messages"
    },
    {
        id : 4,
        logo : Bookmark,
        title : "Bookmarks"
    },
    {
        id : 5,
        logo : User,
        title : "Profile"
    },
];

export default function SideBar(){
    const {userName, firstName, lastName} = useRecoilValue(UserAtom);

    return(
        <div className='flex flex-col justify-between items-start h-screen py-4'>
            <div className="space-y-8 flex flex-col justify-center items-start">
                <img src={"/tweek.png"} alt="tweek logo" className='w-6 h-6 mb-4' />
                    {
                        list.map((item) => <Contents key={item.id} logo={item.logo} title={item.title}  />)
                    }
            </div>
            {/* User profile basic details */}
            <div className="flex justify-between items-center gap-4">
                <div className='flex justify-center items-center gap-2'>
                    <img src={"/me.jpg"} alt="user" className='rounded-full w-9 h-9' />
                    <div>
                        <p className='font-semibold text-sm'>{lastName}{' '}{firstName}</p>
                        <p className='text-gray-600 text-sm'>@{userName}</p>
                    </div>
                </div>
                <Ellipsis />
            </div>
        </div>
    )
};

interface contentsInterface {
    logo : React.FC<React.SVGProps<SVGSVGElement>>,
    title : string,
}

const Contents: React.FC<contentsInterface> = ({ logo: Logo, title }) => {
    return(
        <div className='flex justify-center items-center gap-4 cursor-pointer'>
            <Logo className='w-6 h-6 text-white' />
            <p className='text-white font-semibold tracking-wide'>{title}</p>
        </div>
    )
};