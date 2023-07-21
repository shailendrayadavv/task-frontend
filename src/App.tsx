import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { DetailsPage } from "./pages/Details";

function App() {
  console.log("main");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sports" element={<HomePage />}></Route>
        <Route path="/competitions" element={<DetailsPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
