import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

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
