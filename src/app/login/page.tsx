"use client";

import Footer from "@/components/Footer";
import GoogleBtn from "@/components/GooleBtn";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UserAtom } from "@/Store/atom/UserAtom";
import { useSetRecoilState } from "recoil";

interface formInput {
    userName: string,
    password: string,
};

export default function Login() {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<formInput>({
        userName: "",
        password: "",
    });
    const setUserAtom = useSetRecoilState(UserAtom);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onLogin = async (e: FormEvent) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const res = await axios.post("/api/user/auth/login", formData);

            if (res.data.success) {
                setUserAtom((prev) => ({ ...prev, email: res.data.email, userName: res.data.userName, firstName: res.data.firstName, lastName: res.data.lastName, bio : res.data.bio, userProfile : res.data.userProfile }))
                setIsLoading(false);
                toast.success("Login successfully");
                router.push("/home");
            }
            else {
                setIsLoading(false);
                toast.error(res.data.error);
            }
        } catch (error: any) {
            setIsLoading(false);
            console.log("Login failed: ", error);
            toast.error(error.response.data.error);
        }
    }

    return (
        <main className="min-h-screen flex flex-col ">
            <div className="w-[30%] flex flex-col items-center my-auto mx-auto justify-center py-4 px-10 select-none space-y-4 outline outline-1 outline-gray-700 rounded-lg lg:w-[40%] md2:w-[60%] sm:w-[70%]">
                <img src={"/tweek.png"} alt="tweek logo" className="w-6 h-6 mb-4 sm:w-5 sm:h-5" />
                <p className="self-start font-semibold text-lg sm:text-sm">Sign in to Tweek</p>
                <GoogleBtn btnTxt={"Sign in with Google"}/>
                <div className="flex">
                    <Divider/>
                    <p className="text-gray-300 text-sm">or</p>
                    <Divider/>
                </div>
                <form action="#" onSubmit={onLogin} className="w-full space-y-5 justify-center items-start" >
                    <InputTag handleChange={handleChange} name="userName" labelTxt="Username" placeholder="threadway007" type="text" />
                    <InputTag handleChange={handleChange} name="password" labelTxt="Password" placeholder="*****" type="password" />

                    <button className="bg-gray-500 font-semibold text-black rounded-3xl py-2 w-full mx-auto self-center text-center sm:text-sm">{isLoading ? <Loading /> : "Login"}</button>
                </form>
                <div className="flex justify-center items-center text-xs gap-1 ">
                    <p className="text-gray-500">Don't have an account?</p>
                    <p onClick={() => router.push("/signup")} className="text-custom-blue-1 cursor-pointer">Sign up</p>
                </div>
            </div>
            <Footer />
            <Toaster />
        </main>
    )
};


interface InputInterface {
    name: string,
    labelTxt: string,
    placeholder: string,
    type: string,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputTag = (props: InputInterface) => {
    return <div>
        <label htmlFor={props.name} className="block mb-2 text-sm font-medium text-gray-500 sm:text-xs">{props.labelTxt}</label>
        <input onChange={(e) => props.handleChange(e)} type={props.type} name={props.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-xs" placeholder={props.placeholder} required />
    </div>
};

const Divider = () => {
    return <div className="h-px bg-gray-700 w-full"></div>
};
