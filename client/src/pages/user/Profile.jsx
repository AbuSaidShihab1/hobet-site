import { useState,useEffect } from "react";
import { FaLock } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { RiVipCrownFill } from "react-icons/ri";
import Sidebar from "../../components/Sidebar";
import { BiSupport } from "react-icons/bi";
import { FaBars, FaTimes, FaUser, FaHeart, FaGift, FaCrown, FaTh, FaBolt, FaTrophy, FaMobileAlt, FaFacebook, FaInstagram, FaTelegram, FaEnvelope, FaWifi } from "react-icons/fa";
import Header from "../../components/Header";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
const Profile = () => {
  const [activeTab, setActiveTab] = useState("my-account");
 const [wifiSpeed, setWifiSpeed] = useState(null);
 const [selectedFilters, setSelectedFilters] = useState([]);
 const [dropdownOpen, setDropdownOpen] = useState(false);
 const [calendarOpen, setCalendarOpen] = useState(false);
 const [selectedDates, setSelectedDates] = useState([]);
 const base_url="https://hobet-site.onrender.com";

  const transactions = [
    {
      id: "2486605011",
      date: "11.02.2025",
      time: "14:03",
      type: "Deposit",
      amount: "+600 ৳",
      status: "red",
    },
    {
      id: "2486594771",
      date: "11.02.2025",
      time: "14:01",
      type: "Deposit",
      amount: "+600 ৳",
      status: "red",
    },
    {
      id: "2478061011",
      date: "10.02.2025",
      time: "15:10",
      type: "Deposit",
      amount: "+600 ৳",
      status: "yellow",
    },
  ];
  const games = [
    {
      id: "3486605011",
      date: "11.02.2025",
      time: "14:03",
      game: "Poker",
      result: "+500 ৳",
      status: "win",
    },
    {
      id: "3486594771",
      date: "11.02.2025",
      time: "14:01",
      game: "Blackjack",
      result: "-200 ৳",
      status: "loss",
    },
    {
      id: "3478061011",
      date: "10.02.2025",
      time: "15:10",
      game: "Roulette",
      result: "+300 ৳",
      status: "win",
    },
  ];
 const filters = [
   { category: "All", options: [] },
   { category: "Transaction Type", options: ["Deposit", "Withdraw", "Casino bet"] },
   { category: "Bonus", options: ["Level Up Bonus", "Extra Bonus", "Weekly Bonus", "Monthly Bonus"] }
 ];
 const transactionsData = [
  {
    id: "2486605011",
    date: "11.02.2025",
    time: "14:03",
    type: "Deposit",
    amount: "+600 ৳",
    status: "red",
  },
  {
    id: "2486594771",
    date: "11.02.2025",
    time: "14:01",
    type: "Deposit",
    amount: "+600 ৳",
    status: "red",
  },
  {
    id: "2478061011",
    date: "10.02.2025",
    time: "15:10",
    type: "Deposit",
    amount: "+600 ৳",
    status: "yellow",
  },
];
const user = {
  name: "Shihab",
  email: "shihabmoni77@gmail.com",
  phone: "016844941043",
  pin: "4223",
  currency: "BDT",
  role: "user",
  balance: 0,
  deposit: 0,
  withdraw: 0,
  invest: 0,
  accountId: "394868435",
  birthday: "1970.01.01",
};
const [filter, setFilter] = useState("");

const filteredTransactions = transactionsData.filter((transaction) =>
  transaction.type.toLowerCase().includes(filter.toLowerCase())
);

 const toggleFilter = (filter) => {
   setSelectedFilters((prev) =>
     prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
   );
 };

 const toggleDateSelection = (date) => {
   setSelectedDates((prev) =>
     prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
   );
 };


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
  const user_info=JSON.parse(localStorage.getItem("user"))
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
  return (
   <section className='w-full h-full bg-dark_theme flex justify-center font-bai overflow-hidden'>
    <Sidebar/>
    <section className="w-[100%] xl:w-[80%] xl:px-[20px] xl:py-[20px] h-[100vh] overflow-auto">
   <Header/>
   <div className="bg-gray-800 text-white p-[10px] xl:p-6 xl:border-[2px] border-gray-700 xl:rounded-[5px]">
        {/* Summary Boxes */} 
      {/* <div className="grid grid-cols-4 gap-4 mb-6">
        {["Total Withdraw", "Total Deposit", "Total Loss", "Total Win"].map((title, index) => (
          <div key={index} className="bg-gray-800 p-4 py-[20px] rounded-lg text-center border-[1px] border-gray-700">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-xl font-bold">$0.00</p>
          </div>
        ))}
      </div> */}

      {/* Navigation Tabs */}
      <div className="flex space-x-6 xl:border-b border-gray-700 pb-2">
        {["My account", "Transactions", "Game history"].map((label, index) => (
          <button
            key={index}
            className={`pb-2 ${activeTab === label.toLowerCase().replace(" ", "-") ? "border-b-2 border-yellow-500" : ""}`}
            onClick={() => setActiveTab(label.toLowerCase().replace(" ", "-"))}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Account Section */}
      {activeTab === "my-account" && (
 <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg text-white">
 {/* VIP Progress */}
 <div className="mb-6">
   <h3 className="font-semibold text-lg">Your VIP Progress</h3>
   <div className="relative w-full bg-gray-700 h-2 rounded-full mt-2">
     <div className="w-1/4 bg-yellow-500 h-2 rounded-full"></div>
   </div>
   <div className="flex justify-between mt-1 text-sm text-gray-400">
     <span className="flex items-center gap-2">
       <RiVipCrownFill className="text-green-500" /> Beginner
     </span>
     <span className="flex items-center gap-1">Bronze</span>
   </div>
 </div>

 {/* Profile Info */}
 <div className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg">
   <div className="w-20 h-20 bg-gray-700 rounded-full flex justify-center items-center text-[35px]">
     <FaUser />
   </div>
   <span className="text-xl font-semibold">{user.accountId}</span>
 </div>

 {/* Account Details */}
 <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
   {[
     { label: "Name", value: user_details.name },
     { label: "Account ID", value: user_details._id },
     { label: "Currency", value: "৳" },
     { label: "Email", value: user_details.email },
     { label: "Balance", value: `৳ ${user_details.balance}` },
     { label: "PIN", value: "••••••••" },
     { label: "Password", value: "••••••••" },
   ].map((field, index) => (
     <div
       key={index}
       className="bg-gray-900 p-3 border border-gray-700 rounded flex justify-between items-center"
     >
       <span>{field.label}</span>
       <input
         type={field.label === "Password" || field.label === "PIN" ? "password" : "text"}
         className="bg-transparent text-white border-none outline-none text-right"
         value={field.value}
         readOnly
       />
       {field.label !== "Email" && field.label !== "Phone number" && (
         <FaLock className="text-gray-400" />
       )}
     </div>
   ))}
 </div>

 {/* Logout Button */}
 <button className="mt-6 w-full bg-red-600 hover:bg-red-700 p-3 rounded flex items-center justify-center gap-2 text-lg font-semibold">
   <AiOutlineLogout /> Log out
 </button>
</div>
      )}
      {activeTab=="transactions" && (
        <div>
     <div className="relative w-full text-white flex justify-center items-center gap-[10px] mt-[20px]">
        {/* Filter Dropdown */}
        <div className="p-3 w-[50%] border-gray-700 bg-gray-900 border-[2px] rounded flex items-center justify-between cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <span>{selectedFilters.length > 0 ? selectedFilters.join(", ") : "Select Filters"}</span>
          <IoIosArrowDown className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
        </div>
        {dropdownOpen && (
          <div className="absolute top-[100%] left-0 w-[50%]  bg-gray-900 rounded shadow-lg z-10">
            {filters.map((filterGroup, index) => (
              <div key={index} className="border-b border-gray-700  last:border-0">
                <div className="p-2 font-semibold cursor-pointer" onClick={() => toggleFilter(filterGroup.category)}>
                  {filterGroup.category}
                </div>
                {filterGroup.options.length > 0 && (
                  <div className="pl-4 pb-2">
                    {filterGroup.options.map((option, i) => (
                      <div
                        key={i}
                        className={`p-2 cursor-pointer ${selectedFilters.includes(option) ? "font-bold" : ""}`}
                        onClick={() => toggleFilter(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
  
        {/* Calendar */}
        <div className=" w-[50%] border-[2px] border-gray-700 bg-gray-900  p-3 rounded flex items-center justify-between cursor-pointer" onClick={() => setCalendarOpen(true)}>
          <span>{selectedDates.length > 0 ? selectedDates.join(", ") : "Select Date Range"}</span>
          <FaCalendarAlt />
        </div>
        {calendarOpen && (
          <div className="absolute top-[100%] right-0 w-[50%] bg-gray-900 p-4 rounded shadow-lg z-20">
            <h3 className="text-center font-semibold mb-2">February 2025</h3>
            <div className="grid grid-cols-7 gap-2">
              {[...Array(28)].map((_, i) => (
                <div
                  key={i}
                  className={`p-3 rounded cursor-pointer ${selectedDates.includes(i + 1) ? "border border-green-500" : ""}`}
                  onClick={() => toggleDateSelection(i + 1)}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <button className="w-full bg-green-600 mt-4 p-2 rounded" onClick={() => setCalendarOpen(false)}>Accept</button>
          </div>
        )}
      </div>

<div className="py-4 text-white rounded-xl">
      <input
        type="text"
        placeholder="Search Transactions..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-800 rounded-lg text-white border border-gray-600"
      />
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-2">ID</th>
            <th className="p-2">Date</th>
            <th className="p-2">Time</th>
            <th className="p-2">Type</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id} className="border-b border-gray-700">
              <td className="p-2">{transaction.id}</td>
              <td className="p-2">{transaction.date}</td>
              <td className="p-2">{transaction.time}</td>
              <td className="p-2">{transaction.type}</td>
              <td className="p-2 text-green-400">{transaction.amount}</td>
              <td className={`p-2 ${transaction.status === "red" ? "text-red-500" : "text-yellow-500"}`}>
                ●
              </td>
              <td className="p-2">
                <button className="px-4 py-1 bg-bg5 rounded-[3px]">Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
   
      )}
      {activeTab=="game-history" && (
        <div className="pt-[20px] ">



      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-400 text-sm">
            <th className="pb-2">ID</th>
            <th className="pb-2">Date</th>
            <th className="pb-2">Time</th>
            <th className="pb-2">Game</th>
            <th className="pb-2">Result</th>
            <th className="pb-2">Status</th>
            <th className="pb-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id} className="border-t border-gray-700 text-sm">
              <td className="py-3">{game.id}</td>
              <td>{game.date}</td>
              <td>{game.time}</td>
              <td>{game.game}</td>
              <td className={game.status === "win" ? "text-green-500" : "text-red-500"}>{game.result}</td>
              <td>
                <span 
                  className={`inline-block w-2 h-2 rounded-full ${
                    game.status === "win" ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
              </td>
              <td>
                <button className="bg-cyan-400 text-gray-900 px-3 py-1 rounded">Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
      )}
    </div>
    </section>
   </section>
  );
};

export default Profile;
