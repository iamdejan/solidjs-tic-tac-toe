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
      class="btn btn-info btn-outline btn-square rounded-none"
      disabled={Boolean(props.character)}
    >
      {props.character || " "}
    </button>
  );
}
