import { formatDate } from "@/lib/formatDate"
import { MessageCircle, Heart, Bookmark  } from 'lucide-react';

export default function Tweek(props: tweekInterface) {
    return (
        <div>
            <div className="flex flex-col justify-center items-start p-4">
                <div className='flex justify-center items-center gap-2'>
                    <img src={"/user.png"} alt="user" className='rounded-full w-9 h-9' />
                    <div className="flex justify-center items-center gap-2">
                        <p className='font-semibold text-sm'>{props.lastName}{' '}{props.firstName}</p>
                        <p className='text-gray-600 text-sm'>@{props.userName}</p>
                        <p className='text-gray-600 text-sm'>.</p>
                        <p className='text-gray-600 text-sm'>{props.date && formatDate(props.date)}</p>
                    </div>
                </div>
                <p className="text-sm text-slate-200 pl-11">{props.content}</p>
            </div>
            <div className="flex justify-between items-center mx-6 mb-3 text-gray-600">
              <MessageCircle size={15}/>  <Heart size={15}/> <Bookmark size={15}/>
            </div>
        </div>
    )
};

interface tweekInterface {
    firstName : string,
    lastName : string,
    userName : string,
    date : string,
    content : string
};