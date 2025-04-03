import React, { useState } from 'react';
import profile from "../assets/user.webp";
import { FiSend } from "react-icons/fi";
import { MdPhotoLibrary } from 'react-icons/md';
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import RightsideBar from './RightsideBar';

const Chatbox = () => {
  const [viewProfile, setViewProfile] = useState(false);

  return (
    <div className='h-screen w-full flex bg-[#2E2F38]'>
      {/* Chat Section */}
      <div className={`flex flex-col flex-grow ${viewProfile ? 'w-[56vw]' : 'w-full'} bg-[#2E2F38] relative`}>
        {/* Chat Header */}
        <div className='flex items-center gap-3 p-3 border-b-2 border-gray-500'>
          <img src={profile} alt="profile" className='w-19 h-12 rounded-full' />
          <p className='flex-1 text-xl text-white font-medium flex items-center gap-2'>
            Gaurav Negi
            <span className='w-2 h-2 bg-green-500 rounded-full'></span>
          </p>
          <AiOutlineInfoCircle 
            onClick={() => setViewProfile(!viewProfile)} 
            className='w-6 h-6 text-gray-400 hover:cursor-pointer' 
          />
        </div>

        {/* Chat Messages */}
        <div className='flex flex-col-reverse overflow-y-scroll h-[calc(100%-70px)] pb-[60px]'>
          <div className='flex justify-start items-end gap-2 p-4'>
            <img src={profile} alt="profile" className='w-11 h-7 rounded-full' />
            <p className='bg-gray-500 text-white p-2 max-w-xs text-lg font-light rounded-[10px_10px_10px_0px]'>Hi!</p>
          </div>
          <div className='flex justify-end items-end gap-2 p-4'>
            <p className='bg-blue-500 text-white p-2 max-w-xs text-lg font-light rounded-[10px_10px_0px_10px]'>Hello..</p>
            <img src={profile} alt="msg-img" className='w-11 h-7 rounded-full' />
          </div>
        </div>

        {/* Message Input */}
        <div className='bg-white p-3 flex items-center gap-3 w-full rounded-2xl'>
          <input type='text' placeholder='Send a message' className='flex-1 border-none outline-none text-lg p-2' />
          <input type="file" id="image" accept="image/png, image/jpg" hidden />
          <BsEmojiSmile size={28} />
          <label htmlFor='image' className='flex cursor-pointer'>
            <MdPhotoLibrary size={28} className='text-gray-600' />
          </label>
          <FiSend className='w-7 h-7 text-blue-500 cursor-pointer' />
        </div>
      </div>

      {/* Right Sidebar */}
      {viewProfile && (
        <div className="w-[25vw] bg-white">
          <RightsideBar />
        </div>
      )}
    </div>
  );
};

export default Chatbox;
