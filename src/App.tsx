import React from "react";
import { Route, Routes } from "react-router-dom";

import About from "./pages/About/About";
import Author from "./pages/Author/Author";
import Main from "./pages/Main/Main";
import Sections from "./pages/Sections/Sections";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/author/:id" element={<Author />}></Route>
      <Route path="/sections" element={<Sections />}></Route>
      {/* <Route path="/digest" element={<Digest />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route path="/section/:editionPage" element={<EditionPage />}></Route> */}
    </Routes>
  );
};

export default App;
