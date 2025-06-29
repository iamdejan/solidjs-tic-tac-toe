import { createWithSignal } from "solid-zustand";

type CharacterState = {
  character: string;
  // eslint-disable-next-line no-unused-vars
  setCharacter: (character: string) => void;
};

const useCharacter = createWithSignal<CharacterState>((set) => ({
  character: "",
  setCharacter: (character: string) =>
    set(() => {
      return {
        character: character,
      };
    }),
}));
export default useCharacter;
