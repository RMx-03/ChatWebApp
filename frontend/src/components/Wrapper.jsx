import React, { useState } from "react";
import SideBar from "./SideBar";
import AboutUser from "./AboutUser";
import Chatbox from "./Chatbox";
function Wrapper() {
  const [showUser, setShowUser] = useState(false);

  return (
    <div className="w-screen h-screen bg-[#3b4170] flex">
      <SideBar setShowUser={setShowUser} />
    <Chatbox/>
      {showUser && <AboutUser setShowUser={setShowUser} />}
    </div>
  );
}

export default Wrapper;
