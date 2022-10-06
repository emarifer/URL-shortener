import { ReactElement, useContext, useEffect } from "react";
import { CreateForm, Item, ItemsContainer, MainContainer } from "../components";
import { ItemsContext } from "../provider/ItemsProvider";
import styles from "./create.module.css";

export function Create(): ReactElement {
  const { state } = useContext(ItemsContext);

  useEffect(() => {
    localStorage.setItem("urls", JSON.stringify(state.items));
  }, [state]);

  return (
    <>
      <header className={styles.title}>URL shortener</header>
      <MainContainer>
        <CreateForm />
        <ItemsContainer>
          {state.items.map((item) => (
            <Item item={item} key={item.shortUrl} />
          ))}
        </ItemsContainer>
      </MainContainer>
    </>
  );
}

/*
 * https://www.techiediaries.com/react-18-useeffect/
 * https://dev.to/ag-grid/react-18-avoiding-use-effect-getting-called-twice-4i9e
 */
