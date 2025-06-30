import { createWithSignal } from "solid-zustand";
import WebSocketEvent from "../types/WebSocketEvent";

type LatestEventState = {
  latestEvent?: WebSocketEvent;
  // eslint-disable-next-line no-unused-vars
  setLatestEvent: (latestEvent: WebSocketEvent) => void;
  clear: () => void;
};

const localStorageKey = "latest_event";

function getLatestEvent(): WebSocketEvent | undefined {
  const storageItem = localStorage.getItem(localStorageKey);
  if (!storageItem) {
    return undefined;
  }

  const latestEvent: WebSocketEvent = JSON.parse(storageItem);
  return latestEvent;
}

const useLatestEvent = createWithSignal<LatestEventState>((set) => ({
  latestEvent: getLatestEvent(),
  setLatestEvent: (latestEvent: WebSocketEvent) =>
    set(() => {
      localStorage.setItem(localStorageKey, JSON.stringify(latestEvent));
      return {
        latestEvent: latestEvent,
      };
    }),
  clear: () =>
    set(() => {
      localStorage.removeItem(localStorageKey);
      return {
        latestEvent: undefined,
      };
    }),
}));
export default useLatestEvent;
