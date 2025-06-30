import { JSX } from "solid-js/jsx-runtime";
import useRoomID from "../hooks/useRoomID";
import CellButton from "../components/CellButton";
import { useWebSocket } from "solidjs-use";
import { createEffect, createSignal, Index } from "solid-js";
import WebSocketResponse from "../types/CreateRoomResponse";

export default function GameRoom(): JSX.Element {
  const roomID = useRoomID((state) => state.roomID);

  const [board, setBoard] = createSignal<Array<Array<string>>>([]);

  const { status, data } = useWebSocket<string>("wss://localhost:8080/ws");

  createEffect(() => {
    if (status() !== "OPEN") {
      return;
    }

    const latestEvent = data();
    if (!latestEvent) {
      return;
    }

    const parsedResponse: WebSocketResponse = JSON.parse(latestEvent);

    if (parsedResponse.room_id !== roomID()) {
      return;
    }

    // ignore victory for now
    if (parsedResponse.event !== "MOVE_REGISTERED") {
      return;
    }

    setBoard(parsedResponse.board_after_move!);
  });

  return (
    <div class="flex flex-col justify-center items-center h-[100vh] w-[100vw] gap-8">
      <h2 class="text-2xl">Room {roomID()}</h2>
      <div class="grid grid-cols-3 grid-rows-3">
        <Index each={board()}>
          {(_, row) => (
            <Index each={board()[row]}>
              {(_, column) => (
                <CellButton
                  row={row}
                  column={column}
                  character={board()[row][column]}
                />
              )}
            </Index>
          )}
        </Index>
      </div>
    </div>
  );
}
