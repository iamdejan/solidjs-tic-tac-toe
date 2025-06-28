import { useAtom } from "solid-jotai";
import { createSignal, Match, onMount, Switch } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { webSocketAtom } from "../state/webSocketAtom";
import WSMessage from "../types/WSMessage";

export default function CreateRoom(): JSX.Element {
  const [roomID] = createSignal<string | undefined>(undefined);
  const [globalWebSocket] = useAtom(webSocketAtom);
  onMount(() => {
    const message: WSMessage = {
      command: "create",
    };
    globalWebSocket()?.send(JSON.stringify(message));
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
