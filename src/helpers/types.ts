
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
    date: string;
    tweekUser: TweekUser;
}