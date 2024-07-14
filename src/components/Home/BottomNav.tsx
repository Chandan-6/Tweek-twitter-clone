import { Home, Search, Bookmark, User } from 'lucide-react';
import { UserAtom } from '@/Store/atom/UserAtom';
import { useRecoilValue } from 'recoil';
import { usePathname, useRouter } from 'next/navigation';
import { RefObject } from 'react';

interface BottomNavProps {
    textareaRef: RefObject<HTMLTextAreaElement>;
}

export default function BottomNav(props: BottomNavProps) {
    // gets you current path name
    const pathname = usePathname();
    const router = useRouter();
    const { email } = useRecoilValue(UserAtom);

    const handleFocus = () => {
        if (props.textareaRef.current && pathname === "/home") {
            props.textareaRef.current.focus();
        }
        else{
            router.push('home')
        }
    };

    return (

        <div className="hidden tablet:block fixed z-50 w-full xs:w-[80%] h-12 mobile:h-9  max-w-lg -translate-x-1/2 bg-gray-500/50 backdrop-blur-md border border-gray-600 rounded-full bottom-4 left-1/2 ">
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto">

                <button onClick={() => router.push('home')} data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <Home className='text-white/70 size-5' />
                </button>

                <button onClick={() => router.push('explore')} data-tooltip-target="tooltip-wallet" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <Search className='text-white/70 size-5' />
                </button>

                <div className="flex items-center justify-center">
                    <button onClick={handleFocus} data-tooltip-target="tooltip-new" type="button" className="inline-flex items-center justify-center w-10 h-10 mobile:w-7 mobile:h-7 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                        <svg className="w-4 h-4 mobile:w-3 mobile:h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </button>
                </div>

                <button onClick={() => router.push('bookmarks')} data-tooltip-target="tooltip-settings" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <Bookmark className='text-white/70 size-5' />
                </button>

                <button onClick={() => router.push(`profile?auth_user=true&email=${email}`)} data-tooltip-target="tooltip-profile" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <User className='text-white/70 size-5' />
                </button>

            </div>
        </div>

    )
}