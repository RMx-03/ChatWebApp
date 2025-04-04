import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Wrapper from "./components/Wrapper";
import LoginPage from "./components/LoginPage";
import { useAuth } from "./context/AuthContext";




function App() {
  const { user } = useAuth();  

  return (
   <div>      
      <Routes>
        <Route path="/" element={user ? <Wrapper /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
      </Routes>        
   </div>
  );
}

export default App;
