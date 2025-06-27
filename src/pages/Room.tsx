import { createSignal, Show } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

export default function CreateRoom(): JSX.Element {
  const [roomID] = createSignal<string | undefined>(undefined);

  return (
    <div class="flex flex-col justify-center items-center h-[100vh] w-[100vw] gap-8">
      <Show when={roomID()}>
        <h2 class="text-2xl">Room {roomID()}</h2>
        <p>
          Waiting for other player... <span class="loading loading-spinner" />
        </p>
      </Show>
      <Show when={!roomID()}>
        <p>
          Creating Room... <span class="loading loading-spinner" />
        </p>
      </Show>
    </div>
  );
}
