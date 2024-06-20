"use client";

import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface formInput {
    email: string,
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
};

export default function SignUp() {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<formInput>({
        email: "",
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSignUp = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const res = await axios.post("/api/user/auth/signup", formData);

            if (res.data.success) {
                setIsLoading(false);
                toast.success("Signed up successfully");
                router.push("/login");
            }
            else {
                setIsLoading(false);
                toast.error(res.data.error);
            }

        } catch (error: any) {
            setIsLoading(false);
            console.log("Sign-up failed: ", error);
            toast.error(error.response.data.error);
        }
    };

    return (
        <main className="min-h-screen flex flex-col ">
            <div className="w-[30%] flex flex-col items-center my-auto mx-auto justify-center py-4 px-10 select-none space-y-4 outline outline-1 outline-gray-700 rounded-lg">
                <img src={"/tweek.png"} alt="tweek logo" className="w-6 h-6 mb-4" />
                <p className="self-start font-semibold text-lg">Create your Tweek account</p>

                <form action="#" onSubmit={onSignUp} className="w-full space-y-5 justify-center items-start" >
                    <InputTag handleChange={handleChange} name="email" labelTxt="Email" placeholder="example@gmail.com" type="email" />
                    <InputTag handleChange={handleChange} name="firstName" labelTxt="First name" placeholder="Thread way" type="text" />
                    <InputTag handleChange={handleChange} name="lastName" labelTxt="Last name" placeholder="Thread way" type="text" />
                    <InputTag handleChange={handleChange} name="userName" labelTxt="Unique Username" placeholder="threadway007" type="text" />
                    <InputTag handleChange={handleChange} name="password" labelTxt="Create a password" placeholder="*****" type="password" />

                    <button type="submit" className="bg-gray-500 font-semibold text-black rounded-3xl py-2 w-full mx-auto self-center">Sign up</button>
                </form>
                <div className="flex justify-center items-center text-xs gap-1">
                    <p className="text-gray-500">Already a user?</p>
                    <p onClick={() => router.push("/login")} className="text-custom-blue-1">Login</p>
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
        <label htmlFor={props.name} className="block mb-2 text-sm font-medium text-gray-500 ">{props.labelTxt}</label>
        <input onChange={(e) => props.handleChange(e)} type={props.type} name={props.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={props.placeholder} required />
    </div>
};

