"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import PopupLayout from "../PopupLayout";
import { X, SendHorizontal } from "lucide-react";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { UserAtom } from "@/Store/atom/UserAtom";
import axios from "axios";

interface propsInterface {
    onClose: () => void,
}

export default function EditProfile(props: propsInterface) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        bio: '',
    });

    const { userName, firstName, lastName, bio } = useRecoilValue(UserAtom);
    const setUserAtom = useSetRecoilState(UserAtom);

    useEffect(() => {
        setFormData(prev => ({ ...prev, userName, firstName, lastName, bio }));
    }, []);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {

            setIsLoading(true);
            const res = await axios.post("/api/user/updateUser", formData);
            
            if (res.data.success) {
                setUserAtom(prev => ({ ...prev, userName: res.data.userName, firstName: res.data.firstName || '', lastName: res.data.lastName || '', bio: res.data.bio || '' }));
                toast.success("New data saved");
                
                setIsLoading(false);
                // closing the popup
                props.onClose();
            }
            
        } catch (error: any) {
            setIsLoading(false);
            console.error("Error in saving new user data: ", error);
            toast.error(error.response?.data?.error || "Internal Server Error here");
        }
    }

    return (
        <div>

            <PopupLayout onClose={props.onClose}>
                <div className="mt-10  flex flex-col gap-5 text-white">
                    <button onClick={props.onClose} className="place-self-end">
                        <X size={30} />
                    </button>
                    <div className="w-[500px] min-h-72 py-6 px-4 flex flex-col items-center bg-black/80 rounded-xl space-y-5 shadow-lg shadow-gray-800">
                        <div className={`w-full border-b border-gray-700 rounded-t-2xl`}>
                            <div className={`flex flex-col space-y-3 items-center py-6  rounded-t-2xl`}>
                                <p className=" text-2xl font-medium text-white ">Edit your profile</p>
                            </div>
                        </div>
                        <form onSubmit={onSubmit} className="w-full space-y-5 flex flex-col items-center">

                            <label className="text-left " htmlFor="firstName">First Name</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="firstName"
                                required
                                value={formData.firstName}
                                className=" w-[70%] rounded-md shadow-lg p-2 text-black no-arrows border bg-gray-100/25 border-gray-300 outline-1 outline-gray-300"
                            />

                            <label className="text-left " htmlFor="lastName">Last name</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="lastName"
                                required
                                value={formData.lastName}
                                className=" w-[70%] rounded-md shadow-lg p-2 text-black no-arrows border bg-gray-100/25 border-gray-300 outline-1 outline-gray-300"
                            />

                            <label className="text-left " htmlFor="userName">User Name</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="userName"
                                required
                                value={formData.userName}
                                className=" w-[70%] rounded-md shadow-lg p-2 text-black no-arrows border bg-gray-100/25 border-gray-300 outline-1 outline-gray-300"
                            />
                            <label className="text-left " htmlFor="bio">Bio</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="bio"
                                required
                                value={formData.bio}
                                className=" w-[70%] rounded-md shadow-lg p-2 text-black no-arrows border bg-gray-100/25 border-gray-300 outline-1 outline-gray-300"
                            />

                            <button type="submit"
                                className="flex justify-center items-center gap-3 bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-700 hover:focus:ring-1 ring-slate-800 active shadow-sm shadow-slate-800"
                            >
                                {isLoading ? <Loading /> : <><SendHorizontal /><span>Save</span></>}
                                
                            </button>
                        </form>
                    </div>
                </div>
            </PopupLayout>
        </div>
    )
}