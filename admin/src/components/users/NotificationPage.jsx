import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AiOutlineMail } from "react-icons/ai";
import Header from "../common/Header";
import { FiChevronDown } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
export default function NotificationPage() {
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Users");
  const usersData = {
    "All Users": ["user1@example.com", "user2@example.com", "user3@example.com"],
    "Selected Users": ["selected1@example.com", "selected2@example.com"],
    "KYC Unverified Users": ["unverified1@example.com", "unverified2@example.com"],
    "KYC Verified Users": ["verified1@example.com", "verified2@example.com"],
  };

  const user=["user1@example.com", "user2@example.com", "user3@example.com"]
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState("All Users");
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSearch = (e) => setSearch(e.target.value);
  const handleSelect = (user) => {
    setSelectedUser(user);
    setIsOpen(false);
  };

  const filteredUsers = user.filter(user => 
    user.toLowerCase().includes(search.toLowerCase())
  );
  return (
   <section className="w-full bg-gray-100 font-bai">
    <Header/>
    <div className="p-6  w-full flex justify-center">
      <div className="w-full p-6">
        <h2 className="text-[25px] font-semibold text-gray-700 mb-4">
          Notification to Verified Users
        </h2>

      <section className="bg-white p-[30px] rounded-[2px]">
  {/* Send Email Button */}
  <div className="flex items-center justify-start mb-4 ">
          <button className="relative   flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-[5px] shadow-md border-2 border-blue-600">
            <AiOutlineMail className="text-xl" /> Send Via Email
            <div className="absolute top-0 right-0 bg-blue-600 w-6 h-6 rounded-bl-lg"></div>
          </button>
        </div>

        {/* Form Fields */}
        <div>
        <div className="relative w-full  mb-[10px]">
      <label className="block text-[16px] font-medium text-gray-700 mb-[4px]">Being Sent To *</label>
      <div className="relative">
        <button 
          onClick={toggleDropdown} 
          className="w-full p-2 border rounded-md flex justify-between items-center text-gray-700 bg-white"
        >
          {selectedUser}
          <FaChevronDown />
        </button>
        {isOpen && (
          <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
            <input 
              type="text" 
              placeholder="Search..." 
              value={search} 
              onChange={handleSearch} 
              className="w-full p-2 border-b text-gray-700 outline-indigo-600"
            />
            <ul className="max-h-60 overflow-y-auto">
              <li 
                className="p-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                onClick={() => handleSelect("All Users")}
              >
                All Users
              </li>
              {filteredUsers.map((user, index) => (
                <li 
                  key={index} 
                  className="p-2 hover:bg-gray-100 text-gray-700 cursor-pointer"
                  onClick={() => handleSelect(user)}
                >
                  {user}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>

          <label className="block text-[16px] font-medium text-gray-700 mb-[4px]">Subject *</label>
          <input
            type="text"
            placeholder="Subject / Title"
            className="w-full p-2 border rounded-md mt-1"
          />

          <label className="block text-[16px] font-medium mt-[10px] text-gray-700 mb-[4px]">Message *</label>
          <ReactQuill value={message} onChange={setMessage} className="mt-1 h-[300px] text-gray-700 font-bai bg-white" />

   

          <button className="w-full bg-indigo-600 mt-[60px] text-white text-lg py-2 rounded-md  hover:bg-blue-700">
            Submit
          </button>
        </div>
      </section>
      </div>
    </div>
   </section>
  );
}
