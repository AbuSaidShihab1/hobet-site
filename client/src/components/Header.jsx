import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { BiSupport } from "react-icons/bi";
import { FaBars, FaTimes, FaUser, FaHeart, FaGift, FaCrown, FaTh, FaBolt, FaTrophy, FaMobileAlt, FaFacebook, FaInstagram, FaTelegram, FaEnvelope, FaWifi } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router';
import AuthModal from './modal/AuthModal';
import { BsChatDotsFill } from "react-icons/bs";
import { motion } from "framer-motion";
import Confetti from 'react-confetti';
import Logo from './Logo';
const Header = () => {
  const user_info=JSON.parse(localStorage.getItem("user"))
 const [wifiSpeed, setWifiSpeed] = useState(null);
 const [dropdownOpen, setDropdownOpen] = useState(false);
 const [isModalOpen, setModalOpen] = useState(false);
 const base_url="https://hobet-site.onrender.com";

  const navigate=useNavigate();
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
    const [user_details,set_userdetails]=useState([])
    const user_data=()=>{
      axios.get(`${base_url}/auth/user/${user_info?._id}`)
      .then((res)=>{
        console.log(res)
        if(res.data.success){
          set_userdetails(res.data.user)
        }
      }).catch((err)=>{
        console.log(err)
      })
    }   
    useEffect(()=>{
      user_data();
    },[])
    // ----logout function-------------------
       // logout funtion 
       const logoutfunction=()=>{
        toast.success("Logout Successfully!");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/")
    }
    const handlelogin=()=>{
      setModalOpen(true)
    }
    const handlesignup=()=>{
      setModalOpen(true);

    }
    const [isOpen, setIsOpen] = useState(false);
    // ----------------welcome-animation-------------------
  return (
    <div className='xl:py-[20px]'>
    <div className="bg-gray-800 border-[2px] hidden xl:flex border-gray-700 rounded-[5px] text-white p-4  justify-between items-center">
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
              {/* Wi-Fi Speed Display */}
              <div className="text-center text-white">
                <div className="flex items-center justify-center space-x-2">
                  <FaWifi className="text-xl" />
                  {wifiSpeed !== null ? (
                    <span>{`Wi-Fi Speed: ${wifiSpeed.toFixed(2)} Mbps`}</span>
                  ) : (
                    <span>Fetching Wi-Fi Speed...</span>
                  )}
                </div>
              </div>

        {/* Hamburger Icon */}
        {/* <div className="text-white text-xl cursor-pointer">
          <i className="fa fa-bars"></i>
          
        </div> */}
      </div>

      {/* Center - Empty, can be filled with logo or text */}


      {/* Right side - Login/Sign Up and Help */}
     {
      user_info ? <div className='flex justify-center items-center gap-[20px]'>
            <div className='border-[2px] border-gray-700 rounded-[5px] px-[20px] py-[10px] flex justify-between items-center gap-[10px]'>
              <h2 className='font-semibold'>Balance :</h2>
               <div className='flex justify-center items-center gap-[3px]'>
               <p>{user_details.balance?.toFixed(2)}</p>

                {
                  user_info.currency=="BTC" ? <img className='w-[25px] ml-[5px] rounded-full' src="https://elon.casino/icons-elon/payments/1.svg" alt="" />:""
                }
                        {
                  user_info.currency=="USDT" ? <img className='w-[25px] ml-[5px] rounded-full' src="https://elon.casino/icons-elon/payments/9.svg" alt="" />:""
                }
                        {
                  user_info.currency=="BDT" ? <img className='w-[25px] ml-[5px] rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQlLX94-uTEPQwlm7l69MF-P72nXIEhTmDmA&s" alt="" />:""
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
        <h2 className="text-[18px] font-[500]">{user_info.name}</h2>
      </div>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-[250px] bg-gray-800 border-[2px] border-gray-700 z-[100] rounded-lg shadow-lg">
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
      </div>: <div className="flex items-center space-x-5">
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
      <Logo/>
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
                  user_info.currency=="BTC" ? <img className='w-[25px] ml-[5px] rounded-full' src="https://elon.casino/icons-elon/payments/1.svg" alt="" />:""
                }
                        {
                  user_info.currency=="USDT" ? <img className='w-[25px] ml-[5px] rounded-full' src="https://elon.casino/icons-elon/payments/9.svg" alt="" />:""
                }
                        {
                  user_info.currency=="BDT" ? <img className='w-[25px] ml-[5px] rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQlLX94-uTEPQwlm7l69MF-P72nXIEhTmDmA&s" alt="" />:""
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
      </div>: <div className="flex items-center space-x-5">

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
