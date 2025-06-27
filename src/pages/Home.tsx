import { JSX } from "solid-js/jsx-runtime";

export default function Home(): JSX.Element {
  return (
    <div class="flex flex-col justify-center items-center h-[100vh] w-[100vw] gap-8">
      <div>
        <h1 class="text-4xl font-bold">Welcome to Tic-Tac-Toe Game!</h1>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <a href="/create-room" class="btn btn-neutral">
          Create Room
        </a>
        <a class="btn btn-neutral">Join Room</a>
      </div>
    </div>
  );
}
