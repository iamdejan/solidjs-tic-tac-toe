import { createEffect, createSignal, Show } from "solid-js";
import { JSX } from "solid-js";
import { useWebSocket } from "solidjs-use";
import WebSocketMessage from "../types/WebSocketMessage";
import useUserID from "../hooks/useUserID";
import WebSocketEvent from "../types/WebSocketEvent";
import { useNavigate } from "@solidjs/router";
import useRoomID from "../hooks/useRoomID";
import useLatestEvent from "../hooks/useLatestEvent";

export default function CreateRoom(): JSX.Element {
  const userID = useUserID((state) => state.userID);

  const roomID = useRoomID((state) => state.roomID);
  const setRoomID = useRoomID((state) => state.setRoomID);

  const { send, status, data } = useWebSocket<string>(
    "wss://localhost:8080/ws",
  );
  const latestEvent = useLatestEvent((state) => state.latestEvent);
  const setLatestEvent = useLatestEvent((state) => state.setLatestEvent);
  const [hasSendRequest, setHasSendRequest] = createSignal<boolean>(false);
  const navigate = useNavigate();

  createEffect(() => {
    if (status() === "OPEN" && userID() && !hasSendRequest()) {
      const message: WebSocketMessage = {
        command: "create",
        params: {
          user_id: userID()!,
        },
      };
      send(JSON.stringify(message));
      setHasSendRequest(true);
    }
  });

  createEffect(() => {
    if (!userID()) {
      return;
    }

    if (roomID()) {
      return;
    }

    const latestEvent = data();
    if (!latestEvent) {
      return;
    }

    const parsedEvent: WebSocketEvent = JSON.parse(latestEvent);
    setLatestEvent(parsedEvent);
  });

  createEffect(() => {
    if (!latestEvent()) {
      return;
    }

    if (latestEvent()!.user_id !== userID()) {
      return;
    }

    switch (latestEvent()!.event) {
      case "ROOM_CREATED":
        setRoomID(latestEvent()!.room_id);
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
