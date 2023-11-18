import './App.css';
import "./styles/navbar.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./screens/Home";
import { Welcome } from "./screens/Welcome";
import { Create } from './screens/Create';
import { Article } from './screens/Article';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/welcome" exact element={<Welcome />} />
        <Route path="/create" exact element={<Create />} />
        <Route path="/article/:id" exact element={<Article />} />
      </Routes>
    </Router>
  );
}

export default App;
