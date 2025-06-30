import { JSX } from "solid-js/jsx-runtime";
import useRoomID from "../hooks/useRoomID";
import CellButton from "../components/CellButton";
import { useWebSocket } from "solidjs-use";
import { createEffect, Index } from "solid-js";
import WebSocketEvent from "../types/WebSocketEvent";
import WebSocketMessage from "../types/WebSocketMessage";
import useUserID from "../hooks/useUserID";
import useBoard from "../hooks/useBoard";
import useLatestEvent from "../hooks/useLatestEvent";
import useCharacter from "../hooks/useCharacter";
import { useNavigate } from "@solidjs/router";

export default function GameRoom(): JSX.Element {
  const userID = useUserID((state) => state.userID);

  const roomID = useRoomID((state) => state.roomID);
  const unsetRoomID = useRoomID((state) => state.unsetRoomID);

  const unsetCharacter = useCharacter((state) => state.unsetCharacter);

  const board = useBoard((state) => state.board);
  const setBoard = useBoard((state) => state.setBoard);
  const clearBoard = useBoard((state) => state.clear);

  const { status, send, data } = useWebSocket<string>(
    "wss://localhost:8080/ws",
  );
  const latestEvent = useLatestEvent((state) => state.latestEvent);
  const setLatestEvent = useLatestEvent((state) => state.setLatestEvent);
  const clearLatestEvent = useLatestEvent((state) => state.clear);
  const navigate = useNavigate();

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

    if (latestEvent()!.event === "GAME_FINISHED") {
      if (latestEvent()!.winner_user_id! === userID()) {
        alert("Congratulations! You win!");
      } else {
        alert("Oops! You lose!");
      }

      unsetRoomID();
      unsetCharacter();
      clearBoard();
      clearLatestEvent();
      navigate("/");
    }

    // ignore victory for now
    if (latestEvent()!.event !== "MOVE_REGISTERED") {
      return;
    }

    setBoard(latestEvent()!.board_after_move!);
  });

  function handleCellButtonClick(row: number, column: number) {
    const message: WebSocketMessage = {
      command: "move",
      params: {
        room_id: roomID()!,
        user_id: userID()!,
        row: row.toString(),
        column: column.toString(),
      },
    };
    send(JSON.stringify(message));
  }

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
                  onClick={handleCellButtonClick}
                />
              )}
            </Index>
          )}
        </Index>
      </div>
    </div>
  );
}
