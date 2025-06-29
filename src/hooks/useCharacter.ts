import { createWithSignal } from "solid-zustand";

type CharacterState = {
  character: string;
  // eslint-disable-next-line no-unused-vars
  setCharacter: (character: string) => void;
};

const localStorageKey = "character";

const useCharacter = createWithSignal<CharacterState>((set) => ({
  character: localStorage.getItem(localStorageKey) ?? "",
  setCharacter: (character: string) =>
    set(() => {
      localStorage.setItem(localStorageKey, character);
      return {
        character: character,
      };
    }),
}));
export default useCharacter;
