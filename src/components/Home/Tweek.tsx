import { formatDate } from "@/lib/formatDate"
import { TweekInterface } from "@/helpers/types";

import { MessageCircle, Heart, Bookmark  } from 'lucide-react';
import { useState, useEffect } from "react";
import axios from "axios";

export default function Tweek(props: TweekInterface) {

    const [liked, setLiked] = useState<boolean>(false);
    const [bookmark, setBookmark] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(props.likes?.length);

    useEffect(() => {
            
        // Determine if the current user has liked the post
        if(props.likes?.length != null){
            const userHasLiked = props.likes.some((like) => like.liker === props.CurrentUserEmail);
            setLiked(userHasLiked);
        }

        // checks if the tweek is bookmarked by the user or not.
        if(props.bookmarkedUserEmail === props.CurrentUserEmail) { setBookmark(true) };

  }, [props.likes, props.CurrentUserEmail]);

    const toggleLike = async () => {
        try {
            const res = await axios.put("/api/user/like", {tweekID : props.id})

            if(res.data.success){
                setLiked(!liked);
                setLikeCount(liked ? likeCount - 1 : likeCount + 1);
            }
        } catch (error) {
            console.log("Error with liking of post/tweek", error);
        }
    };

    const toggleBookMark = async () => {
        try {
            const res = await axios.post("/api/user/bookmarks", {tweekID : props.id})

            if(res.data.success) {
                setBookmark(!bookmark);
            }
        } catch (error) {
            console.log("Error with book-marking of post/tweek", error);
        }
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-start p-4">
                <div className='flex justify-center items-center gap-2 '>
                    <img src={"/user.png"} alt="user" className='rounded-full w-9 h-9 md:w-7 md:h-7' />
                    <div className="flex justify-center items-center gap-2 lg:overflow-hidden mobile:gap-1">
                        <p className='font-semibold text-sm lg:text-xs lg:tracking-wide'>{props.lastName}{' '}{props.firstName}</p>
                        <p className='text-gray-600 text-sm lg:text-xs w-[70%] overflow-hidden'>@{props.userName}</p>
                        <p className='text-gray-600 text-sm'>.</p>
                        <p className='text-gray-600 text-sm  lg:text-xs'>{props.date && formatDate(props.date)}</p>
                    </div>
                </div>
                <p className="text-sm mobile:text-xs text-white/70 pl-11 md:pl-9 mobile:mt-2">{props.content}</p>
            </div>
            <div className="flex justify-between items-center mx-6 mb-3 text-gray-600 cursor-pointer">
                <MessageCircle size={15} />

                {/* like logic ( api call | toggle ) */}
                <div onClick={toggleLike} className="flex justify-center items-center space-x-2">
                    {liked ? 
                        <img
                            onClick={() => setLiked(!liked)} 
                            src={"/like.png"} alt="liked red heart"
                            className="w-[15px] h-[15px]"/> : <Heart onClick={() => setLiked(!liked)} size={15} /> 
                    }                   
                    {
                        likeCount > 0 && <p className="text-gray-700 text-sm">{likeCount}</p>
                    }
                </div>

                <div onClick={toggleBookMark}>
                    {
                        bookmark ? <img onClick={() => setBookmark(!bookmark)} src={"/bookmark.png"} alt="blue bookmark icon"/> : <Bookmark size={15} />
                    }
                </div>
                
            </div>
        </div>
    )
};