import { JSX } from "solid-js/jsx-runtime";
import useRoomID from "../hooks/useRoomID";
import { useWebSocket } from "solidjs-use";
import { createEffect, createSignal } from "solid-js";
import WebSocketResponse from "../types/CreateRoomResponse";
import useUserID from "../hooks/useUserID";
import useCharacter from "../hooks/useCharacter";
import WSMessage from "../types/WSMessage";

export default function WaitingRoom(): JSX.Element {
  const roomID = useRoomID((state) => state.roomID);
  const userID = useUserID((state) => state.userID);
  const setCharacter = useCharacter((state) => state.setCharacter);
  const { status, send, data } = useWebSocket<string>(
    "wss://localhost:8080/ws",
  );
  const [hasSendRequest, setHasSendRequest] = createSignal<boolean>(false);

  createEffect(() => {
    if (status() == "OPEN" && roomID() && userID() && !hasSendRequest()) {
      const message: WSMessage = {
        command: "join",
        params: {
          room_id: roomID(),
          user_id: userID(),
        },
      };
      send(JSON.stringify(message));
      setHasSendRequest(true);
    }
  });

  createEffect(() => {
    if (status() != "OPEN") {
      return;
    }

    const latestEvent = data();
    if (!latestEvent) {
      return;
    }

    const parsedResponse: WebSocketResponse = JSON.parse(latestEvent);
    if (parsedResponse.room_id != roomID()) {
      return;
    }

    switch (parsedResponse.event) {
      case "ROOM_JOINED":
        if (parsedResponse.user_id != userID()) {
          break;
        }

        setCharacter(parsedResponse.character);
        break;
      case "GAME_STARTED":
        break;
      default:
        break;
    }
  });

  return (
    <div class="flex flex-col justify-center items-center h-[100vh] w-[100vw] gap-8">
      <h2 class="text-2xl">Room {roomID()}</h2>
      <p>
        Waiting for other player... <span class="loading loading-spinner" />
      </p>
    </div>
  );
}
