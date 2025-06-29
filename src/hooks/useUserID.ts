import { createWithSignal } from "solid-zustand";

type UserIDState = {
  userID: string;
  // eslint-disable-next-line no-unused-vars
  setUserID: (userID: string) => void;
};

const localStorageKey = "user_id";

const useUserID = createWithSignal<UserIDState>((set) => ({
  userID: localStorage.getItem(localStorageKey) ?? "",
  setUserID: (userID: string) =>
    set(() => {
      localStorage.setItem(localStorageKey, userID);
      return {
        userID: userID,
      };
    }),
}));
export default useUserID;
