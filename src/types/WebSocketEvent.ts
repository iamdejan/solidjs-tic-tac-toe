type EventType =
  | "ROOM_CREATED"
  | "ROOM_JOINED"
  | "ROOM_LEFT"
  | "GAME_STARTED"
  | "MOVE_REGISTERED"
  | "GAME_FINISHED";

type Character = "x" | "o";

type WebSocketEvent = {
  room_id: string;
  user_id: string;
  event: EventType;
  character?: Character;
  board_after_move?: string[][];
  error?: string;
};
export default WebSocketEvent;
