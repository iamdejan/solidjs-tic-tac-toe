type Event =
  | "ROOM_CREATED"
  | "ROOM_JOINED"
  | "ROOM_LEFT"
  | "GAME_STARTED"
  | "MOVE_REGISTERED"
  | "GAME_FINISHED";

type Character = "x" | "o";

type WebSocketResponse = {
  room_id: string;
  user_id: string;
  event: Event;
  character?: Character;
  board_after_move?: string[][];
  error?: string;
};
export default WebSocketResponse;
