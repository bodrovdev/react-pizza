import { Route, Routes } from "react-router-dom";

import Cart from "./components/pages/Cart";
import Home from "./components/pages/Home";

function routes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  )
}

export default routes