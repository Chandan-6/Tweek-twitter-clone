import { Settings, LogOut } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';


export default function FixedSettings() {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <>
            <Settings onClick={() => setVisible(!visible)} className='hidden tablet:block relative size-5 top-4 right-4' />
            {
                visible && <MoreOptions/>
            }
            <Toaster />
        </>
    )
}


const MoreOptions = () => {
    const router = useRouter();

    // logout
    const logout = async () => {
        try {
            await axios.get("/api/user/logout");
            toast.success("Logout successfull");
            router.push("/");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    return (
        <button onClick={logout} className='w-fit rounded-3xl bg-red-200 text-red-600 font-bold py-1 px-4 text-sm md:text-xs flex justify-center items-center gap-2 absolute top-10 right-6'>
            <span><LogOut size={13} /></span><span>Logout</span>
        </button>
    )
}