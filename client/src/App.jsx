import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Register from "./components/Register.jsx";
import Verify from "./components/verify.jsx";
import NotFound from "./components/not-found.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/verify"} element={<Verify />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
