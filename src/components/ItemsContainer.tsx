import { ReactElement } from "react";
import styles from "./itemsContainer.module.css";

interface ItemsContainerProps {
  children: ReactElement[];
}

export function ItemsContainer({
  children,
}: ItemsContainerProps): ReactElement {
  return <div className={styles.itemsContainer}>{children}</div>;
}
