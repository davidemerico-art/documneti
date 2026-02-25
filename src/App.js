import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import CompileTemplate from "./pages/CompileTemplate";
import Messages from "./pages/Messages"; 
import CreaBozze from "./pages/CreaBozze";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/compile/:id" element={<CompileTemplate />} />
        <Route path="/messages" element={<Messages />} /> 
        <Route path="/creabozze" element={<CreaBozze />} />
      </Routes>
    </Router>
  );
}

export default App;