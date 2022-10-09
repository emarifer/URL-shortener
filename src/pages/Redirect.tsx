import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemState, ShortenerActionKind } from "../store/actions";
import { ItemsContext } from "../provider/ItemsProvider";
import { Loader } from "../components";

export function Redirect(): ReactElement {
  const { state, dispatch } = useContext(ItemsContext);

  const { id } = useParams();
  const [item, setItem] = useState<ItemState | null | undefined>(null);

  /* function setLocalStorage(id: string | undefined) {
    const data = localStorage.getItem("urls");
    if (data && id) {
      const itemsStorage: ItemState[] = JSON.parse(data);
      const itemUrl = itemsStorage.find((i) => i.shortUrl === id);
      if (itemUrl) {
        itemUrl.views++;
        localStorage.setItem("urls", JSON.stringify(itemsStorage));
      }
    }
  } */

  useEffectOnce(() => {
    if (state.items) {
      const itemUrl = state.items.find((i) => i.shortUrl === id);

      if (itemUrl) {
        setItem(itemUrl);

        dispatch({
          type: ShortenerActionKind.ADD_VIEW,
          payload: itemUrl.shortUrl,
        });
        // setLocalStorage(id);

        window.location.href = itemUrl.url;
      } else {
        setItem(undefined);
      }
    } else {
      setItem(undefined);
    }
  });

  return <Loader item={item} id={id} />;
}

export const useEffectOnce = (effect: () => void | (() => void)) => {
  const destroyFunc = useRef<void | (() => void)>();
  const effectCalled = useRef(false);
  const renderAfterCalled = useRef(false);
  const [val, setVal] = useState<number>(0);

  if (effectCalled.current) {
    renderAfterCalled.current = true;
  }

  useEffect(() => {
    // only execute the effect first time around
    if (!effectCalled.current) {
      destroyFunc.current = effect();
      effectCalled.current = true;
    }

    // this forces one render after the effect is run
    setVal((val) => val + 1);

    return () => {
      // if the comp didn't render since the useEffect was called,
      // we know it's the dummy React cycle
      if (!renderAfterCalled.current) {
        return;
      }
      if (destroyFunc.current) {
        destroyFunc.current();
      }
    };
  }, []);
};

/*
 * RAZÓN POR LA QUE SE PRODUCE EL DOBLE RENDERIZADO EN EL MODO ESTRICTO CON USEEFFECT. VER:
 * https://www.techiediaries.com/react-18-useeffect/
 * https://dev.to/ag-grid/react-18-avoiding-use-effect-getting-called-twice-4i9e
 *
 * CLONADO PROFUNDO DE UN ARRAY DE OBJETOS. VER:
 * https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript
 * ¿EL MÉTODO ARRAY.FIND DEVUELVE UNA COPIA O UNA REFERENCIA DEL ELEMENTO COINCIDENTE DE LA MATRIZ DADA?. VER:
 * https://stackoverflow.com/questions/62497165/does-array-find-method-return-a-copy-or-a-reference-of-the-matched-element-form
 */
