"use client";
import GoogleBtn from "@/components/GooleBtn";
import BlueBtn from "@/components/BlueBtn";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="min-h-screen flex flex-col ">
      <div className="flex xs:flex-col items-center my-auto justify-around xs:justify-center p-24 select-none xs:space-y-10">
        <div className="w-[50%] flex justify-center items-center mx-auto">
          <img src={"/tweek.png"} alt="tweek logo" className="w-[50%]" />
        </div>
        <div className="w-[50%] xs:w-10/12 flex justify-center items-center mx-auto">
          <div className=" w-fit flex flex-col space-y-6 mobile:space-y-4 justify-center items-center">
            <div className="flex flex-col space-y-2 justify-center items-start w-full">
              <p className="font-bold self-start text-lg">Join today.</p>
              <GoogleBtn />
            </div>

            <div className="flex justify-center items-center">
              <div className="h-px bg-gray-100 w-full" />
              <p className="text-gray-300 text-sm">or</p>
              <div className="h-px bg-gray-100 w-full" />
            </div>

            <BlueBtn name={"Create account"} />

            <div className="flex flex-col space-y-3 justify-center items-start w-full">
              <p className="font-semibold text-sm sm:text-xs">Already have an account?</p>
              <div onClick={() => router.push("/login")} className="w-full py-2 text-custom-blue-1 rounded-3xl text-center outline outline-1 outline-gray-500 text-sm transition-all duration-500 hover:scale-105 cursor-pointer">Login</div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </main>
  );
}
