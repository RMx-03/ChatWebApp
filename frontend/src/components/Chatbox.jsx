import React, { useEffect, useState, useRef } from 'react';
import { io } from "socket.io-client";
import profile from "../assets/user.webp";
import { FiSend } from "react-icons/fi";
import { MdPhotoLibrary } from 'react-icons/md';
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import RightsideBar from './RightsideBar';
import { sendMessage } from '../api/api';
import axios from "axios";

const socket = io("http://localhost:5002", { withCredentials: true });

const Chatbox = ({ chatUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [viewProfile, setViewProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(storedUser);

    if (storedUser) {
      socket.emit("join", storedUser._id); 
    }
  }, []);

  useEffect(() => {
    if (!chatUser) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/message/${chatUser._id}`, {
          withCredentials: true,
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [chatUser]);
  
  useEffect(() => {
    const handleIncomingMessage = (message) => {
      if (
        chatUser &&
        (message.senderId === chatUser._id || message.receiverId === chatUser._id)
      ) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on("newMessage", handleIncomingMessage);

    return () => {
      socket.off("newMessage", handleIncomingMessage);
    };
  }, [chatUser]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !image) return;

    const messageData = { text: newMessage, image: image || null, };

    try {
      const response = await sendMessage(chatUser._id, messageData);
      setMessages((prev) => [...prev, response.data]);
      socket.emit("sendMessage", response.data);
      setNewMessage("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!chatUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-white text-xl">
        Select a user to start chatting
      </div>
    );
  }

  return (
    <div className='h-screen w-full flex bg-[#2E2F38]'>
      {/* Chat Section */}
      <div className={`flex flex-col flex-grow ${viewProfile ? 'w-[56vw]' : 'w-full'} bg-[#2E2F38] relative`}>
        {/* Chat Header */}
        <div className='flex items-center gap-3 p-3 border-b-2 border-gray-500'>
          <img src={chatUser?.profilePic || profile} alt="profile" className='w-19 h-12 rounded-full' />
          <p className='flex-1 text-xl text-white font-medium flex items-center gap-2'>
            {chatUser?.fullName}
            <span className='w-2 h-2 bg-green-500 rounded-full'></span>
          </p>
          <AiOutlineInfoCircle 
            onClick={() => setViewProfile(!viewProfile)} 
            className='w-6 h-6 text-gray-400 hover:cursor-pointer' 
          />
        </div>

        {/* Chat Messages */}
        <div className='flex flex-col-reverse overflow-y-scroll h-[calc(100%-70px)] pb-[60px]'>
          <div ref={messageEndRef} /> 
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 p-4 ${msg.senderId === currentUser?._id ? "justify-end" : "justify-start"}`}>
              {msg.senderId !== currentUser?._id && (
                <img src={chatUser?.profilePic || profile} alt="profile" className="w-11 h-7 rounded-full" />
              )}
              {msg.image ? (
                <img src={msg.image} alt="sent-img" className="max-w-xs rounded-md shadow-lg" />
              ) : (
                <p className={`p-2 max-w-xs text-lg font-light rounded-[10px] ${msg.senderId === currentUser?._id ? "bg-blue-500 text-white" : "bg-gray-500 text-white"}`}>
                  {msg.text}
                </p>
              )}
              {msg.senderId === currentUser?._id && (
                <img src={currentUser?.profilePic || profile} alt="msg-img" className="w-11 h-7 rounded-full" />
              )}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white p-3 flex items-center gap-3 w-full rounded-2xl">
          <input
            type="text"
            placeholder="Send a message"
            className="flex-1 border-none outline-none text-lg p-2"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <input type="file" id="image" accept="image/png, image/jpg" hidden onChange={handleImageUpload} />
          <BsEmojiSmile size={28} />
          <label htmlFor="image" className="flex cursor-pointer">
            <MdPhotoLibrary size={28} className="text-gray-600" />
          </label>
          <FiSend className="w-7 h-7 text-blue-500 cursor-pointer" onClick={handleSendMessage} />
        </div>
      </div>

      {/* Right Sidebar */}
      {viewProfile && (
        <div className="w-[25vw] bg-white">
          <RightsideBar chatUser={chatUser} messages={messages} />
        </div>
      )}
    </div>
  );
};

export default Chatbox;
