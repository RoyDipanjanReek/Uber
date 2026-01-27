import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainRegister from "./pages/CaptainRegister";
import UserRegister from "./pages/UserRegister";
import UserLogin from "./pages/UserLogin";
import Home from "./pages/Home";
import Layout from "./features/global/components/layout";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/captain-login" element={<CaptainLogin />} />
          <Route path="/captain-register" element={<CaptainRegister />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
