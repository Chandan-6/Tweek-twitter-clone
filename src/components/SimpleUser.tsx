import { TweekUser } from "@/helpers/types";
import { useRouter } from "next/navigation";

export default function SimpleUser(props: TweekUser) {
    const router = useRouter();

    return (
        <div onClick={() => router.push(`profile?auth_user=false&email=${props.email}`)} className="flex flex-col justify-center items-start p-4 transition-all duration-300 cursor-pointer hover:outline hover:outline-2 hover:outline-blue-500 ">
            <div className='flex justify-center items-center gap-2 '>
                <img src={"/user.png"} alt="user" className='rounded-full w-9 h-9' />
                <div className="flex flex-col justify-start items-start gap-1">
                    <p className='font-semibold text-base'>{props.lastName}{' '}{props.firstName}</p>
                    <p className='text-gray-600 text-sm font-medium'>@{props.userName}</p>
                </div>
            </div>
        </div>
    )
};