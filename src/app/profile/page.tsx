import SideBar from "@/components/Home/SideBar";
import TrendBar from "@/components/Home/TrendBar";
import Tweek from "@/components/Home/Tweek";
import { ArrowLeft, CalendarDays } from 'lucide-react';

export default function Profile() {
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
                        <img src={"/me.jpg"} alt="user" className='rounded-full w-24 h-24 absolute -bottom-10 left-4 outline outline-4 outline-black' />
                    </div>
                    <button className="text-white outline outline-1 outline-gray-500 rounded-3xl px-3 py-1 text-sm font-medium float-right mr-6 mb-6">Edit profile</button>

                    {/* user details */}
                    <div className="mt-16 mb-10 px-4 flex flex-col justify-start items-start gap-4">

                        {/* Name and username */}
                        <div className="space-y-1">
                            <p className="font-bold text-xl">Khamitkar Sai Chandan 🚀</p>
                            <p className="text-gray-500 text-sm">@chandanK_6</p>
                        </div>

                        {/* Bio and join date section */}
                        <div className="space-y-2">
                            <p className="text-sm tracking-wide">Developer</p>
                            <p className="text-gray-500 flex justify-center items-center gap-2 text-xs"><span><CalendarDays size={17}/></span><span>Joined September 2023</span></p>
                        </div>
                    </div>
                    <p className="w-fit ml-4 border-b-4 border-custom-blue-1 font-semibold pb-2">Posts</p>
                <Divider />
                </div>
                <Tweek />
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