import { MouseEventHandler } from "react";
import styles from "./Button.module.scss";
interface Props {
  title: string;
  color?: string;
  width?: number;
  height?: number;
  type?: "button" | "submit" | "reset" | undefined;
  OnClickFunction?: () =>
    | MouseEventHandler<HTMLButtonElement>
    | undefined
    | void;
}

export function Button({
  title,
  color,
  width,
  height,
  type,
  OnClickFunction,
}: Props) {
  return (
    <button
      onClick={OnClickFunction}
      type={type}
      className={styles.ButtonContainer}
      style={{
        width: width,
        height: height,
        backgroundColor: color,
        borderColor: color,
      }}
    >
      {title}
    </button>
  );
}
