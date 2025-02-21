import { useState, useEffect } from "react";
import { FiClipboard, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaUser, FaHeart, FaGift, FaCrown, FaTh, FaBolt, FaTrophy, FaMobileAlt, FaFacebook, FaInstagram, FaTelegram, FaEnvelope, FaWifi } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import AuthModal from "./modal/AuthModal";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { nanoid } from "nanoid";
import axios from "axios";
import Swal from "sweetalert2";
import toast, { Toaster } from 'react-hot-toast';
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // To get screen size for confetti
import Logo from "./Logo";
import { ca } from "date-fns/locale";

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
const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("casino");
  const [isOpen, setIsOpen] = useState(true);
  const [wifiSpeed, setWifiSpeed] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("deposit");
  const navigate=useNavigate();
  const user_info=JSON.parse(localStorage.getItem("user"))
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
      axios.get(`http://localhost:6001/api/user/checkout-page-agent/shihab`)
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
  const user_data=()=>{
    axios.get(`http://localhost:8080/auth/user/${user_info?._id}`)
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post(`http://localhost:6001/api/payment/paymentSubmit`, {
      paymentId: paymnet_id,
      provider: "bkash",
      agentAccount: agentNumber,
      payerAccount: phone,
      transactionId: transactionid,
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.success) {
        axios.put(`http://localhost:8080/auth/update-user-balance/${user_info._id}`,{amount})
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

    if (!transactionAmount || isNaN(transactionAmount) || Number(transactionAmount) <= 0) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please enter a valid amount!",
      });
      return;
    }

    // If all validations pass
    try {
      const {data} = await axios.post(`http://localhost:6001/api/payment/bkash`,{mid:"merchant1",payerId:user_details.player_id,amount:transactionAmount,currency:"BDT",redirectUrl:"https://www.babu88.com",orderId:orderId,callbackUrl:"https://admin.eassypay.com/bkash_api"});
      window.location.href = data.link;
      console.log(data)
      if (data.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Deposit Successful",
          text: `You have successfully deposited ${amount} ${currency} via BKash.`,
        });
        console.log("Deposit Success:", data.data);
      } else{
        Swal.fire({
          icon: "error",
          title: "Deposit Failed",
          text: data.data.message || "An error occurred while processing your deposit.",
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
        .post(`http://localhost:6001/api/payment/payout`, {
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
              .put(`http://localhost:8080/user/after-withdraw-minus-balance`, {
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
    
  return (
   <section className="font-bai w-[20%] xl:block hidden">
    {/* ----------------------sidebar------------------------- */}
         <section className="w-full">

            <Toaster/>
         <div className={`h-screen bg-gray-900 text-white p-4 flex flex-col relative transition-all duration-300 ${isOpen ? "w-full" : "w-20"}`}>
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#023e8a] via-[#48cae4] to-[#00b4d8] blur-3xl opacity-50"></div>
      <button 
        className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
    <Logo/>
      <div className="flex space-x-2 bg-gray-800 p-2 rounded-lg mb-4 mt-6">
        <button 
          className={`w-1/2 text-center py-2 rounded-lg border-2 transition-all duration-300 ${activeTab === "casino" ? "bg-bg1 text-white border-bg2" : "text-gray-400 border-transparent hover:border-gray-400"}`}
          onClick={() => setActiveTab("casino")}
        >
          <NavLink to="/">Casino</NavLink>
        </button>
        <button 
          className={`w-1/2 text-center py-2 rounded-lg border-2 transition-all duration-300 ${activeTab === "sportsbook" ? "bg-bg1 text-white border-bg2" : "text-gray-400 border-transparent hover:border-gray-400"}`}
          onClick={() => setActiveTab("sportsbook")}
        >Sportsbook</button>
      </div>

          {/* ---------------------deposit-button------------------------ */}
          <div className="flex flex-col items-center mb-[10px]">
            {
              user_info ?    <button
              onClick={() => setPopupOpen(true)}
              className="w-full bg-bg2 text-white py-2 rounded-lg font-semibold"
            >
              Deposit
            </button>:   <button
        onClick={()=>{setModalOpen(true)}}
        className="w-full bg-bg2 text-white py-2 rounded-lg font-semibold"
      >
        Deposit
      </button>
            }
      {popupOpen && (
        <div className="fixed inset-0 flex items-center z-[1000] justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg w-96 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Wallet</h2>
              <button onClick={() => setPopupOpen(false)} className="text-white text-xl">✕</button>
            </div>
            {!selectedMethod ? (
              <>
                <div className="flex bg-gray-800 p-1 rounded-lg mb-4">
                  <button className={`flex-1 py-2 rounded-lg ${selectedTab === "deposit" ? "bg-yellow-500 text-black font-bold" : "text-white"}`} onClick={() => setSelectedTab("deposit")}>Deposit</button>
                  <button className={`flex-1 py-2 rounded-lg ${selectedTab === "withdraw" ? "bg-yellow-500 text-black font-bold" : "text-white"}`} onClick={() => setSelectedTab("withdraw")}>Withdraw</button>
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
                    <button
                      key={value}
                      className={`flex-1 py-2 text-[14px] rounded-lg font-bold ${
                        transactionAmount == value
                          ? "bg-yellow-500 text-black"
                          : "bg-gray-700 text-white"
                      }`}
                      onClick={() => handlePresetAmount(value)}
                    >
                      ৳ {value}
                    </button>
                  ))}
                </div>
          
                {/* Submit Button */}
                <button
                  disabled={loading}
                  className="w-full mt-4 py-2 rounded-lg font-bold text-white bg-yellow-400 hover:bg-yellow-500 transition duration-300"
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
                          ? "bg-yellow-500 text-black"
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
                  className="w-full mt-4 py-2 rounded-lg font-bold text-white bg-yellow-400 hover:bg-yellow-500 transition duration-300"
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
          </div>
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
          {/* ---------------------deposit button-------------------- */}
      <ul className="space-y-2">
        {
          user_info ?  <li  >
          <NavLink to="/profile" className="flex items-center space-x-2 p-2 bg-gray-800 rounded-lg border-2 transition-all duration-300 border-transparent hover:border-bg4 cursor-pointer">
          <FaUser />
               <span>My Account</span>
          </NavLink>
       
        </li>: <li onClick={()=>{setModalOpen(true)}} className="flex items-center space-x-2 p-2 bg-gray-800 rounded-lg border-2 transition-all duration-300 border-transparent hover:border-bg4 cursor-pointer">
    <FaUser />
    {isOpen && <span>My Account</span>}
  </li>
        }
 
  <li >
  <NavLink to="/favourites" className="flex items-center space-x-2 p-2 mb-[10px] bg-gray-800 rounded-lg border-2 transition-all duration-300 border-transparent hover:border-bg4 cursor-pointer">
    
    <FaHeart />
    {isOpen && <span>Favorites</span>}
  </NavLink>

  </li>

  <li className="flex items-center space-x-2 p-2 bg-gray-800 rounded-lg border-2 transition-all duration-300 border-transparent hover:border-bg4 cursor-pointer">
    <FaGift />
    {isOpen && <span>Bonuses</span>}
  </li>
  <li className="flex items-center space-x-2 p-2 bg-gray-800 rounded-lg border-2 transition-all duration-300 border-transparent hover:border-bg4 cursor-pointer">
    <FaCrown />
    {isOpen && <span>VIP Club</span>}
  </li>
  <li className="flex items-center space-x-2 p-2 bg-gray-800 rounded-lg border-2 transition-all duration-300 border-transparent hover:border-bg4 cursor-pointer">
    <FaTh />
    {isOpen && <span>Providers</span>}
  </li>
  <li className="flex items-center space-x-2 p-2 bg-gray-800 rounded-lg border-2 transition-all duration-300 border-transparent hover:border-bg4 cursor-pointer">
    <FaBolt />
    {isOpen && <span>Promotions</span>}
  </li>
  <li className="flex items-center space-x-2 p-2 bg-gray-800 rounded-lg border-2 transition-all duration-300 border-transparent hover:border-bg4 cursor-pointer">
    <FaTrophy />
    {isOpen && <span>Battles</span>}
  </li>
  <li className="flex items-center space-x-2 p-2 bg-gray-800 rounded-lg border-2 transition-all duration-300 border-transparent hover:border-bg4 cursor-pointer">
    <FaMobileAlt />
    {isOpen && <span>Mobile App</span>}
  </li>
</ul>

    <AuthModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

      <div className="mt-auto flex space-x-4 items-center justify-center py-4">
        <FaInstagram className="text-pink-500 text-2xl cursor-pointer" />
        <FaFacebook className="text-blue-500 text-2xl cursor-pointer" />
        <FaTelegram className="text-blue-400 text-2xl cursor-pointer" />
      </div>
      <button className="mt-4 w-full bg-gray-800 py-2 rounded-lg flex items-center justify-center space-x-2">
        <FaEnvelope className="text-gray-400" />
        {isOpen && <span>support@hobet.com</span>}
      </button>
      <footer className="w-full bg-gray-800 text-center text-gray-400 py-2 mt-4 rounded-lg">
        {isOpen && "© 2025 HIBET. All rights reserved."}
      </footer>
    </div>
         </section>
    {/* ----------------------sidebar------------------------- */}
   </section>
  )
}

export default Sidebar
