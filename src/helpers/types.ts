
//  Type of a tweek / post
export interface TweekUser {
    firstName: string;
    lastName: string;
    userName: string;
}

export interface TweekItem {
    id: string;
    content: string;
    date: string;
    tweekUser: TweekUser;
}