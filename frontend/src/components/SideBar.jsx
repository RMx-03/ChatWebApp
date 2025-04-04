import React, { useEffect, useState } from 'react';
import axios from "axios";
import { BiSearch } from 'react-icons/bi';
import userPhoto from '../assets/user.webp'
import { useAuth } from '../context/AuthContext';


function SideBar({ setShowUser, setChatUser }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = storedUser?.token;
        if (!token) {
          throw new Error("No token found in local storage");
        }

        const res = await axios.get("http://localhost:5002/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const filtered = res.data.filter((u) => u._id !== user._id);
        setUsers(filtered);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [user._id]);

  const filteredUsers = users.filter((u) =>
    u.fullName.toLowerCase().includes(search.toLowerCase())
  );

    
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 w-full outline-none"
          />
        </div>
      </div>
      {/* Mid */}
      <div className='w-full max-h-[28rem] mt-2 overflow-y-auto  pt-4 pl-1 pr-1 scrollbar-hide'>
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            onClick={() => setChatUser(user)}
            className="bg-[#C5C6D0] rounded-md p-2  flex items-center gap-3 mb-3 shadow-md"
          >
            {/* User Image */}
            <img
              src={user.profilePic || userPhoto}
              alt={user.fullName}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-500"
            />
            {/* User Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{user.fullName}</h3>
              <p className="text-sm text-gray-600">{user.lastMessage || "No recent messages"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* End */}
      <div className='w-full    pt-2 pb-2'>
        <div 
          onClick={()=> setShowUser(true)} 
          className='w-full flex  items-center gap-5 bg-[#C5C6D0]  rounded-2xl p-1 '
        >
          <img 
            src={user?.profilePic || userPhoto} 
            onError={(e) => { e.target.src = userPhoto }}
            alt="user-img" 
            loading='lazy' 
            className=' w-[4.8em] h-[3.2em] ' 
          />
          <p className=' text-[1.2em] font-bold '>{user?.fullName || "Your Profile"}</p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
