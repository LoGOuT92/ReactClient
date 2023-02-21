import { ItemsList } from "./Components/ItemsList/ItemsList";
import { useEffect, useState } from "react";
import { Diagram } from "./Components/Diagram/Diagram";
import { diagram } from "./typings";
import { createItem, deleteItem, editItem, getItems } from "./api/api";
import { randomHexColor } from "./Components/UI/colorGenerator";
import styles from "./App.module.scss";

function App() {
  const [diagramTable, setDiagramTable] = useState<diagram[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await getItems();
        const diagramData = data.channels.map((item) => ({
          id: item.id,
          title: item.name,
          value: item.value,
          color: randomHexColor(),
        }));
        setDiagramTable(diagramData);
        setError("");
      } catch (error) {
        console.log(error);

        setError("Nie udało się pobrać danych");
      }
    };
    fetchItems();
  }, []);

  const handleItemDeletion = async (id: number) => {
    setLoading(true);
    try {
      await deleteItem(id);
      setDiagramTable((prevData) => prevData.filter((item) => item.id !== id));
      setError("");
    } catch (error) {
      console.log(error);
      setError("Nie udało się usunąć elementu");
    } finally {
      setLoading(false);
    }
  };

  const handleItemCreation = async (name: string, value: number) => {
    try {
      const { newDiagramItem } = await createItem({ name, value });
      setDiagramTable((prevData) => [newDiagramItem, ...prevData]);
      setError("");
    } catch (error) {
      console.log(error);
      setError("Nie udało się utworzyć elementu");
    }
  };

  const handleItemUpdate = async (id: number, value: number) => {
    setLoading(true);
    try {
      await editItem(id, value);
      setDiagramTable((prevData) =>
        prevData.map((item) => (item.id === id ? { ...item, value } : item))
      );
      setError("");
    } catch (error) {
      console.log(error);
      setError("Nie udało się zaktualizować elementu");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeColor = (id: number, color: string) => {
    setDiagramTable((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, color } : item))
    );
  };
  return (
    <div className={styles.App}>
      <div className={styles.main}>
        {error ? <div className={styles.error}>{error}</div> : null}
        <ItemsList
          data={diagramTable}
          handleChangeColor={handleChangeColor}
          handleItemDeletion={handleItemDeletion}
          handleItemCreation={handleItemCreation}
          handleItemUpdate={handleItemUpdate}
          loading={loading}
        />
        <Diagram data={diagramTable} />
      </div>
    </div>
  );
}
export default App;
