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
import { FaBell, FaChevronDown } from "react-icons/fa";
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

 const [activeSection, setActiveSection] = useState("personal-info");
 const [expandedSections, setExpandedSections] = useState({});

 const toggleSection = (section) => {
   setExpandedSections((prev) => ({
     ...prev,
     [section]: !prev[section],
   }));
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
    <section className="w-[100%] xl:w-[82%]  xl:pb-[20px] h-[100vh] overflow-auto">
   <Header/>
   <div className="bg-gray-800 text-white xl:px-[20px] mt-[20px] p-[10px] xl:p-6 xl:border-[2px] border-gray-700 xl:rounded-[5px]">
   <div className="flex  min-h-screen">
      {/* Sidebar */}
      <aside className="w-64  shadow-md p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 bg-yellow-500 flex items-center justify-center rounded-full">
            <FaUser className="text-white text-xl" />
          </div>
          <div>
            <h3 className="font-bold">{user_details.name}</h3>
            {/* <span className="text-sm bg-yellow-200 text-yellow-800 px-2 py-1 rounded">{user_details.email}</span> */}
          </div>
        </div>
        <div className="mb-5 p-3 border-[2px] border-gray-700 rounded-[5px]">
          <p className="text-[18px] font-[600] text-bg5">Real money</p>
          <p className="font-bold text-white">৳0.00</p>
        </div>
        <div className="mb-5 p-3 border-[2px] border-gray-700 rounded-[5px]">
          <p className="text-sm">Bonus money</p>
          <p className="font-bold">৳0.00</p>
        </div>
        {/* Sidebar Links */}
        <nav>
          <h4 className="font-bold mb-2">My account</h4>
          <button 
            className={`w-full flex justify-between px-3 py-[10px] rounded-[5px] ${activeSection === "personal-info" ? "bg-bg5" : "hover:bg-bg4"}`}
            onClick={() => setActiveSection("personal-info")}
          >
            Personal info
          </button>
          <button 
            className={`w-full mt-[10px] flex justify-between px-3 py-[10px] rounded-[5px] ${activeSection === "Transactions" ? "bg-bg5" : "hover:bg-bg4"}`}
            onClick={() => setActiveSection("personal-info")}
          >
            Transactions
          </button>
          <button 
            className={`w-full mt-[10px] flex justify-between px-3 py-[10px] rounded-[5px] ${activeSection === "Game History" ? "bg-bg5" : "hover:bg-bg4"}`}
            onClick={() => setActiveSection("personal-info")}
          >
            Game History
          </button>
          <button 
            className={`w-full mt-[10px] flex justify-between px-3 py-[10px] rounded-[5px] ${activeSection === "Change Password" ? "bg-bg5" : "hover:bg-bg4"}`}
            onClick={() => setActiveSection("Change Password")}
          >
            Change Password
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1  p-10 shadow-md">
        <h2 className="text-2xl font-bold mb-5">Personal info</h2>
        <form className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm">Username</label>
            <input type="text" className="w-full p-2 bg-gray-800 border-[2px] border-gray-700 mt-[5px] rounded-[4px]" defaultValue={user_details.name} />
          </div>
          <div>
            <label className="block text-sm">Email</label>
            <input type="email" className="w-full p-2 bg-gray-800 border-[2px] border-gray-700 mt-[5px] rounded-[4px]"  defaultValue={user_details.email} />
          </div>
          <div>
            <label className="block text-sm">Player ID</label>
            <input type="text" className="w-full p-2 bg-gray-800 border-[2px] border-gray-700 mt-[5px] rounded-[4px]"  defaultValue={user_details.player_id} />
          </div>
          <div>
            <label className="block text-sm">Currency</label>
            <input type="text" className="w-full p-2 bg-gray-800 border-[2px] border-gray-700 mt-[5px] rounded-[4px]"  defaultValue="BDT" />
          </div>
          <div>
            <label className="block text-sm">Country</label>
            <input type="text" className="w-full p-2 bg-gray-800 border-[2px] border-gray-700 mt-[5px] rounded-[4px]"  defaultValue="Bangladesh" />
          </div>
          <div>
            <label className="block text-sm">ID</label>
            <input type="text" className="w-full p-2 bg-gray-800 border-[2px] border-gray-700 mt-[5px] rounded-[4px]"  defaultValue={user_details._id} />
          </div>
          <div>
            <label className="block text-sm">Referal Code</label>
            <input type="text" className="w-full p-2 bg-gray-800 border-[2px] border-gray-700 mt-[5px] rounded-[4px] text-bg5" defaultValue={`https://hobet.com/`+user_details.referralCode}/>
          </div>
      
          {/* <div className="col-span-2 flex items-center gap-3">
            <input type="checkbox" className="w-5 h-5" />
            <label>I would like to receive news, promotional material and other information from the casino and its affiliates.</label>
          </div>
          <div className="col-span-2">
            <button className="w-full bg-yellow-500 p-3 text-black font-bold rounded-md">SUBMIT</button>
          </div> */}
           <div className="col-span-2">
            <button className="w-full bg-bg4 p-3 text-white font-bold rounded-md">SUBMIT</button>
          </div> 
        </form>
      </main>
    </div>
    </div>
    </section>
   </section>
  );
};

export default Profile;
