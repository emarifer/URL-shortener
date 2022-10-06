import { ReactElement } from "react";
import styles from "./mainContainer.module.css";

interface MainContainerProps {
  children: ReactElement[];
}

export function MainContainer({ children }: MainContainerProps): ReactElement {
  return <div className={styles.mainContainer}>{children}</div>;
}
