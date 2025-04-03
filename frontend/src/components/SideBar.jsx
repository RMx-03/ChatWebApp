import React from 'react';
import { BiSearch } from 'react-icons/bi';
import userPhoto from '../assets/user.webp'

function SideBar({setShowUser}) {
    const usersData = [
        {
            userId: 1,
            userImage: "https://randomuser.me/api/portraits/men/1.jpg",
            username: "John Doe",
            lastMessage: "Hey! How are you?"
        },
        {
            userId: 2,
            userImage: "https://randomuser.me/api/portraits/women/2.jpg",
            username: "Emma Watson",
            lastMessage: "Let's meet tomorrow!"
        },
        {
            userId: 3,
            userImage: "https://randomuser.me/api/portraits/men/3.jpg",
            username: "Michael Smith",
            lastMessage: "I'll call you later."
        },
        {
            userId: 4,
            userImage: "https://randomuser.me/api/portraits/women/4.jpg",
            username: "Sophia Brown",
            lastMessage: "Got it! Thanks."
        },
        {
            userId: 5,
            userImage: "https://randomuser.me/api/portraits/men/5.jpg",
            username: "David Johnson",
            lastMessage: "Where are you?"
        },
        {
            userId: 4,
            userImage: "https://randomuser.me/api/portraits/women/4.jpg",
            username: "Sophia Brown",
            lastMessage: "Got it! Thanks."
        },
        {
            userId: 5,
            userImage: "https://randomuser.me/api/portraits/men/5.jpg",
            username: "David Johnson",
            lastMessage: "Where are you?"
        }
    ];

    
  return (
    <div className="w-[20em] h-screen bg-[#2f3141] rounded-lg p-3">
      {/* Top Section */}
      <div className="w-full flex flex-col items-center">
        <h3 className="text-3xl text-white">Chat</h3>
        <div className="h-[0.1em] w-[98%] mt-6 bg-gray-500 rounded-full"></div>

        <button className="bg-[#C5C6D0] px-11 py-1 text-[1.5rem] rounded-lg mt-3 hover:bg-[#677081] transition hover:cursor-pointer ">
          + Create New
        </button>

        {/* Search Bar */}
        <div className="mt-2 w-[98%] h-10 bg-white flex items-center px-2 rounded-md  ">
          <BiSearch className="text-gray-600 text-xl" />
          <input
            type="text"
            placeholder="Search Name"
            className="p-2 w-full outline-none"
          />
        </div>
      </div>
      {/* Mid */}
      <div className='w-full max-h-[28rem] mt-2 overflow-y-auto  pt-4 pl-1 pr-1 scrollbar-hide  '>
      {usersData.map((user) => (
        <div
          key={user.userId}
          className="bg-[#C5C6D0] rounded-md p-2  flex items-center gap-3 mb-3 shadow-md"
        >
          {/* User Image */}
          <img
            src={user.userImage}
            alt={user.username}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-500"
          />
          {/* User Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{user.username}</h3>
            <p className="text-sm text-gray-600">{user.lastMessage}</p>
          </div>
        </div>
      ))}
      </div>
      {/* End */}
      <div className='w-full    pt-2 pb-2'>
        <div onClick={()=> setShowUser(true)} className='w-full flex  items-center gap-5 bg-[#C5C6D0]  rounded-2xl p-1 '>
            <img src={userPhoto} alt="user-img" loading='lazy' className=' w-[4.8em] h-[3.2em] ' />
            <p className=' text-[1.2em] font-bold '>Divyanshu</p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
