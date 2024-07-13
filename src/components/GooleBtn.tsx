
export default function GoogleBtn(){
    return(
        <div className="flex justify-center items-center rounded-3xl space-x-2 bg-white px-7 py-2 w-full text-center cursor-pointer transition-all duration-500 hover:scale-105">
            <img src={"/google.png"} alt="pGoogle logo" className="w-6 h-6 sm:w-4 sm:h-4"  />
            <p className="text-black font-medium text-sm sm:text-xs">Sign up with Google</p>
        </div>
    )
}