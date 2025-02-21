import React,{useState} from 'react';
import { FaCheck, FaEdit, FaHeart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import Header from '../common/Header';
import { RiComputerLine } from "react-icons/ri";
const Activeuser = () => {
    const users = [
        {
          name: "Faisal zaki",
          username: "@faisalzaki",
          email: "[Email is protected for the demo]",
          mobile: "[Mobile is protected for the demo]",
          country: "PK",
          joinedAt: "2025-02-13 06:25 AM",
          joinedAgo: "32 minutes ago",
          balance: "$0.20 USD",
        },
        {
          name: "nara smile",
          username: "@laohu88",
          email: "[Email is protected for the demo]",
          mobile: "[Mobile is protected for the demo]",
          country: "KH",
          joinedAt: "2025-02-13 04:12 AM",
          joinedAgo: "2 hours ago",
          balance: "$10.00 USD",
        },
        {
          name: "hello ji",
          username: "@team69",
          email: "[Email is protected for the demo]",
          mobile: "[Mobile is protected for the demo]",
          country: "IN",
          joinedAt: "2025-02-13 03:37 AM",
          joinedAgo: "3 hours ago",
          balance: "$0.00 USD",
        },
        {
          name: "Ano Ano",
          username: "@codewithano",
          email: "[Email is protected for the demo]",
          mobile: "[Mobile is protected for the demo]",
          country: "ZA",
          joinedAt: "2025-02-12 07:35 PM",
          joinedAgo: "11 hours ago",
          balance: "$10.00 USD",
        },
        {
          name: "Sahhjjadeep Bhattdxfgjnacharyya",
          username: "@sahadrkaushikgmail",
          email: "[Email is protected for the demo]",
          mobile: "[Mobile is protected for the demo]",
          country: "IN",
          joinedAt: "2025-02-12 06:35 PM",
          joinedAgo: "12 hours ago",
          balance: "$8.20 USD",
        },
        {
          name: "Maher Laiii",
          username: "@m_8494003",
          email: "[Email is protected for the demo]",
          mobile: "[Mobile is protected for the demo]",
          country: "SY",
          joinedAt: "2025-02-12 06:22 PM",
          joinedAgo: "12 hours ago",
          balance: "$1,900.50 USD",
        },
        {
          name: "DARSHAN VERMA",
          username: "@versionsoftech",
          email: "[Email is protected for the demo]",
          mobile: "[Mobile is protected for the demo]",
          country: "IN",
          joinedAt: "2025-02-12 06:01 PM",
          joinedAgo: "12 hours ago",
          balance: "$0.00 USD",
        },
        {
          name: "Mgyff Ngfyfy",
          username: "@",
          email: "[Email is protected for the demo]",
          mobile: "[Mobile is protected for the demo]",
          country: "SY",
          joinedAt: "2025-02-12 05:28 PM",
          joinedAgo: "13 hours ago",
          balance: "$0.00 USD",
        },
        {
          name: "Maher Lll",
          username: "@",
          email: "[Email is protected for the demo]",
          mobile: "[Mobile is protected for the demo]",
          country: "SY",
          joinedAt: "2025-02-12 05:10 PM",
          joinedAgo: "13 hours ago",
          balance: "$0.00 USD",
        },
      ];

  const [searchQuery, setSearchQuery] = useState('');
  const filterusers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className=" w-full font-bai">
      <Header/>
          <section className="p-4  ">
            <div className="p-6">
              <div className="w-full  p-4">
                <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Active Users</h1>

                  <div className="relative w-[30%]">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div className="overflow-x-auto">
      <table className="w-full border-collapse shadow-xl bg-white border-[1px] border-[#eee] rounded-md overflow-hidden">
        <thead>
          <tr className="bg-[#4634FF] text-white">
            <th className="py-3 px-4 text-left">User</th>
            <th className="py-3 px-4 text-left">Email-Mobile</th>
            <th className="py-3 px-4 text-left">Country</th>
            <th className="py-3 px-4 text-left">Joined At</th>
            <th className="py-3 px-4 text-left">Balance</th>
            <th className="py-3 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterusers.map((user, index) => (
            <tr key={index} className="border-b even:bg-gray-50">
              <td className="py-3 px-4 text-gray-800">
                <strong>{user.name}</strong>
                <br />
                <span className="text-gray-600">{user.username}</span>
              </td>
              <td className="py-3 px-4 text-gray-800">
                <span>{user.email}</span>
                <br />
                <span className="text-gray-600">{user.mobile}</span>
              </td>
              <td className="py-3 px-4 text-gray-800 font-[600]">{user.country}</td>
              <td className="py-3 px-4 text-gray-800">
                <span className='font-[600] text-[14px]'>{user.joinedAt}</span>
                <br />
                <span className="text-gray-600">{user.joinedAgo}</span>
              </td>
              <td className="py-3 px-4 text-gray-800 font-[600]">{user.balance}</td>
              <td className="py-3 px-4 flex items-center space-x-2">
                <button className="flex items-center border-[1px] border-blue-500 px-[10px] py-[4px] rounded-[5px] text-blue-500 hover:text-blue-600">
                  <RiComputerLine className="mr-1" /> Details
                </button>
              </td> 
              {/* <td className="py-3 px-4 text-gray-800">{game.userSelect}</td>
              <td className="py-3 px-4 text-gray-800">
                {Array.isArray(game.result) ? game.result.join(", ") : game.result}
              </td>
              <td className="py-3 px-4 text-gray-800">{game.invest}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    game.winOrFail === "Win"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {game.winOrFail}
                </span>
              </td>
              <td className="py-3 px-4 flex items-center space-x-2">
                <button className="flex items-center border-[1px] border-blue-500 px-[10px] py-[4px] rounded-[5px] text-blue-500 hover:text-blue-600">
                  <AiOutlineEdit className="mr-1" /> Edit
                </button>
                <button className="flex items-center text-red-500 hover:text-red-600 border border-red-600 px-[10px] py-[4px] rounded-[5px]">
                  <AiOutlineDelete className="mr-1" /> Disable
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
              </div>
            </div>
          </section>
    </div>
  );
};

export default Activeuser;