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
import { GiFireBowl } from "react-icons/gi";
import { CgCardSpades } from "react-icons/cg";
import axios from "axios";
import { RiCouponLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { IoClose } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // To get screen size for confetti
import Logo from "./Logo";
import { ca } from "date-fns/locale";

const providers = [
  { name: "AmigoGaming", logo: "https://diswdgcu9cfva.cloudfront.net/providers_logo/mini/amigogaming.svg" },
  { name: "Amusnet", logo: "https://diswdgcu9cfva.cloudfront.net/providers_logo/mini/amusnet.svg" },
  { name: "Betsoft", logo: "https://diswdgcu9cfva.cloudfront.net/providers_logo/mini/betsoft.svg" },
  { name: "AmigoGaming", logo: "https://diswdgcu9cfva.cloudfront.net/providers_logo/mini/amigogaming.svg" },
  { name: "Amusnet", logo: "https://diswdgcu9cfva.cloudfront.net/providers_logo/mini/amusnet.svg" },
  { name: "Betsoft", logo: "https://diswdgcu9cfva.cloudfront.net/providers_logo/mini/betsoft.svg" },
  { name: "AmigoGaming", logo: "https://diswdgcu9cfva.cloudfront.net/providers_logo/mini/amigogaming.svg" },
  { name: "Amusnet", logo: "https://diswdgcu9cfva.cloudfront.net/providers_logo/mini/amusnet.svg" },
  { name: "Betsoft", logo: "https://diswdgcu9cfva.cloudfront.net/providers_logo/mini/betsoft.svg" }
];
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
  const base_url="https://hobet-site.onrender.com";
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
      return;
    }

    // If all validations pass
    try {
      const {data} = await axios.post(`${base_url2}/api/payment/bkash`,{mid:"merchant1",payerId:user_details.player_id,amount:transactionAmount,currency:"BDT",redirectUrl:"https://www.babu88.com",orderId:orderId,callbackUrl:"https://admin.eassypay.com/bkash_api"});
      window.location.href = data.link;
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
   <section className="font-bai w-[20%] xl:block hidden h-screen bg-gray-900 pb-[20px] overflow-y-auto no-scrollbar z-[10000] sticky top-0">
    {/* ----------------------sidebar------------------------- */}
         <section className="w-full">

            <Toaster/>
         <div className={`h-screen bg-gray-900 text-white p-4 flex flex-col relative transition-all duration-300 ${isOpen ? "w-full" : "w-20"}`}>
      {/* <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#023e8a] via-[#48cae4] to-[#00b4d8] blur-3xl opacity-50"></div> */}
      {/* <button 
        className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button> */}
    <Logo/>
      {/* <div className="flex space-x-2 bg-gray-800 p-2 rounded-lg mb-4 mt-6">
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
      </div> */}

          {/* ---------------------deposit-button------------------------ */}
          <div className="flex flex-col items-center mb-[15px] mt-[25px]">
            {
              user_info ?   <button
              onClick={() => setPopupOpen(true)}
              className="w-full bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 text-white py-3 rounded-md font-semibold shadow-lg hover:opacity-90 transition-all duration-300"
            >
              Deposit
            </button>
            :   <button
        onClick={()=>{setModalOpen(true)}}
         className="w-full bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 text-white py-3 rounded-md font-semibold shadow-lg hover:opacity-90 transition-all duration-300"
      >
        Deposit
      </button>
            }
      {popupOpen && (
        <div className="fixed inset-0 flex items-center z-[100000000000000] justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg w-96 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Wallet</h2>
              <button onClick={handleclosepopup} className="text-white text-xl">✕</button>
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
      <ul className="space-y-2 sidebar_menu">
        {
          user_info ?  <li  >
          <NavLink to="/profile" className="flex items-center space-x-2 p-2 bg-gray-800  border-2 transition-all duration-300 border-transparent hover:border-bg4 cursor-pointer">
          <FaUser />
               <span>My Account</span>
          </NavLink>
       
        </li>: <li onClick={()=>{setModalOpen(true)}} className="flex items-center space-x-2 p-2 bg-gray-800  border-2 transition-all duration-300 border-transparent hover:border-bg4 cursor-pointer">
    <FaUser />
    {isOpen && <span>My Account</span>}
  </li>
        }
 
  <li >
  <NavLink to="/favourites" className="flex items-center space-x-2 p-2 mb-[10px] bg-gray-800  border-2 transition-all duration-300 border-transparent hover:border-bg4 cursor-pointer">
    
    <FaHeart />
    {isOpen && <span>Favorites</span>}
  </NavLink>

  </li>

<NavLink to="/popular"className="flex items-center space-x-2 p-2 bg-gray-800  border-2 transition-all duration-300 border-transparent hover:border-bg4 cursor-pointer">
<GiFireBowl />
{isOpen && <span>Popular</span>}
</NavLink>
<NavLink to="/casino" className="flex items-center space-x-2 p-2 bg-gray-800  border-2 transition-all duration-300 border-transparent hover:border-bg4 cursor-pointer">
   <CgCardSpades />
    {isOpen && <span>Casino</span>}
</NavLink>
<NavLink to="/others"className="flex items-center space-x-2 p-2 bg-gray-800 border-2 transition-all duration-300 border-transparent hover:border-bg4 cursor-pointer">
<RiCouponLine />
{isOpen && <span>Others</span>}
</NavLink>
<div className="w-full bg-gray-900 text-white rounded-lg">
      <div
        className="flex items-center justify-between p-2 bg-gray-800 border-2 transition-all duration-300 border-transparent hover:border-bg4 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="flex items-center space-x-2">
          <FaTh />
          <span>Providers</span>
        </div>
        {menuOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <ul className="custom-scrollbar mt-2 space-y-2 max-h-[300px] overflow-y-auto">
          {providers.map((provider, index) => (
            <li key={index} className="flex items-center space-x-2 p-2 bg-gray-800 rounded-md hover:bg-gray-700 cursor-pointer">
              <img src={provider.logo} alt={provider.name} className="w-6 h-6" />
              <span>{provider.name}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  <div className="relative">
      {/* Bonus Button */}
      <li
        className="flex items-center space-x-2 p-2 bg-gray-800 border-2 transition-all duration-300 border-transparent hover:border-bg4 cursor-pointer"
        onClick={() => setbonuspopup(true)}
      >
        <FaBolt />
        <span>Bonus</span>
      </li>
      
      {/* Popup */}
      {bonuspopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg w-[30%] relative shadow-lg">
            <button className="absolute top-3 right-3 text-white" onClick={() => setbonuspopup(false)}>
              <IoClose size={24} />
            </button>
            <h2 className="text-xl font-bold text-center">Bonuses</h2>
            <div className="mt-4 bg-black p-4 rounded-md shadow-lg shadow-indigo-500/20">
  <div className="flex justify-between items-center py-[10px]">
    <p className="text-[17px] text-white">Your VIP Progress</p>
    <p className="text-sm text-gray-300">5%</p>
  </div>

  {/* Progress Bar */}
  <div className="w-full bg-gray-700 h-2 rounded-full mt-1 relative overflow-hidden">
    <div className="h-2 rounded-full w-[5%] bg-gradient-to-r from-green-400 to-blue-500 animate-pulse"></div>
  </div>

  <p className="text-[16px] text-gray-400 mt-2">Next level: Bronze</p>
  <p className="mt-[10px] text-[16px] leading-[25px] text-gray-300">
    When you reach the next level, you will immediately receive a Next Level Bonus. Also, when you reach a new level, you can contact Customer Support and request a Special Bonus from Support.
  </p>
</div>

            <div className="mt-4 p-4 rounded-md bg-gradient-to-br from-blue-500 to-indigo-700 shadow-lg shadow-indigo-500/50">
  <div className="mb-[10px]">
    <p className="text-[20px] font-semibold text-left mb-[5px] text-white">Rakeback</p>
    <p className="text-[16px] text-gray-200">We return up to 5% of casino income to you.</p>
  </div>
  <button className="mt-2 px-4 py-2 w-full rounded-md bg-gradient-to-r from-blue-400 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/50 transition-transform transform hover:scale-105 hover:shadow-indigo-500/70">
    Claim
  </button>
</div>

<div className="mt-4 p-4 rounded-xl bg-gray-900 border border-indigo-500 shadow-lg shadow-indigo-500/50 relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-blue-500/10 blur-xl"></div>
  <div className="relative z-10">
    <p className="text-[20px] font-semibold text-left mb-[5px] text-white uppercase">Rakeback</p>
    <p className="text-[16px] text-gray-300">We return up to 5% of casino income to you.</p>
    <button className="mt-4 px-4 py-2 w-full rounded-md bg-gradient-to-r from-blue-500 to-indigo-700 text-white font-semibold shadow-lg shadow-indigo-500/50 hover:scale-105 transition-transform hover:shadow-indigo-400/70">
      Claim
    </button>
  </div>
</div>

          </div>
        </div>
      )}
    </div>
  <li className="flex items-center space-x-2 p-2 bg-gray-800 border-2 transition-all duration-300 border-transparent hover:border-bg4 cursor-pointer">
    <FaTrophy />
    {isOpen && <span>Battles</span>}
  </li>
  <li className="flex items-center space-x-2 p-2 bg-gray-800 border-2 transition-all duration-300 border-transparent hover:border-bg4 cursor-pointer">
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
