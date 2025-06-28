import { Route, Router } from "@solidjs/router";
import { JSX } from "solid-js/jsx-runtime";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import { createEffect, Match, Switch } from "solid-js";
import {
  createReconnectingWS,
  createWSState,
} from "@solid-primitives/websocket";
import { useAtom } from "solid-jotai";
import webSocketAtom from "./state/webSocketAtom";

export default function SiteRouter(): JSX.Element {
  const ws = createReconnectingWS(import.meta.env.VITE_SERVER_URL);
  const state = createWSState(ws);
  const [, setGlobalWebSocket] = useAtom(webSocketAtom);
  createEffect(() => {
    if (state() == WebSocket.OPEN) {
      console.log("Connected to WebSocket");
      setGlobalWebSocket(ws);
    }
  });

  return (
    <Switch
      fallback={
        <div class="flex flex-col justify-center items-center h-[100vh] w-[100vw] gap-8">
          <span class="loading loading-spinner" />
        </div>
      }
    >
      <Match when={state() == WebSocket.CONNECTING}>
        <div class="flex flex-col justify-center items-center h-[100vh] w-[100vw] gap-8">
          <p>
            Connecting to WebSocket... <span class="loading loading-spinner" />
          </p>
        </div>
      </Match>
      <Match when={state() == WebSocket.OPEN}>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/create-room" component={CreateRoom} />
        </Router>
      </Match>
    </Switch>
  );
}
