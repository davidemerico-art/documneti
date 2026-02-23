import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import CompileTemplate from "./pages/CompileTemplate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/compile/:id" element={<CompileTemplate />} />
      </Routes>
    </Router>
  );
}

export default App;