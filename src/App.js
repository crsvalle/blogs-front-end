// DEPENDENCIES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import Edit from "./Pages/Edit";
import FourOFour from "./Pages/FourError";
import Home from "./Pages/Home";
import Index from "./Pages/Index";
import New from "./Pages/New";
import Show from "./Pages/Show";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

// COMPONENTS
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

import "./App.css"

function App() {
  return (
    <div className="">
      <Router>
        <NavBar />
        <main className="app" >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register /> } />
            <Route path="/login" element={<Login />} />
            <Route path="/blogs" element={<Index />} />
            <Route path="/blogs/new" element={<New />} />
            <Route path="/blogs/:index" element={<Show />} />
            <Route path="/blogs/:index/edit" element={<Edit />} />
            <Route path="*" element={<FourOFour />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;