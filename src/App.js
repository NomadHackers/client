import './App.css';
import "./styles/navbar.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./screens/Home";
import { Welcome } from "./screens/Welcome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/welcome" exact element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
