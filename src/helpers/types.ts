
//  Type of a tweek / post
export interface TweekUser {
    email? : string,
    firstName: string;
    lastName: string;
    userName: string;
    bio? : string,
    userProfile? : string
}

export interface TweekItem {
    userId: string;
    id: string;
    content: string;
    likes : Array<{ id: number; liker: string; tweekID: string }>;
    date: string;
    tweekUser: TweekUser;
    bookmarks: any;
    tweek?: any;
}


export interface TweekInterface {
    id :  string,
    firstName : string,
    lastName : string,
    userName : string,
    date : string,
    content : string,
    likes : Array<{ id: number; liker: string; tweekID: string }>
    CurrentUserEmail : string
    bookmarkedUserEmail : string,
    userProfile? : string
};