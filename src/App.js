import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import CompileTemplate from "./pages/CompileTemplate";
import Messages from "./pages/Messages"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/compile/:id" element={<CompileTemplate />} />
        <Route path="/messages" element={<Messages />} /> 
      </Routes>
    </Router>
  );
}

export default App;