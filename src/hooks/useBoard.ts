import { createWithSignal } from "solid-zustand";

type BoardState = {
  board: Array<Array<string>>;
  // eslint-disable-next-line no-unused-vars
  setBoard: (board: Array<Array<string>>) => void;
  clear: () => void;
};

const localStorageKey = "board";

const emptyBoard: Array<Array<string>> = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

function getBoard(): Array<Array<string>> {
  const storageItem = localStorage.getItem(localStorageKey);
  if (!storageItem) {
    return emptyBoard;
  }

  const board: Array<Array<string>> = JSON.parse(storageItem);
  return board;
}

const useBoard = createWithSignal<BoardState>((set) => ({
  board: getBoard(),
  setBoard: (board: Array<Array<string>>) =>
    set(() => {
      localStorage.setItem(localStorageKey, JSON.stringify(board));
      return {
        board: board,
      };
    }),
  clear: () =>
    set(() => {
      localStorage.removeItem(localStorageKey);
      return {
        board: emptyBoard,
      };
    }),
}));
export default useBoard;
