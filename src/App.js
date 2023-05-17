import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Cart from "./components/cart/Cart";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home/>}/>
        <Route path="/cart" exact element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
