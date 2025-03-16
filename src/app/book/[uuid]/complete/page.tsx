"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import useSchedule from "@/hooks/useSchedule";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import { getBlockedTime } from "@/services/blockedtimeService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/states/store";
import { scheduleAppointment } from "@/services/appointmentService";
import { toast, Bounce } from "react-toastify";

interface ISpecialist {
  title: string;
  firstname: string;
  lastname: string;
  profileImage: string;
  aos: string;
  fee: number;
  uuid: string;
}



export default function CompleteBooking() {
  const { specialist, schedules } = useSchedule();
  const [blockedtime, setBlockedTime] = useState<any[]>([]);
  const date = useSelector((state: RootState) => state.schedule.date);
  const time = useSelector((state: RootState) => state.schedule.time);
  const purpsose = useSelector((state: RootState) => state.schedule.purpose);
  const consultant = useSelector((state: RootState) => state.schedule.consultant);
  const consultant_uuid = useSelector((state: RootState) => state.schedule.consultant_uuid);
  const dispatch = useDispatch();


  //form date

  const [title, setTitle] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const[gender, setGender] = useState<string>("");



  function handleTitleChange(e: React.ChangeEvent<HTMLSelectElement>){

    setTitle(e.target.value)
}

function handleFirstnameChange(e:React.ChangeEvent<HTMLInputElement>){

  setFirstname(e.target.value)
}

function handleLastnameChange(e:React.ChangeEvent<HTMLInputElement>){

  setLastname(e.target.value)
}

function handleEmailChange(e:React.ChangeEvent<HTMLInputElement>){

  setEmail(e.target.value)
}


function handlePhoneChange(e:React.ChangeEvent<HTMLInputElement>){

  setPhone(e.target.value)
}

function handleGenderChange(e: React.ChangeEvent<HTMLSelectElement>) {
  setGender(e.target.value);
}






  // const {
  //   control,
  //   handleSubmit,
  //   watch,
  //   setValue,
  //   formState: { errors },
  // } = useForm<FormValues>();

  // const selectedDate = watch("date");
  // const selectedTime = watch("time");

  // purpose:string,
  // visit_date:string,
  // scheduled_time:string,
  // consultant:string,
  // consultant_uuid:string,
  // gender:string,
  async function handleSubmit(e: React.FormEvent){
    e.preventDefault();

    try{
      const result =  await scheduleAppointment(
        title, firstname, lastname, email, phone, purpsose, date, time, consultant, consultant_uuid, gender
    
       );

       toast.success(`Appointment Scheduled Successfully`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }

    catch (err: any) {
      //setErroMessage(err.message);
    
      toast.error(`${err.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  



  }




  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-6">
        
        {/* Left Side - Appointment Summary */}
        <div className="w-full md:w-1/2 flex flex-col items-center text-center">
          <img src="http://asknello.com/assets/images/logo.png" alt="Logo" className="w-24 mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Appointment Summary</h2>
          <p className="text-gray-600"><strong>Date:</strong>  {moment(date).format("dddd, MMMM DD, YYYY")}</p>
          <p className="text-gray-600"><strong>Date:</strong>  {moment(date).format("D/MM/YYYY")}</p>
          <p className="text-gray-600"><strong>Time:</strong> {time}</p>
          <p className="text-gray-600"><strong>Purpose:</strong> {purpsose}</p>
           {/* moment(selectedDate).format("D/MM/YYYY") */}
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-4">Complete Your Booking</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <select onChange={handleTitleChange} value={title} className="w-full p-2 border rounded-md"required>
              <option value=""></option>
              <option value="Mr">Mr</option>
                     <option value="Mrs">Mrs</option>
                     <option value="Miss">Miss</option>
                     <option value="Ms">Ms</option>
                     <option value="Dr">Dr</option>
                     <option value="Prof">Prof</option>
                     <option value="Hon">Hon</option>
              </select>
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input onChange={handleFirstnameChange} value={firstname} type="text" className="w-full p-2 border rounded-md"required />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" onChange={handleLastnameChange} value={lastname} className="w-full p-2 border rounded-md"  required/>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" onChange={handleEmailChange} value={email} className="w-full p-2 border rounded-md" required />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="tel"onChange={handlePhoneChange} value={phone} className="w-full p-2 border rounded-md" placeholder="i.e. 09033....."required />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select onChange={handleGenderChange} value={gender} className="w-full p-2 border rounded-md"required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                
              </select>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-[#ff9017] text-white p-2 rounded-md hover:bg-[#1997cf] cursor-pointer">
              Confirm Booking
            </button>
          </form>
        </div>

      </div>
    </div>
    </>
  );
}
