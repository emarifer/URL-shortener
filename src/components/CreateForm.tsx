import React, { ReactElement, useState, useContext } from "react";
import { ItemsContext } from "../provider/ItemsProvider";
import { ShortenerActionKind } from "../store/actions";
import styles from "./createForm.module.css";

export function CreateForm(): ReactElement {
  const { dispatch } = useContext(ItemsContext);

  const [url, setUrl] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const url = e.target.value;
    setUrl(url);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (url.length === 0) return; // Si se pulsa `ENTER` con el campo vacío, no se `submitea` nada.

    dispatch({ type: ShortenerActionKind.ADD, payload: url });

    setUrl(""); // Limpia el campo de texto.
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={url}
        onChange={handleChange}
        className={styles.input}
        placeholder="Type a valid URL…"
        autoFocus
      />
    </form>
  );
}

/*
 * Formas de establecer el enfoque en un campo de entrada después de renderizar en React:
 * https://bosctechlabs.com/set-focus-on-input-field-after-rendering-react/
 */
