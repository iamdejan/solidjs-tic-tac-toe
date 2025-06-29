import { Route, Router } from "@solidjs/router";
import { JSX } from "solid-js/jsx-runtime";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";

export default function SiteRouter(): JSX.Element {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/create-room" component={CreateRoom} />
    </Router>
  );
}
