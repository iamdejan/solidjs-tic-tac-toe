type EventType =
  | "ROOM_CREATED"
  | "ROOM_JOINED"
  | "ROOM_LEFT"
  | "GAME_STARTED"
  | "MOVE_REGISTERED"
  | "GAME_FINISHED";

type Character = "X" | "O";

type WebSocketEvent = {
  room_id: string;
  user_id: string;
  event: EventType;
  character?: Character;
  board_after_move?: string[][];
  winner_user_id?: string;
  error?: string;
};
export default WebSocketEvent;
