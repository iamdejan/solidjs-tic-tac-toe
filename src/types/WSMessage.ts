type WSMessage = {
  command: "create" | "join" | "leave" | "move";
  params?: Map<string, string>;
};

export default WSMessage;
