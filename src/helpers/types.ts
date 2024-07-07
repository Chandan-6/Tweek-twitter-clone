
//  Type of a tweek / post
export interface TweekUser {
    email? : string,
    firstName: string;
    lastName: string;
    userName: string;
    bio? : string,
}

export interface TweekItem {
    id: string;
    content: string;
    likes : Array<{ id: number; liker: string; tweekID: string }>;
    date: string;
    tweekUser: TweekUser;
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
};