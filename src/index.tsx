/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import { Route, Router } from "@solidjs/router";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import WaitingRoom from "./pages/WaitingRoom";
import GameRoom from "./pages/GameRoom";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(
  () => (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/create-room" component={CreateRoom} />
      <Route path="/join-room" component={JoinRoom} />
      <Route path="/waiting-room" component={WaitingRoom} />
      <Route path="/game-room" component={GameRoom} />
    </Router>
  ),
  root!,
);
