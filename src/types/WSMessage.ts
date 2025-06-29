type Params = {
  [key: string]: string;
};

type WSMessage = {
  command: "create" | "join" | "leave" | "move";
  params: Params;
};

export default WSMessage;
