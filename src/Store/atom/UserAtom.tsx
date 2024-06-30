import { atom } from "recoil";

interface userInterface {
    email : string,
    userName : string,
    firstName : string,
    lastName : string,
    bio : string,
};

const initialUserState: userInterface = {
    email: "",
    userName: "",
    firstName: "",
    lastName: "",
    bio: ""
};


export const UserAtom = atom<userInterface>({
    key : "UserAtom",
    default : initialUserState
});
