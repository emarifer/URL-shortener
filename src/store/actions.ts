// Model
export type ItemState = {
  url: string;
  shortUrl: string;
  views: number;
};

// Estado de nuestra aplicación.
export interface ShortenerState {
  items: ItemState[];
}

// Una enumeración con todos los tipos de acciones para usar en nuestro reducer.
// VER nota abajo sobre el uso optimizado de `enums`.
export const enum ShortenerActionKind {
  ADD,
  ADD_VIEW,
}

// Una interfaz para nuestras acciones.
export interface ShortenerAction {
  type: ShortenerActionKind;
  payload: string;
}

export function add(state: ShortenerState, payload: string): ShortenerState {
  const url = payload;
  const shortUrl = getRandom();
  const temp = [...state.items];
  temp.unshift({ url, shortUrl, views: 0 });

  return { items: [...temp] };
}

export function addView(
  state: ShortenerState,
  payload: string
): ShortenerState {
  const items = state.items.map((e) => {
    return { ...e };
  });
  const item = items.find((i) => i.shortUrl === payload); // El tipo es ItemState | undefined.

  if (item) {
    item.views++;

    return { items };
  }

  return state;
}

function getRandom(): string {
  return (
    Math.random().toString(32).substring(2, 5) +
    Math.random().toString(32).substring(2, 5)
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
