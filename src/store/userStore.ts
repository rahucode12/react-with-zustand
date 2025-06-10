import { create } from "zustand";

type User = {
    name: string;
    age: string;
};

type UserStore = {
    user: User;
    setName: (name: string) => void;
    setAge: (age: string) => void;
    reset: () => void;
};

export const userStore = create<UserStore>((set) => ({
    user: { name: "", age: "" },
    setName: (name) =>
        set((state) => ({ user: { ...state.user, name } })),
    setAge: (age) =>
        set((state) => ({ user: { ...state.user, age } })),
    reset: () => set(() => ({ user: { name: "", age: "" } })),
}));

