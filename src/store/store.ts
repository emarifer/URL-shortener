import { useReducer } from "react";
import {
  ShortenerState,
  ShortenerAction,
  ShortenerActionKind,
  add,
  // addView,
  ItemState,
} from "./actions";

function shortenerReducer(state: ShortenerState, action: ShortenerAction) {
  const { type, payload } = action;

  switch (type) {
    case ShortenerActionKind.ADD:
      return add(state, payload);

    // case ShortenerActionKind.ADD_VIEW:
    // return addView(state, payload);

    default:
      return state;
  }
}

export const initialState = (): ShortenerState => {
  const data = localStorage.getItem("urls");
  if (data) {
    const items: ItemState[] = JSON.parse(data);
    return { items };
  }
  return { items: [] };
};

export default function useReducerApp() {
  return useReducer(shortenerReducer, initialState());
}

/*
 * RAZÓN POR LA QUE SE PRODUCE EL DOBLE RENDERIZADO EN EL MODO ESTRICTO CON USEEFFECT. VER:
 * https://www.techiediaries.com/react-18-useeffect/
 * https://dev.to/ag-grid/react-18-avoiding-use-effect-getting-called-twice-4i9e
 */

/*
 * https://haseebmajid.dev/blog/react-hooks-context-and-local-storage
 * https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm
 * https://dev.to/craigaholliday/using-the-usereducer-hook-in-react-with-typescript-27m1
 * https://www.sumologic.com/blog/react-hook-typescript/
 * https://github.com/marcosrivasr/10-apps-react/tree/main/06-acortador-urls
 * https://youtu.be/4V7rfombLkc?t=3393
 * https://medium.com/geekculture/how-to-use-context-usereducer-and-localstorage-in-next-js-cc7bc925d3f2
 */
