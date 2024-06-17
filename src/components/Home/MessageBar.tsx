import { SendHorizontal } from 'lucide-react';
import BlueBtn from '../BlueBtn';

export default function MessageBar() {
    return (
        <section className='w-full flex flex-col justify-start items-start h-screen py-4 gap-5 relative'>
            <p className="text-base font-semibold tracking-wide">Threadway😎👋</p>
            <div className="w-full min-h-48 flex flex-col justify-center items-center gap-3 p-4 bg-zinc-800/80 rounded-md">
                <div className="flex flex-col justify-center items-center gap-1">
                    <img src={"/user.jpeg"} alt="user" className='w-16 h-16 object-cover rounded-full' />
                    <p className="text-lg font-semibold tracking-wide">Threadway😎👋</p>
                    <p className="text-gray-500 text-sm">@threadway001</p>
                </div>
                <p className="text-center text-base tracking-tight text-white/80">Student | Sophomore | Tech lead</p>
            </div>

            <div className="space-y-6 w-full flex flex-col">
                <SenderMsg txt={"Hello there!"} />
                <ReceiverMsg txt={"Hey man whatsup!"} />
                <SenderMsg txt={"How was the hackthon man!"} />
                <ReceiverMsg txt={"It was a damn wonderful experience 🧑‍💻"} />
                <SenderMsg txt={"Great 🎇"} />
            </div>

            <div className="w-full h-auto flex justify-between items-center px-5 pt-2 rounded-3xl bg-gray-700 absolute bottom-3 ">
                <textarea
                    placeholder="Start a new message"
                    className="w-full h-auto border-none outline-none bg-transparent text-white placeholder-gray-400 px-4 py-2 rounded-l-3xl resize-none"
                    style={{ minHeight: '1rem', maxHeight: '10rem' }} // adjust as needed
                />                
                <div className="w-10 h-10 hover:bg-gray-500 hover:bg-opacity-50 hover:rounded-full realtive  flex justify-center items-center">
                    <SendHorizontal size={20} className='text-custom-blue-1 absolute' />
                </div>
            </div>
        </section>
    )
};

interface msg {
    txt: String;
}

const SenderMsg = (props: msg) => {
    return <div className="w-full">
        <p className='w-fit bg-custom-blue-1 rounded-3xl px-5 py-1 float-right text-white/85'>{props.txt}</p>
    </div>
}
const ReceiverMsg = (props: msg) => {
    return <div className="w-full">
        <p className='w-fit bg-zinc-700 rounded-3xl px-5 py-1 float-left text-white/85'>{props.txt}</p>
    </div>
}