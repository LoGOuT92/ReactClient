import { useState } from "react";
import styles from "./ItemsList.module.scss";
import { ListAddItem } from "./ListAddItem/ListAddItem";
import { SingleItem } from "./SingleItem/SingleItem";
import { Button } from "../UI/Button/Button";
import { diagram } from "../../typings";

interface Props {
  data: diagram[] | undefined;
  changeColorHandler: (id: number, color: string) => void;
}

export function ItemsList({ data, changeColorHandler }: Props) {
  const [addItemVisibility, setAddItemVisibility] = useState(false);

  const ChangeAddItemVisibilityHandler = () => {
    setAddItemVisibility(!addItemVisibility);
  };

  return (
    <ul className={styles.ItemList}>
      <li className={styles.ItemListHeader}>
        <span>Kanał</span>
        <span>Ilość</span>
        <span>
          <Button
            OnClickFunction={ChangeAddItemVisibilityHandler}
            title="Add"
            color="green"
            width={50}
          />
        </span>
      </li>
      <ListAddItem addItemVisibility={addItemVisibility} />
      {data?.map((item) => (
        <SingleItem
          key={item.id}
          {...item}
          changeColorHandler={changeColorHandler}
        />
      ))}
    </ul>
  );
}
