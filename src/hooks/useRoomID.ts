import { createWithSignal } from "solid-zustand";

type RoomIDState = {
  roomID: string;
  // eslint-disable-next-line no-unused-vars
  setRoomID: (roomID: string) => void;
};

const localStorageKey = "room_id";

const useRoomID = createWithSignal<RoomIDState>((set) => ({
  roomID: localStorage.getItem(localStorageKey) ?? "",
  setRoomID: (roomID: string) =>
    set(() => {
      localStorage.setItem(localStorageKey, roomID);
      return {
        roomID: roomID,
      };
    }),
}));
export default useRoomID;
