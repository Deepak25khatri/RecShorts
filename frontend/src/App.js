import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import DetailNews from "./Pages/DetailNews";
import SearchResults from "./Pages/SearchResults";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<DetailNews/>}/>
        <Route path="/search" element={<SearchResults/>}/>
      </Routes>
    </Router>
  );
}
export default App;
