import { createWithSignal } from "solid-zustand";

type RoomIDState = {
  roomID: string;
  // eslint-disable-next-line no-unused-vars
  setRoomID: (roomID: string) => void;
};

const useRoomID = createWithSignal<RoomIDState>((set) => ({
  roomID: "",
  setRoomID: (roomID: string) =>
    set(() => {
      return {
        roomID: roomID,
      };
    }),
}));
export default useRoomID;
