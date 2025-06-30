type Params = {
  [key: string]: string;
};

type WebSocketMessage = {
  command: "create" | "join" | "leave" | "move";
  params: Params;
};

export default WebSocketMessage;
