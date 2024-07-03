import { TweekUser } from "@/helpers/types";

export default function SimpleUser(props: TweekUser) {
    return (
        <div className="flex flex-col justify-center items-start p-4">
            <div className='flex justify-center items-center gap-2'>
                <img src={"/user.png"} alt="user" className='rounded-full w-9 h-9' />
                <div className="flex flex-col justify-start items-start gap-2">
                    <p className='font-semibold text-sm'>{props.lastName}{' '}{props.firstName}</p>
                    <p className='text-gray-600 text-sm'>@{props.userName}</p>
                </div>
            </div>
        </div>
    )
};