import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

export default function ChatList({ onUserSelect }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const getConversations = async () => {
    if (!currentUser) return;
    try {
      const response = await fetch("/api/conversation/existing", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fetchedUsers = await response.json();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Failed to fetch user list:", error);
    }
  };

  useEffect(() => {
    getConversations();
  }, [currentUser]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = searchTerm
    ? users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users;

  return (
    <div className="w-1/3 mb-10 bg-white mt-10 p-4 overflow-auto rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Chats</h2>
      <div className="flex items-center border border-slate-300 rounded-2xl p-2 w-2/3">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          placeholder="Search"
          className="rounded-2xl text-black flex-1 outline-none focus:bg-white"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <ul>
        {filteredUsers.map((user) => (
          <li
            key={user._id}
            className="p-2 m-2 hover:bg-gray-200  flex items-center cursor-pointer"
            onClick={() => onUserSelect(user._id, user.username)}
          >
            <img
              src={user.avatar}
              alt={user.username}
              className="h-10 w-10 rounded-full mr-2"
            />
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}
