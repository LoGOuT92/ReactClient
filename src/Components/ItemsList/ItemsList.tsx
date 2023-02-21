import { useState } from "react";
import styles from "./ItemsList.module.scss";
import { ListAddItem } from "./ListAddItem/ListAddItem";
import { SingleItem } from "./SingleItem/SingleItem";
import { Button } from "../UI/Button/Button";
import { diagram } from "../../typings";

interface Props {
  data: diagram[] | undefined;
  handleChangeColor: (id: number, color: string) => void;
  handleItemDeletion: (id: number) => Promise<void>;
  handleItemCreation: (name: string, value: number) => Promise<void>;
  handleItemUpdate: (id: number, value: number) => Promise<void>;
  loading: boolean;
}
export function ItemsList(props: Props) {
  const [addItemVisibility, setAddItemVisibility] = useState(false);

  return (
    <ul className={styles.ItemList}>
      <li className={styles.ItemListHeader}>
        <span>Kanał</span>
        <span>Ilość</span>
        <span>
          <Button
            onClick={() => setAddItemVisibility(!addItemVisibility)}
            title={addItemVisibility ? "cancel" : "add"}
            color="green"
            width={50}
          />
        </span>
      </li>
      {addItemVisibility && (
        <ListAddItem
          addItemVisibility={addItemVisibility}
          createNewItemHandler={props.handleItemCreation}
        />
      )}
      {props.data?.map((item) => (
        <SingleItem key={item.id} {...item} {...props} />
      ))}
    </ul>
  );
}
