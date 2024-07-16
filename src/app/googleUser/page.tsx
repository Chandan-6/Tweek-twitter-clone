'use client';

import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserAtom } from "@/Store/atom/UserAtom";
import { useSetRecoilState } from "recoil";

export default function GoogleUser() {
    const { data: session } = useSession();
    const router = useRouter();
    const setUserAtom = useSetRecoilState(UserAtom);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (session && session.user) {
            setIsAuthenticated(true);
            const signInOauth = async () => {
                try {
                    const loadingToast = toast.loading("Signing you in...");
                    const response = await axios.post("/api/user/auth/google",
                        {
                            name: session.user?.name,
                            password: session.user?.email,
                            email: session.user?.email,
                        }
                    );

                    if (response.data.success) {
                        toast.dismiss(loadingToast);
                        toast.success("Login successful");
                        setUserAtom((prev) => ({
                            ...prev,
                            email: response.data.email,
                            userName: response.data.userName,
                            firstName: response.data.firstName,
                            lastName: response.data.lastName,
                            bio: response.data.bio
                        }));
                        router.push("/home");
                    }
                } catch (error: any) {
                    console.log("Error in signing in the google auth user 👤", error);
                    toast.error(error.response.data.error);
                }
            };

            signInOauth();
        }
    }, [session, router, setUserAtom]);

    if (isAuthenticated) {
        return (
            <div className="flex justify-center items-center w-full h-screen">
                <p className="">You are an Authenticated user. <span className="text-blue-500 text-xl">Please wait...</span></p>
                <Toaster />
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <span className="text-blue-500 text-xl">You are not an Authenticated user. So Click here 👉 <button onClick={() => router.push("/login")} className="px-5 py-2 rounded-2xl bg-blue-500 text-white text-sm">Login</button></span>
        </div>
    );
}