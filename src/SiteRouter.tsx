import { Route, Router } from "@solidjs/router";
import { JSX } from "solid-js/jsx-runtime";
import Home from "./pages/Home";
import CreateRoom from "./pages/Room";
import { Show } from "solid-js";
import {
  createReconnectingWS,
  createWSState,
} from "@solid-primitives/websocket";

export default function SiteRouter(): JSX.Element {
  const ws = createReconnectingWS("wss://localhost:8080/ws");
  const state = createWSState(ws);

  return (
    <>
      <Show when={state() == WebSocket.CONNECTING}>
        <div class="flex flex-col justify-center items-center h-[100vh] w-[100vw] gap-8">
          <p>
            Connecting to WebSocket... <span class="loading loading-spinner" />
          </p>
        </div>
      </Show>
      <Show when={state() == WebSocket.OPEN}>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/create-room" component={CreateRoom} />
        </Router>
      </Show>
    </>
  );
}
