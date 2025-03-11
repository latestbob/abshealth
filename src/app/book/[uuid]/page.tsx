"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import useSchedule from "@/hooks/useSchedule";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import './calendar.css';

interface ISpecialist {
  title: string;
  firstname: string;
  lastname: string;
  profileImage: string;
  aos: string;
  fee: number;
  uuid: string;
}

interface ISchedule {
  date: string; // Format: "DD/MM/YYYY"
  specialist_uuid: string;
}

export default function SpecialistBookingPage() {
  const { specialist, schedules } = useSchedule();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  if (!specialist) return <p>Loading...</p>;

  // Convert "DD/MM/YYYY" schedule dates to JavaScript Date objects
  const availableDates: Date[] = schedules.map((schedule) => {
    const [day, month, year] = schedule.date.split("/").map(Number);
    return new Date(year, month - 1, day); // Month is 0-based in JavaScript
  });

  // Function to disable unavailable dates
  const isTileDisabled = ({ date }: { date: Date }) =>
    !availableDates.some((d) => d.toDateString() === date.toDateString());

  // Function to highlight available dates
  // const tileClassName = ({ date }: { date: Date }) => {
  //   return availableDates.some((d) => d.toDateString() === date.toDateString())
  //     ? "bg-blue-500 text-white rounded-full"
  //     : "";
  // };

  const handleDateChange = (value: Date | Date[] | null, event: MouseEvent) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };
  
  return (
    <>

    
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Book an Appointment</h2>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Date Picker Section */}
          <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Select an Available Date</h3>

            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileDisabled={isTileDisabled}
              // tileClassName={tileClassName}
              className="appointment-calendar"
              next2Label={null}
              prev2Label={null}
              nextLabel={<p className="font-semibold text-base px-3 text-[#ff9017]">Next</p>}
              prevLabel={<p className="font-semibold text-base px-3 text-[#ff9017]">Prev</p>}
            />

            {selectedDate && (
              <p className="mt-4 text-green-600 font-semibold">
                Selected Date: {selectedDate.toDateString()}
              </p>
            )}
          </div>

          {/* Specialist Info Section */}
          <div className="w-full md:w-1/2">
            <Image
              src={specialist.profileImage}
              alt={specialist.firstname}
              width={400}
              height={400}
              className="rounded-lg object-cover"
            />
            <h3 className="text-xl font-semibold mt-4">
              {specialist.title} {specialist.firstname} {specialist.lastname}
            </h3>
            <p className="text-gray-500">{specialist.aos}</p>
            <p className="text-green-600 font-medium mt-2">N{specialist.fee}</p>

            {/* Book Button */}
            <button
              className="mt-4 bg-blue-500 hover:bg-orange-500 text-white py-2 px-4 rounded-lg"
              disabled={!selectedDate}
              onClick={() => alert(`Appointment booked for ${selectedDate?.toDateString()}`)}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
