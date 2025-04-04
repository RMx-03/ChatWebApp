import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import userPhoto from '../assets/user.webp';
import { updateUserProfile } from '../api/api.js';

function AboutUser({ setShowUser }) {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    newPassword: '',
    profilePic: '',
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload(); // full refresh
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, profilePic: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        newpassword: formData.newPassword,
        profilePic: formData.profilePic,
      };

      const { data } = await updateUserProfile(payload);

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setEditMode(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    }
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

        {editMode ? (
          <>
            <div className='flex flex-col text-white items-center my-4'>
              <img
                src={formData.profilePic || user?.profilePic || userPhoto}
                alt='User'
                className='w-32 h-32 rounded-full border-2 border-gray-700 object-cover'
              />
              <h2 className='text-xl font-semibold mt-2'>Edit Profile</h2>
            </div>


            <form 
              onSubmit={handleSubmit}
              className='flex flex-col gap-4 text-white px-8' 
            >
              <input 
                type='text'
                placeholder='Full Name'
                value={formData.fullName}
                onChange={(e) => 
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className='p-2 rounded text-black'
              />

              <input            
                type='email'
                placeholder='Email'
                value={formData.email}
                onChange={(e) => 
                  setFormData({ ...formData, email: e.target.value })
                }
                className='p-2 rounded text-black'
              />

              <input
                type='password'
                placeholder='New Password (optional)'
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                className='p-2 rounded text-black'
              /> 

              <input
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
                className='text-white'
              />

              <div className='flex gap-4 justify-between'>
                <button 
                  type='submit'
                  className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'
                >
                  Save
                </button>
                <button
                  type='button'
                  onClick={() => setEditMode(false)}
                  className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded'
                >
                  Cancel
                </button>
              </div>              
            </form>
          </>
        ) : (
          <>
            {/* Profile View */}
            <div className='flex flex-col text-white items-center my-4'>
              <img 
                src={user?.profilePic || userPhoto}
                alt='User'
                className='w-32 h-32 rounded-full border-2 border-gray-700 object-cover'
              />
              <h2 className='text-xl font-semibold mt-2'>
                {user?.fullName}
              </h2>
              <p className='text-gray-200'>{user?.email}</p>
            </div>

            {/* Action Buttons */}
            <div className='flex text-white flex-col items-start px-8 gap-4 mt-6'>
              <button
                onClick={() => setEditMode(true)}
                className='flex items-center gap-3 text-lg hover:text-gray-400'
              >
                <AiOutlineEdit className='text-3xl' /> Edit Profile
              </button>
              
              <button
                onClick={handleLogout}
                className='flex items-center gap-3 text-lg hover:text-red-400'
              >
                <FiLogOut className='text-3xl' /> Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AboutUser;