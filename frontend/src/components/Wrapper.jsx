import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import AboutUser from "./AboutUser";
import Chatbox from "./Chatbox";
import RightsideBar from "./RightsideBar";
import { useNavigate } from "react-router-dom";


function Wrapper() {
  const [showProfile, setShowProfile] = useState(false);
  const [showChatSideBar, setShowChatSideBar] = useState(true);
  const [chatUser, setChatUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();

  useEffect(() =>{
    const user = localStorage.getItem("user");
    if(!user) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="w-screen h-screen bg-[#3b4170] flex">
      <SideBar 
        setShowUser={setShowProfile} 
        setChatUser={setChatUser}
        setMessages={setMessages}
      />

      <Chatbox 
        chatUser={chatUser} 
        setShowUser={setShowProfile}
        messages={messages}
        setMessages={setMessages}
      />
      
      {showChatSideBar && (
        <RightsideBar 
          chatUser={chatUser}
          messages={messages}
        />
      )}

      {showProfile && (
        <AboutUser setShowUser={setShowProfile} />
      )}
    </div>
  );
}

export default Wrapper;
