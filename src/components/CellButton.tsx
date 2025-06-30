import { JSX } from "solid-js/jsx-runtime";

type Props = {
  row: number;
  column: number;
  character?: string;
};

export default function CellButton(props: Props): JSX.Element {
  return (
    <button
      type="button"
      class="btn btn-neutral btn-outline btn-square rounded-none"
      disabled={props.character !== " "}
    >
      {props.character || " "}
    </button>
  );
}
