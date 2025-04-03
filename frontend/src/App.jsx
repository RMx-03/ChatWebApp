import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Wrapper from "./components/Wrapper";
import LoginPage from "./components/LoginPage";




function App() {
  const[isLogin ,setIsLogin] = useState(true);

  return (
   <div>      
      <Routes>
        <Route path="/" element={isLogin ? <Wrapper /> : <LoginPage />} />
      </Routes>        
   </div>
  );
}

export default App;
