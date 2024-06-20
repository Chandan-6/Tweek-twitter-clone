"use client";
import { useRouter } from "next/navigation";

export default function BlueBtn(props : BlueBtnTypes){
    const router = useRouter();

    return <div onClick={() => router.push("/signup")} className="bg-custom-blue-1 text-white font-medium text-sm rounded-3xl py-2 w-full text-center cursor-pointer transition-all duration-500 hover:scale-105 ">{props.name}</div>
};

interface BlueBtnTypes{
    name : String,
}