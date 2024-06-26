import { atom } from "recoil";

export const UserAtom = atom({
    key : "UserAtom",
    default : {
        email : "",
        userName : "",
        firstName : "",
        lastName : "",
        bio : ""
    }
});
