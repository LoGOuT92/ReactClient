import { MouseEventHandler } from "react";
import styles from "./Button.module.scss";

interface Props {
  title: string;
  color?: string;
  width?: number;
  height?: number;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function Button({
  title,
  color,
  width,
  height,
  type,
  disabled,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={styles.ButtonContainer}
      disabled={disabled}
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
