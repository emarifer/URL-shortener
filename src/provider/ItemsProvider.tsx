import { ReactElement, createContext, useEffect } from "react";
import { ShortenerAction, ShortenerState } from "../store/actions";
import useReducerApp from "../store/store";

interface ContextType {
  state: ShortenerState;
  dispatch: React.Dispatch<ShortenerAction>;
}

export const ItemsContext = createContext<ContextType>({} as ContextType);

interface ItemsProviderProps {
  children: ReactElement;
}

export default function ItemsProvider({
  children,
}: ItemsProviderProps): ReactElement {
  const [state, dispatch] = useReducerApp();

  useEffect(() => {
    localStorage.setItem("urls", JSON.stringify(state.items));
  }, [state]);

  return (
    <ItemsContext.Provider value={{ state, dispatch }}>
      {children}
    </ItemsContext.Provider>
  );
}

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

/*
 * https://haseebmajid.dev/blog/react-hooks-context-and-local-storage
 * https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm
 */
