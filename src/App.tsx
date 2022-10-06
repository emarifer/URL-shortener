import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Create, Redirect } from "./pages";
import ItemsProvider from "./provider/ItemsProvider";

function App() {
  return (
    <ItemsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="u/:id" element={<Redirect />} />
        </Routes>
      </BrowserRouter>
    </ItemsProvider>
  );
}

export default App;

/*
 * RAZÓN POR LA QUE SE PRODUCE EL DOBLE RENDERIZADO EN EL MODO ESTRICTO CON USEEFFECT. VER:
 * https://www.techiediaries.com/react-18-useeffect/
 * https://dev.to/ag-grid/react-18-avoiding-use-effect-getting-called-twice-4i9e
 */
