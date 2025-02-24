import axios from 'axios';
import React, { useState, useEffect, useReducer } from 'react'
import { BiSupport } from "react-icons/bi";
import { FaBars, FaTimes, FaUser, FaHeart, FaGift, FaCrown, FaTh, FaBolt, FaTrophy, FaMobileAlt, FaFacebook, FaInstagram, FaTelegram, FaEnvelope, FaWifi } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router';
import AuthModal from './modal/AuthModal';
import { BsChatDotsFill } from "react-icons/bs";
import { motion } from "framer-motion";
import Confetti from 'react-confetti';
import { FaAngleDown } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import fire_gif from "../assets/fire.gif"
import Logo from './Logo';
// Reducer function for managing sidebar state
function sidebarReducer(state, action) {
  switch (action.type) {
    case "OPEN":
      return true;
    case "CLOSE":
      return false;
    case "TOGGLE":
      return !state;
    default:
      return state;
  }
}
const Header = () => {
  const user_info = JSON.parse(localStorage.getItem("user"))
  const [wifiSpeed, setWifiSpeed] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const base_url = "https://hobet-site.onrender.com";
  const [isSidebarOpen, dispatch] = useReducer(sidebarReducer, false);
  const navigate = useNavigate();
  useEffect(() => {
    // Check the connection speed using the navigator.connection API
    if (navigator.connection) {
      const connection = navigator.connection;
      setWifiSpeed(connection.downlink); // Get the current downlink speed in Mbps

      // Listen to changes in network speed
      const updateSpeed = () => {
        setWifiSpeed(connection.downlink);
      };

      connection.addEventListener("change", updateSpeed);
      return () => connection.removeEventListener("change", updateSpeed);
    }
  }, []);
  const [user_details, set_userdetails] = useState([])
  const [currency, setCurrency] = useState("BDT");
  const user_data = () => {
    axios.get(`${base_url}/auth/user/${user_info?._id}`)
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          set_userdetails(res.data.user)
        }
      }).catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    user_data();
  }, [])
  // ----logout function-------------------
  // logout funtion 
  const logoutfunction = () => {
    toast.success("Logout Successfully!");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/")
  }
  const handlelogin = () => {
    setModalOpen(true)
  }
  const handlesignup = () => {
    setModalOpen(true);

  }
  const [isOpen, setIsOpen] = useState(false);
  // ----------------welcome-animation-------------------
  return (
    <div className=' sticky top-0 bg-gray-900 shadow-xl border-b-[1px] border-gray-700 left-0 z-[10000]'>
      <div className=" hidden xl:flex  text-white p-4  justify-between items-center">
        {/* Left side - Flag and Menu */}
        <div className="fixed bottom-6 right-6 z-50">
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="w-80 h-96 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 text-white flex justify-between items-center">
                <span className="font-semibold">Welcome to Hobet Games 👋</span>
                <button onClick={() => setIsOpen(false)} className="text-lg">✖</button>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">We reply immediately</div>
              <div className="p-2 border-t flex items-center">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 p-2 border text-gray-700 rounded-md focus:outline-none"
                />
                <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg">➤</button>
              </div>
            </motion.div>
          ) : (
            <div
              onClick={() => setIsOpen(true)}
              className="flex items-center justify-center w-14 h-14 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full shadow-lg cursor-pointer hover:scale-105 transition-transform"
            >
              <BsChatDotsFill className="text-white text-2xl" />
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {/* Left Side: Navigation Links */}
          <div className="flex justify-between items-center w-full px-6 py-3 bg-gray-900">
            {/* Left-side navigation */}
            <ul className="flex items-center gap-6 text-white text-sm font-medium">
              <NavLink to="/" className="hover:text-blue-400 text-[16px] text-nowrap">Home</NavLink>
              <NavLink to="/live" className="hover:text-blue-400 text-[16px] text-nowrap">Live</NavLink>
              <NavLink to="/sports" className="hover:text-blue-400 text-[16px] text-nowrap">Sports</NavLink>
              <NavLink to="/casino" className="hover:text-blue-400 text-[16px] text-nowrap">Casino</NavLink>
              <NavLink to="/poker" className="hover:text-blue-400 text-[16px] text-nowrap">Poker</NavLink>
              <NavLink to="/esports" className="hover:text-blue-400 text-[16px] text-nowrap">eSports</NavLink>
              <NavLink to="/twain-sport" className="hover:text-blue-400 text-[16px] text-nowrap">Twain Sport</NavLink>
            </ul>

            {/* Right-side navigation */}
            <ul className="flex items-center gap-6 text-white text-sm font-medium">
              <NavLink to="/promotions" className="hover:text-yellow-400 text-[16px] flex items-center gap-1">
                Promotions
                 🔥
              </NavLink>
              <NavLink to="/vip" className="hover:text-yellow-400 text-[16px] flex items-center gap-1">
                VIP
                🔥
              </NavLink>
            </ul>
          </div>

          {/* Hamburger Icon */}
          {/* <div className="text-white text-xl cursor-pointer">
          <i className="fa fa-bars"></i>
          
        </div> */}
        </div>

        {/* Center - Empty, can be filled with logo or text */}


        {/* Right side - Login/Sign Up and Help */}
        {
          user_info ? <div className="flex justify-center bg-gray-900 p-3 rounded-xl w-fit space-x-3 text-white shadow-lg">
            {/* Balance Section */}
            <div className="flex items-center bg-gray-800 px-4 py-2 rounded-[4px] space-x-2 shadow-md">
              <span className="text-gray-400 text-[15px] font-[500] flex items-center">{currency} <IoIosArrowDown className="ml-1" /></span>
              <span className="text-[15px] font-[500]">{user_details.balance?.toFixed(2)}</span>
              <button className="bg-bg2 hover:bg-bg2 transition text-[15px] font-[500] text-white px-4 py-2 rounded-[4px] shadow">Deposit</button>
            </div>

            {/* User Section */}
            <div className="relative cursor-pointer text-left">
              <div
              className="flex items-center h-full bg-gray-800 px-[15px] p-3 rounded-[4px]  relative shadow-md hover:bg-gray-700 transition"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
              <FaUser className="text-gray-400 text-[19px]" />
              {/* <FiMoreVertical className="text-gray-400 ml-3 text-lg" /> */}
              {/* <span className="absolute top-1 right-1 bg-orange-500 h-3 w-3 rounded-full"></span> */}

                {/* <h2 className="text-[18px] font-[500]">{user_info.name}</h2> */}
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-[230px] bg-gray-800 border-[2px] border-gray-700 z-[100] rounded-lg shadow-lg">
                  <div className="p-4 border-b border-gray-700">
                    <p className="font-semibold">{user_info.name}</p>
                    <p className="text-sm text-orange-400">{user_info.email}</p>
                  </div>
                  <ul className="py-2">
                    <NavLink to="/profile">
                      <li className="px-4 py-2 hover:bg-gray-100 hover:text-gray-700 cursor-pointer flex items-center">
                        🚀 My Profile
                      </li>
                    </NavLink>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer hover:text-gray-700 flex items-center">
                      💰 Wallet
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer hover:text-gray-700 flex items-center">
                      🔄 Transactions
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer hover:text-gray-700 flex items-center">
                      🌟 VIP Club
                    </li>
                    <li onClick={logoutfunction} className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer flex items-center">
                      ⬅️ Logout
                    </li>
                  </ul>

                  {/* <div className="border-t border-gray-700">
            <button onClick={logoutfunction} className="w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-gray-700">Sign Out</button>
          </div> */}
                </div>
              )}
            </div>
     
            {/* Notification Section */}
            <div className="relative">
      {/* Bell Icon */}
      <div
        className="flex items-center bg-gray-800 h-full px-[15px] p-3 rounded-[4px] relative shadow-md hover:bg-gray-700 transition cursor-pointer"
        onClick={() => dispatch({ type: "OPEN" })}
      >
        <FaBell className="text-gray-400 text-[19px]" />
        <span className="absolute top-1 right-1 bg-bg5 h-2 w-2 rounded-full"></span>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-[20%] z-[10000] h-full bg-white shadow-lg transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
          <FaTimes
            className="text-gray-500 cursor-pointer"
            onClick={() => dispatch({ type: "CLOSE" })}
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-4">
          <button className="px-4 py-2 bg-bg5 text-white rounded-[4px] text-[16px] font-[500]">
            All
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800 text-[16px] font-[500]">General</button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800 text-[16px] font-[500]">Personal</button>
        </div>

        {/* Notification */}
        <div className="p-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600 text-[16px] font-[500]">2/24/2025</p>
            <h3 className="font-semibold text-bg1">Welcome to HoBet 🎉</h3>
            <img
              src="https://imgproxy.v1.bundlecdn.com/unsafe/cdp_notification_feed_main_3x/plain/https://cache-1.control-cdp.top/static/fe211c36-d82f-4830-9956-e4da2763d0a5@avif"
              alt="Bonus"
              className="w-full rounded-lg my-2"
            />
            <p className="text-sm text-gray-600 text-[18px] font-[500]">
              Confirm your email to learn about vouchers, bonuses, and
              promotions!
            </p>
            <button className="mt-2 w-full bg-bg5 text-white py-2 rounded-[4px]">
              Confirm email
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => dispatch({ type: "CLOSE" })}
        ></div>
      )}
    </div>
          </div> : <div className="flex items-center space-x-5">
            <div className="relative w-[40px] h-[40px] bg-green-600 flex items-center justify-center rounded-full shadow-lg">
              <div className="w-[20px] h-[20px] bg-red-600 rounded-full"></div>
            </div>
            {/* Login / Sign Up */}
            <div className="flex space-x-2">
              <button onClick={handlelogin} className="px-6 py-2 text-white text-[16px] font-semibold bg-blue-500 rounded-lg shadow-[0_0_10px_#3b82f6] transition duration-300 hover:shadow-[0_0_20px_#3b82f6]">
                Login
              </button>
              <AuthModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

              <button onClick={handlesignup} className="px-6 py-2 text-white text-[16px] font-semibold bg-green-500 rounded-lg shadow-[0_0_10px_#22c55e] transition duration-300 hover:shadow-[0_0_20px_#22c55e]">
                Registration
              </button>
            </div>

            {/* Help Icon */}
            <div className="text-white text-xl cursor-pointer p-[10px] rounded-full bg-gray-700 text-[30px]">
              <BiSupport />
            </div>
          </div>
        }
      </div>
      {/* ------------------------mobile-version--------------------------- */}
      <div className="bg-gray-800  flex xl:hidden  mb-[10px] text-white p-4  justify-between items-center">
        {/* Left side - Flag and Menu */}
        <Logo />
        <div className="fixed bottom-6 right-6 flex z-[100] items-center justify-center w-14 h-14 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full shadow-lg cursor-pointer hover:scale-105 transition-transform">
          <BsChatDotsFill className="text-white text-2xl" />
        </div>

        {/* Right side - Login/Sign Up and Help */}
        {
          user_info ? <div className='flex justify-center items-center gap-[10px]'>
            <div className=' px-[20px] py-[10px] flex justify-between items-center gap-[4px]'>
              <h2 className='font-semibold'>Balance :</h2>
              <div className='flex justify-center items-center gap-[3px]'>
                <p>{user_details.balance?.toFixed(4)}</p>

                {
                  user_info.currency == "BTC" ? <img className='w-[25px] ml-[5px] rounded-full' src="https://elon.casino/icons-elon/payments/1.svg" alt="" /> : ""
                }
                {
                  user_info.currency == "USDT" ? <img className='w-[25px] ml-[5px] rounded-full' src="https://elon.casino/icons-elon/payments/9.svg" alt="" /> : ""
                }
                {
                  user_info.currency == "BDT" ? <img className='w-[25px] ml-[5px] rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQlLX94-uTEPQwlm7l69MF-P72nXIEhTmDmA&s" alt="" /> : ""
                }
              </div>

            </div>
            <div className="relative inline-block text-left">
              <div
                className="flex justify-center items-center flex-col gap-1 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="text-white text-xl p-2 rounded-full bg-gray-700 text-[30px]">
                  <FaUser />
                </div>
                {/* <h2 className="text-[18px] font-[500]">{user_info.name}</h2> */}
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-[230px] bg-gray-800 border-[2px] border-gray-700 z-[100] rounded-lg shadow-lg">
                  <div className="p-4 border-b border-gray-700">
                    <p className="font-semibold">{user_info.name}</p>
                    <p className="text-sm text-orange-400">{user_info.email}</p>
                  </div>
                  <ul className="py-2">
                    <NavLink to="/profile">
                      <li className="px-4 py-2 hover:bg-gray-100 hover:text-gray-700 cursor-pointer flex items-center">
                        🚀 My Profile
                      </li>
                    </NavLink>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer hover:text-gray-700 flex items-center">
                      💰 Wallet
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer hover:text-gray-700 flex items-center">
                      🔄 Transactions
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer hover:text-gray-700 flex items-center">
                      🌟 VIP Club
                    </li>
                    <li onClick={logoutfunction} className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer flex items-center">
                      ⬅️ Logout
                    </li>
                  </ul>

                  {/* <div className="border-t border-gray-700">
            <button onClick={logoutfunction} className="w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-gray-700">Sign Out</button>
          </div> */}
                </div>
              )}
            </div>
          </div> : <div className="flex items-center space-x-5">

            {/* Login / Sign Up */}
            <div className="flex space-x-2">
              <button onClick={handlelogin} className="px-4 lg:px-6 py-2 text-white text-[14px] lg:text-[16px] font-semibold bg-blue-500 rounded-lg shadow-[0_0_10px_#3b82f6] transition duration-300 hover:shadow-[0_0_20px_#3b82f6]">
                Login
              </button>
              <AuthModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

              <button onClick={handlesignup} className="px-4 lg:px-6 py-2 text-white text-[14px] lg:text-[16px] font-semibold bg-green-500 rounded-lg shadow-[0_0_10px_#22c55e] transition duration-300 hover:shadow-[0_0_20px_#22c55e]">
                Registration
              </button>
            </div>


          </div>
        }
      </div>
      {/* -----------------------mobile-version---------------------------- */}
    </div>
  )
}

export default Header
