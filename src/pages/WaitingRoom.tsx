import { JSX } from "solid-js";
import useRoomID from "../hooks/useRoomID";
import { useWebSocket } from "solidjs-use";
import { createEffect, createSignal, Show } from "solid-js";
import WebSocketEvent from "../types/WebSocketEvent";
import useUserID from "../hooks/useUserID";
import useCharacter from "../hooks/useCharacter";
import WebSocketMessage from "../types/WebSocketMessage";
import { useNavigate } from "@solidjs/router";
import CopyToClipboardButton from "../components/CopyToClipboardButton";
import useLatestEvent from "../hooks/useLatestEvent";

export default function WaitingRoom(): JSX.Element {
  const userID = useUserID((state) => state.userID);

  const roomID = useRoomID((state) => state.roomID);
  const unsetRoomID = useRoomID((state) => state.unsetRoomID);

  const setCharacter = useCharacter((state) => state.setCharacter);

  const { status, send, data } = useWebSocket<string>(
    "wss://localhost:8080/ws",
  );
  const latestEvent = useLatestEvent((state) => state.latestEvent);
  const setLatestEvent = useLatestEvent((state) => state.setLatestEvent);

  const [hasSendRequest, setHasSendRequest] = createSignal<boolean>(false);
  const navigate = useNavigate();

  createEffect(() => {
    if (status() === "OPEN" && roomID() && userID() && !hasSendRequest()) {
      const message: WebSocketMessage = {
        command: "join",
        params: {
          room_id: roomID()!,
          user_id: userID()!,
        },
      };
      send(JSON.stringify(message));
      setHasSendRequest(true);
    }
  });

  createEffect(() => {
    if (status() !== "OPEN") {
      return;
    }

    const latestEvent = data();
    if (!latestEvent) {
      return;
    }

    const parsedResponse: WebSocketEvent = JSON.parse(latestEvent);
    setLatestEvent(parsedResponse);
  });

  createEffect(() => {
    if (!latestEvent()) {
      return;
    }

    if (latestEvent()!.room_id !== roomID()) {
      return;
    }

    if (latestEvent()!.error) {
      alert("Error: " + latestEvent()!.error);
      unsetRoomID();
      throw navigate("/");
    }

    switch (latestEvent()!.event) {
      case "ROOM_JOINED":
        if (latestEvent()!.user_id !== userID()) {
          break;
        }

        setCharacter(latestEvent()!.character!);
        break;
      case "ROOM_LEFT":
        navigate("/");
        break;
      case "GAME_STARTED":
        navigate("/game-room");
        break;
      default:
        break;
    }
  });

  const [isLeaveInProcess, setIsLeaveInProcess] = createSignal<boolean>(false);

  function leaveRoom() {
    if (!roomID() || !userID()) {
      return;
    }

    const message: WebSocketMessage = {
      command: "leave",
      params: {
        room_id: roomID()!,
        user_id: userID()!,
      },
    };
    send(JSON.stringify(message));
    setIsLeaveInProcess(true);
  }

  return (
    <div class="flex flex-col justify-center items-center h-[100vh] w-[100vw] gap-8">
      <Show
        when={roomID()}
        fallback={
          <>
            <p>You haven't inputted room ID</p>
            <a class="link" href="/">
              Go back to home page
            </a>
          </>
        }
      >
        <h2 class="text-2xl">Room {roomID()!}</h2>
        <div>
          <CopyToClipboardButton value={() => roomID()!} text="Copy Room ID" />
        </div>
        <p>
          Waiting for other player... <span class="loading loading-spinner" />
        </p>
        <button
          type="button"
          class="btn"
          onClick={leaveRoom}
          disabled={isLeaveInProcess()}
        >
          Leave
          <Show when={isLeaveInProcess()}>
            <span class="loading loading-spinner" />
          </Show>
        </button>
      </Show>
    </div>
  );
}
