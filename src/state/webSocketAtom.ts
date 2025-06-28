import { ReconnectingWebSocket } from "@solid-primitives/websocket";
import { atom } from "solid-jotai";

export const webSocketAtom = atom<ReconnectingWebSocket | undefined>(undefined);
