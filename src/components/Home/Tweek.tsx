export default function Tweek() {
    return (
        <div className="flex flex-col justify-center items-start p-4">
            <div className='flex justify-center items-center gap-2'>
                <img src={"/me.jpg"} alt="user" className='rounded-full w-9 h-9' />
                <div className="flex justify-center items-center gap-2">
                    <p className='font-semibold text-sm'>Khamitkar Sai Chandan</p>
                    <p className='text-gray-600 text-sm'>@chandanK_6</p>
                    <p className='text-gray-600 text-sm'>.</p>
                    <p className='text-gray-600 text-sm'>Jun 17</p>
                </div>
            </div>
            <p className="text-sm text-slate-200 pl-11">Radhe Radhe ✨ </p>
        </div>
    )
};