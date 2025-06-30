import { createWithSignal } from "solid-zustand";

type RoomIDState = {
  roomID?: string;
  // eslint-disable-next-line no-unused-vars
  setRoomID: (roomID: string) => void;
  unsetRoomID: () => void;
};

const localStorageKey = "room_id";

const useRoomID = createWithSignal<RoomIDState>((set) => ({
  roomID: localStorage.getItem(localStorageKey) || undefined,
  setRoomID: (roomID: string) =>
    set(() => {
      localStorage.setItem(localStorageKey, roomID);
      return {
        roomID: roomID,
      };
    }),
  unsetRoomID: () =>
    set(() => {
      localStorage.removeItem(localStorageKey);
      return {
        roomID: undefined,
      };
    }),
}));
export default useRoomID;
