import { JSX } from "solid-js";

export default function Home(): JSX.Element {
  return (
    <>
      <div class="flex flex-col justify-center items-center h-[100vh] w-[100vw] gap-8">
        <div>
          <h1 class="text-3xl font-bold">Welcome to Tic-Tac-Toe Game!</h1>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <button class="btn btn-neutral">Create Room</button>
          <button class="btn btn-neutral">Join Room</button>
        </div>
      </div>
    </>
  );
}
