import React from "react";
import { Route, Routes } from "react-router-dom";

import Author from "./pages/Author/Author";
import Main from "./pages/Main/Main";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      {/* <Route path="/about" element={<About />}></Route> */}
      <Route path="/author/:id" element={<Author />}></Route>
      {/* <Route path="/digest" element={<Digest />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route path="/section" element={<Section />}></Route>
      <Route path="/section/:editionPage" element={<EditionPage />}></Route> */}
    </Routes>
  );
};

export default App;
