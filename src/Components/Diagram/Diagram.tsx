import { PieChart } from "react-minimal-pie-chart";
import { diagram } from "../../typings";
import styles from "./diagram.module.scss";

interface Props {
  data: diagram[] | undefined;
}

export function Diagram({ data }: Props) {
  return (
    <div className={styles.diagramContainer}>
      {data && (
        <PieChart
          style={{
            fontSize: "9px",
            width: "80%",
          }}
          label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
          labelPosition={100 - 60 / 2}
          labelStyle={{
            fill: "#fff",
            opacity: 0.75,
            pointerEvents: "none",
          }}
          data={data}
        />
      )}
    </div>
  );
}
