import { ReconnectingWebSocket } from "@solid-primitives/websocket";
import { atom } from "solid-jotai";

const webSocketAtom = atom<ReconnectingWebSocket | undefined>(undefined);
export default webSocketAtom;
