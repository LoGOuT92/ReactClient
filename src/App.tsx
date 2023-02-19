import "./App.css";
import { ItemsList } from "./Components/ItemsList/ItemsList";
import { useEffect, useState } from "react";
import { Diagram } from "./Components/Diagram/Diagram";
import { Channel, diagram } from "./typings";
import axios from "axios";

function App() {
  const [diagramTable, setDiagramTable] = useState<diagram[]>();
  const [loading, setLoading] = useState(false);

  const setValuesToCircleDiagramHandler = (data: Channel[]) => {
    let diagramDataTable: diagram[] = [];
    data.forEach((item) =>
      diagramDataTable.push({
        id: item.id,
        title: item.name,
        value: item.value,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      })
    );
    setDiagramTable(diagramDataTable);
  };
  useEffect(() => {
    const fetchDataHandler = async () => {
      const { data } = await axios.get(
        "http://localhost/my-site/public/api/channels"
      );
      setValuesToCircleDiagramHandler(data.channels);
    };
    fetchDataHandler();
  }, []);

  const deleteItemhandler = async (id: number) => {
    setLoading(true);
    const { data } = await axios.delete(
      `http://localhost/my-site/public/api/channels/${id}`
    );

    const filtredDiagramTable = diagramTable?.filter((item) => item.id !== id);
    setDiagramTable(filtredDiagramTable);
    setLoading(false);
  };

  const createNewItemHandler = async (name: string, value: number) => {
    const newItem = {
      name: name,
      value: value,
    };
    try {
      const { data } = await axios.post(
        "http://localhost/my-site/public/api/channels",
        newItem
      );
      const newDiagramItem: diagram = {
        id: data.channel.id,
        title: data.channel.name,
        value: data.channel.value,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      };
      const updatedDiagramTable = diagramTable
        ? [...diagramTable, newDiagramItem]
        : [newDiagramItem];
      setDiagramTable(updatedDiagramTable);
    } catch (error) {
      console.error(error);
    }
  };

  const updateItemhandler = async (id: number, value: number) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `http://localhost/my-site/public/api/channels/${id}`,
        {
          value: value,
        }
      );
      setDiagramTable(
        diagramTable?.map((item) => {
          if (item.id === id) {
            item.value = value;
          }
          return item;
        })
      );
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const changeColorHandler = (id: number, color: string) => {
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
          deleteItemhandler={(id: number) => deleteItemhandler(id)}
          createNewItemHandler={(name: string, value: number) =>
            createNewItemHandler(name, value)
          }
          updateItemhandler={(id: number, value: number) =>
            updateItemhandler(id, value)
          }
          loading={loading}
        />
        <Diagram data={diagramTable} />
      </div>
    </div>
  );
}

export default App;
