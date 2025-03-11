"use client";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Link from "next/link";
import heroImage from '@/assets/herotwo.jpg';
import Offers from "@/components/offers";
import Services from "@/components/service";

import useCounter from "@/hooks/useCounter";



export default function Home() {

  const {count, incrementCount, decrementCount, incrementByAmountCount} = useCounter();
  return (
    <>
      <section
        className="h-screen bg-[url('https://res.cloudinary.com/edifice-solutions/image/upload/v1741172789/herobg_eqfupm.png')] bg-cover bg-center bg-no-repeat"
       
      >
        <Navbar />

        <div className="container mx-auto flex flex-row justify-between items-center h-full px-4 sm:px-6 lg:px-8">
    {/* Left Side: Hero Text */}
    <div className="flex flex-col space-y-6 w-[50%]">

      <p className="text-base font-medium">HIGHLY PROFESSIONAL PHYSIOTHERAPIST</p>
      <h1 className="text-5xl font-bold text-gray-900 font-serif">
        Welcome to <span className="text-[#1997cf] font-extrabold font-serif"> Nello</span> Health
      </h1>
      <p className="text-lg text-gray-700">
      Your trusted partner in physiotherapy and wellness. We’re here to
      help you move better, feel better, and live bett
      </p>
      <div className="flex space-x-4">
        <Link
          href="/book-appointment"
          className="flex items-center bg-[#1997cf] hover:bg-[#ff9017] text-white px-6 py-3 rounded-md text-lg font-medium"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Book Appointment
        </Link>
        
      </div>
    </div>

    {/* Right Side: Image */}
    <div className="w-[40%]">
      
    <Image
            src={heroImage} // Use imported image
            alt="Health Illustration"
            width={500} // Set width
            height={500} // Set height
            className="w-[90%] max-w-lg rounded-2xl"
          />
    </div>
  </div>
      </section>

      <br />

      <Offers />

      <br />
      <br />

      <Services />

<br />
{/* <div className="flex-col justify-center">
      <h1 className="text-center text-3xl">Counter: {count}</h1>

      <div className="flex justify-between items-center w-1/2 mx-auto">
      <button className="bg-green-700 text-white p-4 rounded-2xl" onClick={incrementCount}>Increment</button>
      <button className="bg-red-700 text-white p-4 rounded-2xl" onClick={decrementCount}>Decrement</button>
      </div>
    </div> */}


    </>
  );
}
