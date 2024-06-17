import Footer from "@/components/Footer";
import GoogleBtn from "@/components/GooleBtn";

export default function Login() {
    return (
        <main className="min-h-screen flex flex-col ">
            <div className="w-[30%] flex flex-col items-center my-auto mx-auto justify-center py-4 px-10 select-none space-y-4 outline outline-1 outline-gray-700 rounded-lg">
                <img src={"/tweek.png"} alt="tweek logo" className="w-6 h-6 mb-4" />
                <p className="self-start font-semibold text-lg">Sign in to Tweek</p>
                <GoogleBtn />
                <div className="flex justify-center items-center">
                    <div className="h-px bg-gray-100 w-full" />
                    <p className="text-gray-300 text-sm">or</p>
                    <div className="h-px bg-gray-100 w-full" />
                </div>
                <form action="#" className="w-full space-y-5 justify-center items-start" >
                    <InputTag name="userName" labelTxt="Username" placeholder="threadway007" type="text" />
                    <InputTag name="password" labelTxt="Password" placeholder="*****" type="password" />

                    <button className="bg-gray-500 font-semibold text-black rounded-3xl py-2 w-full mx-auto self-center">Login</button>
                </form>
                <div className="flex justify-center items-center text-xs gap-1">
                    <p className="text-gray-500">Don't have an account?</p>
                    <p className="text-custom-blue-1">Sign up</p>
                </div>
            </div>
            <Footer />
        </main>
    )
};


interface InputInterface {
    name: string,
    labelTxt: string,
    placeholder: string,
    type: string,
}

const InputTag = (props: InputInterface) => {
    return <div>
        <label htmlFor={props.name} className="block mb-2 text-sm font-medium text-gray-500 ">{props.labelTxt}</label>
        <input type={props.type} id={props.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={props.placeholder} required />
    </div>
};

