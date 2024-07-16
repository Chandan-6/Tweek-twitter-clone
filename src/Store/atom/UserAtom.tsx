import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist({key : 'tweek-app'})

interface userInterface {
    email : string,
    userName : string,
    firstName : string,
    lastName : string,
    bio : string,
    userProfile : string,
};

const initialUserState: userInterface = {
    email: "",
    userName: "",
    firstName: "",
    lastName: "",
    bio: "",
    userProfile : '"'
};


export const UserAtom = atom<userInterface>({
    key : "UserAtom",
    default : initialUserState,
    effects_UNSTABLE : [persistAtom]
});
