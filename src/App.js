import { Routes, Route } from "react-router-dom";

import "./scss/style.scss";

import Header from "./components/Header";
import Home from "./pages/Home";

function App() {

  return (
    <>
      <Header />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main >
    </>
  );
}

export default App; 
