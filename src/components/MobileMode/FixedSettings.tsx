import { Settings, LogOut } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";


export default function FixedSettings() {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <>
            <Settings onClick={() => setVisible(!visible)} className='hidden tablet:block relative size-5 top-3 right-3' />
            {
                visible && <MoreOptions/>
            }
            <Toaster />
        </>
    )
}


const MoreOptions = () => {
    const router = useRouter();
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
        <button onClick={logout} className='w-fit rounded-3xl bg-red-200 text-red-600 font-bold py-1 px-4 text-sm md:text-xs flex justify-center items-center gap-2 absolute top-9 right-5'>
            <span><LogOut size={13} /></span><span>Logout</span>
        </button>
    )
}