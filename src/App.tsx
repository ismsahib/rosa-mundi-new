import React from "react";
import { Route, Routes } from "react-router-dom";

import About from "./pages/About/About";
import Author from "./pages/Author/Author";
import Digest from "./pages/Digest/Digest";
import Main from "./pages/Main/Main";
import NotFound from "./pages/NotFound/NotFound";
import Publication from "./pages/Publication/Publication";
import Search from "./pages/Search/Search";
import Section from "./pages/Section/Section";
import Sections from "./pages/Sections/Sections";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/author/:slug" element={<Author />}></Route>
      <Route path="/sections" element={<Sections />}></Route>
      <Route path="/publication/:slug" element={<Publication />}></Route>
      <Route path="/section/:slug" element={<Section typeSection="section" />}></Route>
      <Route path="/section/thematic/:slug" element={<Section typeSection="thematicPublication" />}></Route>
      <Route path="/digest" element={<Digest />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default App;
