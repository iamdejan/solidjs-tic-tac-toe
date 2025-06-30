import { createWithSignal } from "solid-zustand";
import WebSocketResponse from "../types/WebSocketResponse";

type LatestEventState = {
  latestEvent?: WebSocketResponse;
  // eslint-disable-next-line no-unused-vars
  setLatestEvent: (latestEvent: WebSocketResponse) => void;
};

const localStorageKey = "latest_event";

function getLatestEvent(): WebSocketResponse | undefined {
  const storageItem = localStorage.getItem(localStorageKey);
  if (!storageItem) {
    return undefined;
  }

  const latestEvent: WebSocketResponse = JSON.parse(storageItem);
  return latestEvent;
}

const useLatestEvent = createWithSignal<LatestEventState>((set) => ({
  latestEvent: getLatestEvent(),
  setLatestEvent: (latestEvent: WebSocketResponse) =>
    set(() => {
      localStorage.setItem(localStorageKey, JSON.stringify(latestEvent));
      return {
        latestEvent: latestEvent,
      };
    }),
}));
export default useLatestEvent;
