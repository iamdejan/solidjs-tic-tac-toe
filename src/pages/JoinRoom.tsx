import { JSX } from "solid-js/jsx-runtime";
import useRoomID from "../hooks/useRoomID";
import useUserID from "../hooks/useUserID";
import { createEffect, createSignal, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";

export default function JoinRoom(): JSX.Element {
  const userID = useUserID((state) => state.userID);

  const roomID = useRoomID((state) => state.roomID);
  const setRoomID = useRoomID((state) => state.setRoomID);

  const [inputtedRoomID, setInputtedRoomID] = createSignal<string>("");

  function handleRoomID() {
    setRoomID(inputtedRoomID());
    return;
  }

  const navigate = useNavigate();

  createEffect(() => {
    if (userID() && roomID()) {
      navigate("/waiting-room");
    }
  });

  return (
    <div class="flex flex-col justify-center items-center h-[100vh] w-[100vw] gap-8">
      <Show when={!roomID()}>
        <div class="flex justify-center items-center">
          <input
            type="text"
            class="input"
            size={50}
            placeholder="Room ID. This is mandatory."
            value={inputtedRoomID()}
            onChange={(e) => setInputtedRoomID(e.target.value)}
          />
        </div>
        <div>
          <button type="button" class="btn btn-neutral" onClick={handleRoomID}>
            Save Room ID
          </button>
        </div>
      </Show>
    </div>
  );
}
