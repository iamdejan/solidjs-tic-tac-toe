import { JSX } from "solid-js/jsx-runtime";
import { createSignal, Match, Switch } from "solid-js";
import useUserID from "../hooks/useUserID";

export default function Home(): JSX.Element {
  const userId = useUserID((state) => state.userID);
  const setUserId = useUserID((state) => state.setUserID);
  const [inputtedUserId, setInputtedUserId] = createSignal<string>("");

  function handleUserId() {
    setUserId(inputtedUserId());
    return;
  }

  return (
    <div class="flex flex-col justify-center items-center h-[100vh] w-[100vw] gap-8">
      <Switch>
        <Match when={!userId()}>
          <div>
            <input
              type="text"
              class="input"
              placeholder="User ID. This is mandatory."
              value={inputtedUserId()}
              onChange={(e) => setInputtedUserId(e.target.value)}
            />
            <button
              type="button"
              class="btn btn-neutral"
              onClick={handleUserId}
            >
              Save User ID
            </button>
          </div>
        </Match>
        <Match when={userId()}>
          <div>
            <h1 class="text-4xl font-bold">Welcome to Tic-Tac-Toe Game!</h1>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <a href="/create-room" class="btn btn-neutral">
              Create Room
            </a>
            <a class="btn btn-neutral">Join Room</a>
          </div>
        </Match>
      </Switch>
    </div>
  );
}
