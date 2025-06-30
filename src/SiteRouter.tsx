import { Route, Router } from "@solidjs/router";
import { JSX } from "solid-js/jsx-runtime";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import WaitingRoom from "./pages/WaitingRoom";
import GameRoom from "./pages/GameRoom";
import JoinRoom from "./pages/JoinRoom";

export default function SiteRouter(): JSX.Element {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/create-room" component={CreateRoom} />
      <Route path="/join-room" component={JoinRoom} />
      <Route path="/waiting-room" component={WaitingRoom} />
      <Route path="/game-room" component={GameRoom} />
    </Router>
  );
}
