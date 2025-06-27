import { Route, Router } from "@solidjs/router";
import { JSX } from "solid-js/jsx-runtime";
import Home from "./pages/Home";
import Room from "./pages/Room";

export default function SiteRouter(): JSX.Element {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/create-room" component={Room} />
    </Router>
  );
}
