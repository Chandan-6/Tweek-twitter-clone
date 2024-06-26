"use client";

import { Search } from 'lucide-react';
import BlueBtn from '../BlueBtn';
import { useRouter } from 'next/navigation';

export default function TrendBar() {
    const router = useRouter();

    return (
        <section className='w-64 flex flex-col justify-start items-start h-screen py-4 gap-7'>
            <div onClick={() => router.push("explore")} className="w-full bg-gray-700 text-gray-400 rounded-3xl flex gap-2 py-2 pl-2 justify-start items-center cursor-pointer ">
                <Search />
                <p>Search</p>
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-3 p-4 border border-gray-700 rounded-xl">
                <p className='text-xl font-bold'>The Trend setter</p>
                <p className='text-sm'>Here are your most loved tweek of your following.</p>
                <div className="bg-custom-blue-1 text-white font-medium text-sm rounded-3xl py-1 px-5 text-center cursor-pointer transition-all duration-500 hover:scale-105 ">Hello</div>
            </div>
        </section>
    )
}