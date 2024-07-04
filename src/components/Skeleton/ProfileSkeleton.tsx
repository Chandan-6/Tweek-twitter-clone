export  function ProfileSkeleton() {
    return (
        <div role="status" className="w-full p-4 shadow animate-pulse md:p-6 dark:border-gray-700">

            <div className="flex items-center my-4">
                <div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                    <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[70%] mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-[85%]"></div>
            <span className="sr-only">Loading...</span>
        </div>
    )
};

export const SingleSkeleton = () => {
    return (
        <div role="status" className="w-full p-4 shadow animate-pulse md:p-6 dark:border-gray-700">
            <div className="flex items-center my-4">
                <div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}