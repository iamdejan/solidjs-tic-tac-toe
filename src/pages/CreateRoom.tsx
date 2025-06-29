import { createEffect, createSignal, Match, onCleanup, Switch } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { useWebSocket } from "solidjs-use";
import WSMessage from "../types/WSMessage";
import useUserID from "../hooks/useUserID";
import CreateRoomResponse from "../types/CreateRoomResponse";

export default function CreateRoom(): JSX.Element {
  const userID = useUserID((state) => state.userID);
  const { send, status, ws } = useWebSocket("wss://localhost:8080/ws");
  const [roomID, setRoomID] = createSignal<string | undefined>(undefined);
  const [hasSendRequest, setHasSendRequest] = createSignal<boolean>(false);

  createEffect(() => {
    if (status() == "OPEN" && !hasSendRequest()) {
      const message: WSMessage = {
        command: "create",
        params: {
          user_id: userID()!,
        },
      };
      send(JSON.stringify(message));
      setHasSendRequest(true);
    }
  });

  function handleRoomID(ev: MessageEvent<string>): void {
    const data = ev.data as string;
    const createRoomResponse: CreateRoomResponse = JSON.parse(data);
    if (createRoomResponse.user_id != userID()) {
      return;
    }
    setRoomID(createRoomResponse.room_id);
  }

  createEffect(() => {
    if (roomID()) {
      return;
    }

    ws()?.addEventListener("message", handleRoomID);
  });

  onCleanup(() => {
    ws()?.removeEventListener("message", handleRoomID);
  });

  return (
    <div class="flex flex-col justify-center items-center h-[100vh] w-[100vw] gap-8">
      <Switch>
        <Match when={roomID()}>
          <h2 class="text-2xl">Room {roomID()}</h2>
          <p>
            Waiting for other player... <span class="loading loading-spinner" />
          </p>
        </Match>
        <Match when={!roomID()}>
          <p>
            Creating Room... <span class="loading loading-spinner" />
          </p>
        </Match>
      </Switch>
    </div>
  );
}
