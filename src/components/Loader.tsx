import { ReactElement } from "react";
import { ItemState } from "../store/actions";
import styles from "./loader.module.css";

export interface LoaderProps {
  item?: ItemState | null;
  id?: string;
}

export function Loader({ item, id }: LoaderProps): ReactElement {
  if (item === null) {
    return <Container>Loading…</Container>;
  }

  if (item === undefined) {
    return <Container>{`URL ${id} not found! 😱`}</Container>;
  }

  return <Container>{`Redirecting to ${item.url} …`}</Container>;
}

interface ContainerProps {
  children: string;
}

function Container({ children }: ContainerProps): ReactElement {
  return <div className={styles.loaderContainer}>{children}</div>;
}
