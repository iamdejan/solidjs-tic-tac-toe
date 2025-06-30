import { JSX } from "solid-js";

type Props = {
  row: number;
  column: number;
  character?: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (row: number, column: number) => void;
};

export default function CellButton(props: Props): JSX.Element {
  return (
    <button
      type="button"
      class="btn btn-neutral btn-outline btn-square rounded-none"
      disabled={Boolean(props.character) && props.character !== " "}
      onClick={() => props.onClick(props.row, props.column)}
    >
      {props.character || " "}
    </button>
  );
}
