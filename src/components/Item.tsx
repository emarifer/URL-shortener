import { ReactElement } from "react";
import { ItemState } from "../store/actions";
import styles from "./item.module.css";

interface ItemProps {
  item: ItemState;
}

export function Item({ item }: ItemProps): ReactElement {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemInfoContainer}>
        <span className={styles.itemInfoTag}>URL:</span>
        <span style={{ maxWidth: "350px", wordWrap: "break-word" }}>
          {item.url}
        </span>
      </div>

      <div className={styles.itemInfoContainer}>
        <span className={styles.itemInfoTag}>Short URL:</span>
        <span>
          <a
            href={`${window.location.origin}/u/${item.shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${window.location.origin}/u/${item.shortUrl}`}
          </a>
        </span>
      </div>

      <div className={styles.itemInfoContainer}>
        <span className={styles.itemInfoTag}>Views:</span>
        <span>{item.views} view(s)</span>
      </div>
    </div>
  );
}

/**
 * Darle un ancho máximo a un span con CSS:
 * https://stackoverflow.com/questions/2511272/not-able-to-do-max-width#2511435
 *
 * Obtener el protocolo, el dominio y el puerto de la URL en javascript:
 * https://stackoverflow.com/questions/6941533/get-protocol-domain-and-port-from-url
 */
