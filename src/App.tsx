import "./App.css";
import { ItemsList } from "./Components/ItemsList/ItemsList";
import { useEffect, useState } from "react";
import { Diagram } from "./Components/Diagram/Diagram";
import { Channel, diagram } from "./typings";
import { createItem, deleteItem, editItem, getItems } from "./api/api";
import { randomHexColor } from "./Components/UI/colorGenerator";

function App() {
  const [diagramTable, setDiagramTable] = useState<diagram[]>();
  const [loading, setLoading] = useState(false);

  const setValuesToCircleDiagramHandler = (data: Channel[]): void => {
    let diagramDataTable: diagram[] = [];
    data.forEach((item) =>
      diagramDataTable.push({
        id: item.id,
        title: item.name,
        value: item.value,
        color: randomHexColor(),
      })
    );
    setDiagramTable(diagramDataTable);
  };
  useEffect(() => {
    const fetchDataHandler = async (): Promise<void> => {
      const { data } = await getItems();
      setValuesToCircleDiagramHandler(data.channels);
    };
    fetchDataHandler();
  }, []);

  const deleteItemhandler = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      const { data } = await deleteItem(id);
      const filtredDiagramTable = diagramTable?.filter(
        (item) => item.id !== id
      );
      setDiagramTable(filtredDiagramTable);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const createNewItemHandler = async (
    name: string,
    value: number
  ): Promise<void> => {
    const newItem = {
      name: name,
      value: value,
    };
    try {
      const { newDiagramItem, data } = await createItem(newItem);
      const updatedDiagramTable = diagramTable
        ? [newDiagramItem, ...diagramTable]
        : [newDiagramItem];
      setDiagramTable(updatedDiagramTable);
    } catch (error) {
      console.error(error);
    }
  };

  const updateItemhandler = async (
    id: number,
    value: number
  ): Promise<void> => {
    setLoading(true);
    try {
      const data = await editItem(id, value);

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

  const changeColorHandler = (id: number, color: string): void => {
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
