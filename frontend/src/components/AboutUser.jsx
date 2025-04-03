import React from 'react';
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';
import profile from '../assets/Gaurav.jpg';

function AboutUser({setShowUser}) {
  return (
    <div className='w-screen h-screen bg-[#00000093] fixed flex justify-center items-center'>
      <div className='w-[40em] h-[30em] bg-[#856b947e] flex flex-col rounded-lg shadow-lg p-4'> 
        {/* Header with Close Icon */}
        <div className='w-full flex justify-end'>
          <AiOutlineClose 
            className='text-white text-3xl cursor-pointer hover:text-gray-900' 
            onClick={()=>setShowUser(false)} 
          />
        </div>
        
        {/* User Profile Section */}
        <div className='flex flex-col text-white items-center my-4'>
          <img src={profile} alt='User Profile' className='w-30 h-30 rounded-full border-2 border-gray-700' />
          <h2 className='text-xl font-semibold mt-2'>Gaurav Negi</h2>
        </div>
        
        {/* Action Buttons */}
        <div className='flex text-white flex-col items-start px-8 gap-4 mt-6'>
          <button className='flex items-center gap-3 text-lg text-white hover:text-gray-400'>
            <AiOutlineEdit className='text-4xl text-white ' /> Edit Profile
          </button>
          <button className='flex items-center gap-3 text-lg text-white hover:text-gray-400'>
            <RiLockPasswordLine className='text-4xl text-white' /> Change Password
          </button>
          <button className='flex items-center gap-3 text-lg text-white hover:text-gray-400'>
            <FiLogOut className='text-4xl text-white' /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutUser;


