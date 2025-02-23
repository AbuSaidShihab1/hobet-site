import React, { useRef, useState,useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination,Autoplay} from 'swiper/modules';
import { FaArrowRight, FaCircle } from "react-icons/fa"; // for dot navigation
import { FaUserCircle, FaQuestionCircle } from "react-icons/fa"; 
import { FaBars, FaTimes, FaUser, FaHeart, FaGift, FaCrown, FaTh, FaBolt, FaTrophy, FaMobileAlt, FaFacebook, FaInstagram, FaTelegram, FaEnvelope, FaWifi } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import Populargames from './Populargames';
import Originalgame from './Originalgame';
import Providers from './Providers';
import Gameshows from './Gameshows';
import { FaYinYang, FaStar, FaRocket,FaStopwatch} from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Header from '../Header';
import Loader from '../Loader';
import Strikegames from './Strikegames';
import banner1 from "../../assets/banner1.webp"
import banner2 from "../../assets/banner2.webp"
import banner3 from "../../assets/banner3.webp"
import GameTable from './GameTable';
const tabs = [
  { label: "Asia", icon: <FaYinYang /> },
  { label: "Popular", icon: <FaStar /> },
  { label: "Crash", icon: <FaRocket /> },
  { label: "Instant", icon: <FaBolt /> },
  { label: "Table", icon: <FaStopwatch /> },
  { label: "Asia", icon: <FaYinYang /> },
  { label: "Popular", icon: <FaStar /> },
  { label: "Crash", icon: <FaRocket /> },
  { label: "Instant", icon: <FaBolt /> },
  { label: "Table", icon: <FaStopwatch /> },
  { label: "Asia", icon: <FaYinYang /> },
  { label: "Popular", icon: <FaStar /> },
  { label: "Crash", icon: <FaRocket /> },
  { label: "Instant", icon: <FaBolt /> },
  { label: "Table", icon: <FaStopwatch /> },
];
const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
 const [wifiSpeed, setWifiSpeed] = useState(null);


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
  const banners = [
    banner1,
    banner2, // Use other banners if needed
    banner3
  ];

  const popularGames = [
    "https://elon.casino/icons-elon/games/2.png", // Popular game image
  ];

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };
  const [activeTab, setActiveTab] = useState("Asia");
  const swiperRef = useRef(null);
   
  return (
   <section className='w-[100%] xl:w-[80%] xl:px-[20px] no-scrollbar   xl:py-[20px] '>
      <Header/>
      {/* <Loader/> */}

        {/* Main Content */}
        <div className="xl:bg-gray-800 px-[10px] py-[20px] xl:p-[30px] xl:border-[2px] border-gray-700 rounded-lg overflow-hidden text-white">
      {/* Banner Section */}
      <div className="relative">
        <img src={banners[activeIndex]} alt="Banner" className="w-full h-[200px] xl:h-[400px] object-cover rounded-lg" />
        {/* Slider Navigation */}
        <div className="absolute bottom-[-8%] left-0 right-0 flex justify-center">
          <div className="flex space-x-2">
            {banners.map((_, index) => (
              <FaCircle
                key={index}
                className={`text-bg6 text-[10px] xl:text-[12px] cursor-pointer ${index === activeIndex ? 'text-bg3' : 'text-opacity-50'}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full items-center  py-4 mt-[30px] ">

      <Swiper
  slidesPerView={3}
  pagination={{
    clickable: true,
  }}
  breakpoints={{
    300: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 12,
    },
    1024: {
      slidesPerView: 12,
      spaceBetween: 10,
    },
    1300: {
      slidesPerView: 12,
      spaceBetween: 10,
    },
  }}
  className="mySwiper w-full"
  modules={[Autoplay]}
  autoplay
  ref={swiperRef}
  navigation={false} // Disable default navigation since we're using custom buttons
>
  {tabs.map((tab) => (
    <SwiperSlide key={tab.id} className="w-full cursor-pointer">
      <button
        key={tab.label}
        onClick={() => setActiveTab(tab.label)}
        className={`flex items-center space-x-2 px-4 py-[10px] rounded-md text-gray-400 hover:text-white transition-all w-full ${
          activeTab === tab.label ? " text-white" : ""
        }`}
      >
        <span className="text-[13px] xl:text-[22px]">{tab.icon}</span>
        <span className="text-[12px] xl:text-[17px]">{tab.label}</span>
      </button>
    </SwiperSlide>
  ))}
</Swiper>

      {/* Tabs */}
    
    </div>
      {/* Popular Section */}
      <Populargames/>
      <Originalgame/>
      {/* <Providers/> */}
      <Gameshows/>
      <Strikegames/>
      <GameTable/>
    </div>
  
   </section>
  )
}

export default Hero
