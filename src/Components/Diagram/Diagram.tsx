import { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { diagram } from "../../typings";
import styles from "./diagram.module.scss";

export function Diagram({ data }: { data: diagram[] | undefined }) {
  return (
    <div className={styles.diagramContainer}>
      {data && (
        <PieChart
          style={{
            fontSize: "9px",
            width: "80%",
            color: "black",
          }}
          label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
          labelPosition={100 - 60 / 2}
          labelStyle={{
            fill: "#fff",
            opacity: 0.75,
            pointerEvents: "none",
            color: "black",
          }}
          data={data}
        />
      )}
    </div>
  );
}
