import { Routes, Route } from "react-router-dom";
import "./scss/style.scss";

import Layout from "./components/common/Layout";
import Home from "./components/pages/Home";
import Cart from "./components/pages/Cart";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Layout>
  );
}

export default App;