import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import userPhoto from '../assets/user.webp';

function AboutUser({ setShowUser }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload(); // optional: full refresh
  };

  return (
    <div className='w-screen h-screen bg-[#00000093] fixed flex justify-center items-center z-50'>
      <div className='w-[40em] h-[30em] bg-[#856b947e] flex flex-col rounded-lg shadow-lg p-4'>
        {/* Header with Close Icon */}
        <div className='w-full flex justify-end'>
          <AiOutlineClose 
            className='text-white text-3xl cursor-pointer hover:text-gray-900'
            onClick={() => setShowUser(false)}
          />
        </div>

        {/* User Profile Section */}
        <div className='flex flex-col text-white items-center my-4'>
          <img 
            src={user?.profilePic || userPhoto} 
            alt='User Profile' 
            className='w-32 h-32 rounded-full border-2 border-gray-700 object-cover' 
          />
          <h2 className='text-xl font-semibold mt-2'>{user?.fullName || "Your Name"}</h2>
        </div>

        {/* Action Buttons */}
        <div className='flex text-white flex-col items-start px-8 gap-4 mt-6'>
          <button className='flex items-center gap-3 text-lg hover:text-gray-400'>
            <AiOutlineEdit className='text-3xl' /> Edit Profile
          </button>
          <button className='flex items-center gap-3 text-lg hover:text-gray-400'>
            <RiLockPasswordLine className='text-3xl' /> Change Password
          </button>
          <button 
            onClick={handleLogout}
            className='flex items-center gap-3 text-lg hover:text-red-400'
          >
            <FiLogOut className='text-3xl' /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutUser;