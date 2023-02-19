import { PieChart } from "react-minimal-pie-chart";
import "./App.css";
import { ItemsList } from "./Components/ItemsList/ItemsList";
import { useEffect, useState } from "react";
import { Diagram } from "./Components/Diagram/Diagram";
import { Channel, diagram } from "./typings";

const dataAr = [
  {
    Id: 1,
    Name: "Google",
    Value: 725,
  },
  {
    Id: 2,
    Name: "Facebook",
    Value: 225,
  },
  {
    Id: 3,
    Name: "Instagram",
    Value: 15,
  },
  {
    Id: 4,
    Name: "Twitter",
    Value: 30,
  },
  {
    Id: 5,
    Name: "Linkedin",
    Value: 45,
  },
];
function App() {
  const [data, setData] = useState<Channel[]>(dataAr);
  const [diagramTable, setDiagramTable] = useState<diagram[]>();
  const setValuesToCircleDiagramHandler = () => {
    let diagramDataTable: diagram[] = [];
    data.forEach((item) =>
      diagramDataTable.push({
        id: item.Id,
        title: item.Name,
        value: item.Value,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      })
    );
    setDiagramTable(diagramDataTable);
  };
  useEffect(() => {
    setValuesToCircleDiagramHandler();
  }, []);

  const changeColorHandler = (id: number, color: string) => {
    console.log(id, color);
    setDiagramTable(
      diagramTable?.map((item) => {
        if (item.id === id) {
          item.color = color;
        }
        return item;
      })
    );
  };

  return (
    <div className="App">
      {/* <header className="App-header">a</header> */}
      <div className="main">
        <ItemsList
          data={diagramTable}
          changeColorHandler={(id: number, color: string) =>
            changeColorHandler(id, color)
          }
        />
        <Diagram data={diagramTable} />
      </div>
    </div>
  );
}

export default App;
