import { MouseEventHandler } from "react";
import styles from "./Button.module.scss";

interface Props {
  title: string;
  color?: string;
  width?: number;
  height?: number;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function Button({ title, color, width, height, type, onClick }: Props) {
  return (
    <button
      onClick={onClick}
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
