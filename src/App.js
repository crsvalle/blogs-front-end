  // DEPENDENCIES
  import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
  import { useSelector } from 'react-redux'

  // PAGES
  import Edit from "./Pages/Edit";
  import FourOFour from "./Pages/FourError";
  import Home from "./Pages/Home";
  import Index from "./Pages/Index";
  import New from "./Pages/New";
  import Show from "./Pages/Show";
  import Register from "./Pages/Register";
  import Login from "./Pages/Login";
  import User from "./Pages/User";

  // COMPONENTS
  import NavBar from "./Components/NavBar";
  import Footer from "./Components/Footer";

  import "./App.css"
  import Comments from "./Components/Comments";
  import Results from "./Pages/Results";
  import Dashboard from "./Pages/Dashboard";

  const PrivateRoutes = () => {
    const { isAuth } = useSelector((state) => state.auth);

  
    return <>{isAuth.isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
  };
  
  const RestrictedRoutes = () => {
    const { isAuth } = useSelector((state) => state.auth);
  
    return <>{!isAuth.isAuth ? <Outlet /> : <Navigate to="/dashboard" />}</>;
  };
  function App() {

    return (
      <div className="">
        <Router>
          <NavBar />
          <main className="app" >
            <Routes>
              <Route path="/" element={<Home />} />

              <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>

              <Route element={<RestrictedRoutes />}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Route>

              <Route path="/test" element={<Comments />} />
              <Route path="/register" element={<Register /> } />
              <Route path="/login" element={<Login />} />
              <Route path="/blogs" element={<Index />} />
              <Route path="/blogs/new" element={<New />} />
              <Route path="/blogs/:index" element={<Show />} />
              <Route path="/blogs/:index/edit" element={<Edit />} />
              <Route path="/search/:searchItem" element={<Results/>} />
              <Route path="/user/:index" element={<User />} />
              <Route path="*" element={<FourOFour />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    );
  }

  export default App;