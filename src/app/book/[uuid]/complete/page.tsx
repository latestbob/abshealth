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
  const dispatch = useDispatch();

  // const {
  //   control,
  //   handleSubmit,
  //   watch,
  //   setValue,
  //   formState: { errors },
  // } = useForm<FormValues>();

  // const selectedDate = watch("date");
  // const selectedTime = watch("time");




  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-6">
        
        {/* Left Side - Appointment Summary */}
        <div className="w-full md:w-1/2 flex flex-col items-center text-center">
          <img src="http://asknello.com/assets/images/logo.png" alt="Logo" className="w-24 mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Appointment Summary</h2>
          <p className="text-gray-600"><strong>Date:</strong> {date}</p>
          <p className="text-gray-600"><strong>Time:</strong> {time}</p>
          <p className="text-gray-600"><strong>Purpose:</strong> General Consultation</p>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-4">Complete Your Booking</h2>
          <form className="space-y-4">
            {/* Title Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <select className="w-full p-2 border rounded-md">
                <option>Mr</option>
                <option>Mrs</option>
                <option>Miss</option>
                <option>Dr</option>
              </select>
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input type="text" className="w-full p-2 border rounded-md" placeholder="John" />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" className="w-full p-2 border rounded-md" placeholder="Doe" />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="w-full p-2 border rounded-md" placeholder="john@example.com" />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="tel" className="w-full p-2 border rounded-md" placeholder="+1234567890" />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select className="w-full p-2 border rounded-md">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
              Confirm Booking
            </button>
          </form>
        </div>

      </div>
    </div>
    </>
  );
}
