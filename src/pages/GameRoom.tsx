import { JSX } from "solid-js/jsx-runtime";
import useRoomID from "../hooks/useRoomID";

export default function GameRoom(): JSX.Element {
  const roomID = useRoomID((state) => state.roomID);

  return (
    <div class="flex flex-col justify-center items-center h-[100vh] w-[100vw] gap-8">
      <h2 class="text-2xl">Room {roomID()}</h2>
      Soon to be game room.
    </div>
  );
}
