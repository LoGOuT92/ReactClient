import { useState } from "react";
import styles from "./ItemsList.module.scss";
import { ListAddItem } from "./ListAddItem/ListAddItem";
import { SingleItem } from "./SingleItem/SingleItem";
import { Button } from "../UI/Button/Button";
import { diagram } from "../../typings";

interface Props {
  data: diagram[] | undefined;
  changeColorHandler: (id: number, color: string) => void;
  deleteItemhandler: (id: number) => Promise<void>;
  createNewItemHandler: (name: string, value: number) => Promise<void>;
  updateItemhandler: (id: number, value: number) => Promise<void>;
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
            OnClickFunction={() => setAddItemVisibility(!addItemVisibility)}
            title="Add"
            color="green"
            width={50}
          />
        </span>
      </li>
      {addItemVisibility && (
        <ListAddItem
          addItemVisibility={addItemVisibility}
          createNewItemHandler={props.createNewItemHandler}
        />
      )}
      {props.data?.map((item) => (
        <SingleItem key={item.id} {...item} {...props} />
      ))}
    </ul>
  );
}
