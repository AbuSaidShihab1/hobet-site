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
import { useWindowSize } from "react-use"; // To get screen size for confetti
import { nanoid } from "nanoid";
import { IoIosArrowBack } from "react-icons/io";

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
const paymentMethods = {
    deposit: [
      { name: "Bkash", src: "https://elon.casino/icons-elon/payments/218.svg" },
      { name: "Nagad", src: "https://elon.casino/icons-elon/payments/223.svg" },
      { name: "Rocket", src: "https://elon.casino/icons-elon/payments/103.svg" },
    ],
    withdraw: [
      { name: "Bkash", src: "https://elon.casino/icons-elon/payments/218.svg" },
      { name: "Nagad", src: "https://elon.casino/icons-elon/payments/223.svg" },
      { name: "Rocket", src: "https://elon.casino/icons-elon/payments/103.svg" },
    ],
  };
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
  // -------------paymnet-methods--------------------------
  const [activeTab, setActiveTab] = useState("casino");
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("deposit");
  const [amount, setAmount] = useState(0);
  const [phone, setPhone] = useState("");
  const [agentNumber, setAgentNumber] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionid,settransactionid]=useState("")
  const [isCopied, setIsCopied] = useState(false);  // To track the copied state
  const [loading, setLoading] = useState(false);
  const [active_tab,set_activetab]=useState("make_payment")
  const [orderId, setOrderId] = useState("");
  const [paymnet_id,set_paymentid]=useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { width, height } = useWindowSize(); // Get window size for confetti
  const base_url2="https://api.eassypay.com";
  const merchant_name="hobet"

  useEffect(() => {
    setOrderId(nanoid(8));
  }, []);
  // ------------random agent number
  const handleCopy = () => {
    navigator.clipboard.writeText(agentNumber);  // Copy the agent number to clipboard
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);  // Reset after 2 seconds
  };
  const [random_agent,set_radom_agent]=useState([]);
  const random_agent_number=()=>{
      axios.get(`${base_url2}/api/user/checkout-page-agent/${merchant_name}`)
      .then((res)=>{
        console.log(res.data);
        set_radom_agent(res.data)
        setAgentNumber(res.data.accountNumber)
      }).catch((err)=>{
        console.log(err)
      })
  }
  useEffect(()=>{
       random_agent_number();     
  },[])
  // Preset amounts
  const presetAmounts = [300, 400, 600, 1000, 2000];

  const [user_details,set_userdetails]=useState([])


  useEffect(()=>{
    if(user_info){
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
    user_data();

    }
  },[])
  // Handle preset amount selection
  const handlePresetAmount = (value) => {
    setTransactionAmount(value);
  };

  // -------------------make-paymnet-data-first------------------------
  // const handle_paymnet_submit = async (e) => {
  //   e.preventDefault();
  //   const postData = {
  //     provider:selectedMethod.name,
  //     amount:transactionAmount,
  //     mid: "shihab",
  //     orderId: orderId,
  //     currency: "BDT",
  //     payerId: user_info.player_id,
  //     redirectUrl: "http://localhost:5173/profile",
  //   };
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:6001/api/payment/payment`,
  //       postData
  //     );
  //     if (response.data.success) {
  //       toast.success("Please send money and fill up information!");
  //        set_activetab("checkout");
  //        set_paymentid(response.data.paymentId)
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error!",
  //         text: response.data.message || "Payment failed.",
  //       });
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error!",
  //       text: error.message || "Something went wrong.",
  //     });
  //   }
  // };
  // console.log(paymnet_id)
  // Handle form submission
  const [progress, setProgress] = useState(0); // New state to track progress
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post(`${base_url2}/api/payment/paymentSubmit`, {
      paymentId: paymnet_id,
      provider: "bkash",
      agentAccount: agentNumber,
      payerAccount: phone,
      transactionId: transactionid,
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.success) {
        axios.put(`${base_url2}/auth/update-user-balance/${user_info._id}`,{amount})
        .then((res)=>{
          console.log(res)
        }).catch((err)=>{
          console.log(err)
        })
        toast.success(res.data.message);
        setPaymentSuccess(true); // Trigger confetti animation
        setTimeout(() => setPaymentSuccess(false), 5000); // Hide confetti after 5s
        // setPopupOpen(false)
        
      } else {
        toast.error(res.data.message);
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error("Something went wrong. Please try again.");
    });

    setLoading(false);
  };
  const handle_bkash_deposit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProgress(20); // Set initial progress
    // Validation logic
    // if (!mid.trim()) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Validation Error",
    //     text: "Merchant ID (mid) is required!",
    //   });
    //   return;
    // }

    // if (!payerId.trim()) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Validation Error",
    //     text: "Payer ID is required!",
    //   });
    //   return;
    // }

    if (!transactionAmount || isNaN(transactionAmount) || Number(transactionAmount) < 300 || Number(transactionAmount) > 10000) {
      toast.error("Please enter a valid amount between 300 and 10000!");
      setLoading(false);
      setProgress(0);
      return;
    }

    // If all validations pass
    try {
      const {data} = await axios.post(`${base_url2}/api/payment/bkash`,{mid:"merchant1",payerId:user_details.player_id,amount:transactionAmount,currency:"BDT",redirectUrl:"https://www.babu88.com",orderId:orderId,callbackUrl:"https://admin.eassypay.com/bkash_api"});
      setProgress(70); // Update progress on successful request
      window.location.href = data.link;
      if (data.status === 200) {
        console.log("Deposit Success:", data.data);
      } else{
        Swal.fire({
          icon: "error",
          title: "Deposit Failed",
          text:"An error occurred while processing your deposit.",
        });
        console.error("Deposit Error:", data.data);
      }
    } catch (error) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Error",
    //     text: error.response?.data?.message || "Failed to connect to the server. Please try again later.",
    //   });
      console.log(error);
      toast.error(error.name);

    }finally {
      setLoading(false);
      setProgress(100); // Finalize progress
    }
  };
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
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

    // ------------------withdraw--------------------
    const [payeer_account,setpayeer_account]=useState("")
    const handlewithdraw = (e) => {
      e.preventDefault();
    
      // Validate the transaction amount before making the API call
      const amount = parseFloat(transactionAmount);
      
      if (isNaN(amount) || amount < 300) {
        toast.error("Withdrawal must be greater than 300 Taka.");
        return;
      }
      if(user_details?.balance < 0){
        toast.error("You have not enough balance!");
        return;
      }
    
      if (amount > 10000) {
        toast.error("Withdrawal must be less than 10,000 Taka.");
        return;
      }
    
      setLoading(true);
    
      axios
        .post(`${base_url2}/api/payment/payout`, {
          mid: "shihab",
          provider: selectedMethod.name,
          amount: amount,
          orderId: orderId,
          payeeId: user_info.player_id,
          payeeAccount: payeer_account,
          callbackUrl: "http://localhost:5173/profile",
          currency: "BDT"
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            user_data();
            axios
              .put(`${base_url}/user/after-withdraw-minus-balance`, {
                amount: transactionAmount,
                player_id: user_info.player_id
              })
              .then((res) => {
                console.log("Hello");
                if(res.data.success){
                  user_data();
                }
              })
              .catch((err) => {
                console.log(err);
              });
              setPopupOpen(false)
            toast.success(res.data.message);
            setPaymentSuccess(true); // Trigger confetti animation
    
            // Show success popup here
            setSuccessPopupVisible(true);  // Set the success popup visibility to true
             
            setTimeout(() => {
              setPaymentSuccess(false);
              setSuccessPopupVisible(false); // Hide success popup after 5 seconds
            }, 5000);
            
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong. Please try again.");
        });
    
      setLoading(false);
    };
    // ---------bonus-sidebar------------------
    const [bonuspopup, setbonuspopup] = useState(false);
    //----------menu-item---------------------------------
    const [menuOpen, setMenuOpen] = useState(false);

    // -------------close popup-------------
    const handleclosepopup=()=>{
     setPopupOpen(false);
     setTransactionAmount("")
    }
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
              <NavLink to="/twain-sport" className="hover:text-blue-400 text-[16px] text-nowrap mr-6">Twain Sport</NavLink>
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
              <button className="bg-bg2 hover:bg-bg2 transition text-[15px] font-[500] text-white px-4 py-2 rounded-[4px] shadow" onClick={() => setPopupOpen(true)}>Deposit</button>
            </div>
{/* --------------------deposit-popup------------------------ */}
{popupOpen && (
        <div className="fixed inset-0 flex items-center z-[100000000000000] justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg w-[80%] md:w-[70%] lg:w-[50%] xl:w-[30%] 2xl:w-[20%] h-auto pb-[100px] shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Wallet</h2>
              <button onClick={handleclosepopup} className="text-white text-xl">✕</button>
            </div>
            {!selectedMethod ? (
              <>
                <div className="flex bg-gray-800 p-1 rounded-lg mb-4">
                  <button className={`flex-1 py-2 rounded-lg ${selectedTab === "deposit" ? "bg-bg5 text-white font-bold" : "text-white"}`} onClick={() => setSelectedTab("deposit")}>Deposit</button>
                  <button className={`flex-1 py-2 rounded-lg ${selectedTab === "withdraw" ? "bg-bg5 text-white font-bold" : "text-white"}`} onClick={() => setSelectedTab("withdraw")}>Withdraw</button>
                </div>
                <motion.div
                  key={selectedTab}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-3 gap-4"
                >
                  {paymentMethods[selectedTab].map((method, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-800 p-3 rounded-lg flex flex-col items-center justify-center border border-gray-700 cursor-pointer"
                      onClick={() => setSelectedMethod(method)}
                    >
                      <img src={method.src} alt={method.name} className="w-12 h-12 mb-2" />
                      <span className="text-xs text-white font-medium text-center">{method.name}</span>
                    </div>
                  ))}
                </motion.div>
              </>
            ) : (
             <div>
                {paymentSuccess && <Confetti width={width} height={height} />}
                {
                  selectedTab=="deposit" ? <>
                 <form onSubmit={handle_bkash_deposit}>
                <h3 className="text-center text-lg font-semibold mb-2">{selectedMethod.name}</h3>
     
                <label className="text-sm mt-4 block">Amount (400৳ - 20000৳)</label>
                <input
                  type="number"
                  className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-700 text-white"
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  placeholder="Enter amount or select below"
                />
          
                <div className="flex space-x-2 mt-2">
                  {presetAmounts.map((value) => (
                    <div
                      key={value}
                      className={`flex-1 py-2 cursor-pointer text-center text-[14px] rounded-lg font-bold ${
                        transactionAmount == value
                          ? "bg-bg2 text-white"
                          : "bg-gray-700 text-white"
                      }`}
                      onClick={() => handlePresetAmount(value)}
                    >
                      ৳ {value}
                    </div>
                  ))}
                </div>
          
                {/* Submit Button */}
                <button
                  disabled={loading}
                  className="w-full mt-4 py-2 rounded-lg font-bold text-white bg-bg4 transition duration-300"
                >
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "Submit Payment"
                  )}
                </button>
                 </form>
                  </>: <form onSubmit={handlewithdraw}>
                <h3 className="text-center text-lg font-semibold mb-2">{selectedMethod.name}</h3>
                <label className="text-sm mt-4 block">Account Number</label>
              <div className="flex items-center space-x-2 mb-4 mt-2 ">
                <input
                  type="text"
                  className="w-full p-2  rounded bg-gray-800 border  border-gray-700 text-white"
                  placeholder="Enter your number"
                  value={payeer_account}
                  onChange={(e)=>{setpayeer_account(e.target.value)}}
                />
              </div>
                <label className="text-sm mt-4 block">Amount (300৳ - 20000৳)</label>
                <input
                  type="number"
                  className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-700 text-white"
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  placeholder="Enter amount or select below"
                />
          
                <div className="flex space-x-2 mt-2">
                  {presetAmounts.map((value) => (
                    <div
                      key={value}
                      className={`flex-1 py-2 text-center cursor-pointer text-[14px] rounded-lg font-bold ${
                        transactionAmount == value
                          ? "bg-bg2 text-white"
                          : "bg-gray-700 text-white"
                      }`}
                      onClick={() => handlePresetAmount(value)}
                    >
                      ৳ {value}
                    </div>
                  ))}
                </div>
          
                {/* Submit Button */}
                <button
                  disabled={loading}
                  className="w-full mt-4 py-2 rounded-lg font-bold text-white bg-bg5 transition duration-300"
                >
           {loading ? (
          <div className="flex justify-center items-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            Processing...
          </div>
        ) : (
          "Submit Withdraw"
        )}
        {/* Progress bar */}
        {loading && (
          <div className="relative mt-2 w-full h-2 bg-gray-300 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
                </button>
                  </form>
                }
               
             </div>
            )}
            {selectedMethod && (
              <div className="mt-4 flex justify-start">
                <button className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center" onClick={() => setSelectedMethod(null)}>
                  <IoIosArrowBack className="text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
          {successPopupVisible && (
            <div className="fixed top-0 left-0 w-full h-full z-[1000] flex items-center justify-center bg-gray-500 bg-opacity-50 transition-all duration-300">
  <div className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-8 rounded-lg shadow-2xl text-center max-w-sm w-full">
    <h3 className="text-white text-2xl font-semibold mb-4">Withdrawal Successful!</h3>
    <p className="text-white text-lg mb-6">Your withdrawal request has been completed successfully.</p>
    <button
      onClick={() => setSuccessPopupVisible(false)}
      className="bg-white text-green-600 px-6 py-2 rounded-md text-lg font-semibold shadow-md transition-transform transform hover:scale-105 hover:shadow-lg duration-200"
    >
      Close
    </button>
  </div>
</div>

)}
{/* ------------------deposit-popup------------------------ */}
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
