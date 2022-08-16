import "./App.css";
import SideBar from "./Components/SideBar";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DashBoard } from "./Components/DashBoard";
import { About } from "./Components/About";
import { News } from "./Components/News";

function App() {
  return (
    <Router>
      <Container fluid className="app">
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="visualize">
          <Routes>
            <Route exact path="/" element={<DashBoard />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/news" element={<News />} />
          </Routes>
        </div>
      </Container>
    </Router>
  );
}

export default App;
