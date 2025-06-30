import { JSX } from "solid-js/jsx-runtime";
import { createSignal, Match, Switch } from "solid-js";
import useUserID from "../hooks/useUserID";

export default function Home(): JSX.Element {
  const userID = useUserID((state) => state.userID);
  const setUserID = useUserID((state) => state.setUserID);
  const unsetUserID = useUserID((state) => state.unsetUserID);
  const [inputtedUserID, setInputtedUserID] = createSignal<string>("");

  function handleInputtedUserID(
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    },
  ) {
    e.preventDefault();
    e.target.value = e.target.value.trim();
    e.target.value = e.target.value.replace(/\s/g, "");
    setInputtedUserID(e.target.value);
  }

  function handleUserID() {
    if (inputtedUserID() && inputtedUserID().length > 0) {
      setUserID(inputtedUserID());
      setInputtedUserID("");
    }
  }

  return (
    <div class="flex flex-col justify-center items-center h-[100vh] w-[100vw] gap-8">
      <Switch>
        <Match when={!userID()}>
          <div class="flex justify-center items-center">
            <input
              type="text"
              class="input"
              size={50}
              placeholder="User ID. This is mandatory."
              value={inputtedUserID()}
              onInput={(e) => handleInputtedUserID(e)}
            />
          </div>
          <div>
            <button
              type="button"
              class="btn btn-neutral"
              onClick={handleUserID}
            >
              Save User ID
            </button>
          </div>
        </Match>
        <Match when={userID()}>
          <div>
            <h1 class="text-4xl font-bold">Welcome to Tic-Tac-Toe Game!</h1>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <button type="button" class="btn btn-neutral" onClick={unsetUserID}>
              Reset User ID
            </button>
            <a href="/create-room" class="btn btn-neutral">
              Create Room
            </a>
            <a href="/join-room" class="btn btn-neutral">
              Join Room
            </a>
          </div>
        </Match>
      </Switch>
    </div>
  );
}
