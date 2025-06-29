import { createEffect, createSignal, Show } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { useWebSocket } from "solidjs-use";
import WSMessage from "../types/WSMessage";
import useUserID from "../hooks/useUserID";
import WebSocketResponse from "../types/CreateRoomResponse";
import { useNavigate } from "@solidjs/router";
import useRoomID from "../hooks/useRoomID";

export default function CreateRoom(): JSX.Element {
  const userID = useUserID((state) => state.userID);

  const roomID = useRoomID((state) => state.roomID);
  const setRoomID = useRoomID((state) => state.setRoomID);

  const { send, status, data } = useWebSocket<string>(
    "wss://localhost:8080/ws",
  );
  const [hasSendRequest, setHasSendRequest] = createSignal<boolean>(false);
  const navigate = useNavigate();

  createEffect(() => {
    if (status() == "OPEN" && userID() && !hasSendRequest()) {
      const message: WSMessage = {
        command: "create",
        params: {
          user_id: userID(),
        },
      };
      send(JSON.stringify(message));
      setHasSendRequest(true);
    }
  });

  createEffect(() => {
    if (roomID()) {
      return;
    }

    const latestEvent = data();
    if (!latestEvent) {
      return;
    }

    const parsedResponse: WebSocketResponse = JSON.parse(latestEvent);
    if (parsedResponse.user_id != userID()) {
      return;
    }

    switch (parsedResponse.event) {
      case "ROOM_CREATED":
        setRoomID(parsedResponse.room_id);
        navigate("/waiting-room");
        break;
      default:
        break;
    }
  });

  return (
    <div class="flex flex-col justify-center items-center h-[100vh] w-[100vw] gap-8">
      <Show when={!roomID()}>
        <p>
          Creating Room... <span class="loading loading-spinner" />
        </p>
      </Show>
    </div>
  );
}
