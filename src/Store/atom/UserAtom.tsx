import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist({key : 'tweek-app'})

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
    default : initialUserState,
    effects_UNSTABLE : [persistAtom]
});
