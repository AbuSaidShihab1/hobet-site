import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Pagination,Autoplay} from 'swiper/modules';
import { GoStarFill } from "react-icons/go";
import { NavLink } from 'react-router-dom';
const Originalgame = () => {
    const swiperRef = useRef(null);
    const [categoires,set_categories]=useState([
        {
            id:1,
            image:"https://elon.casino/image/vertical_2/38618.webp",
        },
        {
            id:2,
            image:"https://elon.casino/image/vertical_2/38622.webp",
        },
        {
            id:3,
            image:"https://elon.casino/image/vertical_2/49646.webp",
            title:"Game Console"
        },
        {
            id:4,
            image:"https://elon.casino/image/vertical_2/38603.webp",
            title:"Tablet"
        },
        {
            id:5,
            image:"https://elon.casino/image/vertical_2/39761.webp",
            title:"Tablet"
        },
        {
            id:6,
            image:"https://elon.casino/image/vertical_2/39762.webp",
            title:"Tablet"
        },
        {
            id:7,
            image:"https://elon.casino/image/vertical_2/38616.webp",
            title:"Tablet"
        },
        {
            id:8,
            image:"https://elon.casino/image/vertical_2/38616.webp",
            title:"Tablet"
        },
        {
            id:9,
            image:"https://elon.casino/image/vertical_2/38612.webp",
            title:"Tablet"
        },
        {
            id:10,
            image:"https://elon.casino/image/vertical_2/38615.webp",
            title:"Tablet"
        },
        {
            id:10,
            image:"https://elon.casino/image/vertical_2/38615.webp",
            title:"Tablet"
        },
        {
            id:10,
            image:"https://elon.casino/image/vertical_2/38615.webp",
            title:"Tablet"
        },
 
        {
            id:10,
            image:"https://elon.casino/image/vertical_2/38615.webp",
        },
        {
            id:10,
            image:"https://elon.casino/image/vertical_2/38605.webp",
        },
    ])
  return (
    <section className='pt-[20px] w-full'>
        <div className='flex justify-between items-center pb-[10px]'>
            <h1 className='flex justify-center items-center text-white gap-[10px] text-[25px] font-[600]'>
                <GoStarFill className='text-[17px] xl:text-[25px] text-bg6'/>
            Hobet originals
            </h1>
            <NavLink className="text-bg5 text-[15px] xl:text-[18px]">
                View All
            </NavLink>
        </div>
       <section>
       <Swiper
        slidesPerView={3}
        spaceBetween={15}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 10,
          },
          1300: {
            slidesPerView: 7,
            spaceBetween: 10,
          },
          1440: {
            slidesPerView: 7,
            spaceBetween: 10,
          },
        }}
        className="mySwiper"
        modules={[Autoplay]}
        autoplay
        ref={swiperRef}
        navigation={false}  // Disable default navigation since we're using custom buttons
      >
        {categoires?.map((data) => (
          <SwiperSlide key={data.id} className='w-full cursor-pointer'>
                  <img  className='w-full h-[200px] xl:h-[260px] rounded-[10px]' src={data.image} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
       </section>
    </section>
  )
}

export default Originalgame
