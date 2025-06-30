import { createWithSignal } from "solid-zustand";

type CharacterState = {
  character?: string;
  // eslint-disable-next-line no-unused-vars
  setCharacter: (character: string) => void;
  unsetCharacter: () => void;
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
  unsetCharacter: () =>
    set(() => {
      localStorage.removeItem(localStorageKey);
      return {
        character: undefined,
      };
    }),
}));
export default useCharacter;
