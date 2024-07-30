import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Home from "./components/pages/Home";
import Preloader from "./components/common/Preloader";

const Cart = lazy(() => import("./components/pages/Cart"));

function routes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={
        <Suspense fallback={<div className="base-container cartPreloaderWrapper"><Preloader /></div>}>
          <Cart />
        </Suspense>
      } />
    </Routes>
  )
}

export default routes