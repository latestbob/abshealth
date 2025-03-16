"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import useSchedule from "@/hooks/useSchedule";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import { getBlockedTime } from "@/services/blockedtimeService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/states/store";
import { setConsultant, setConsultantUuid, setDate, setPurpose, setTime } from "@/states/slices/scheduleSlice";
import Link from "next/link";

interface ISpecialist {
  title: string;
  firstname: string;
  lastname: string;
  profileImage: string;
  aos: string;
  fee: number;
  uuid: string;
}

interface FormValues {
  date: Date;
  time: string;
}

export default function SpecialistBookingPage() {
  const { specialist, schedules } = useSchedule();
  const [blockedtime, setBlockedTime] = useState<any[]>([]);

  const date = useSelector((state: RootState) => state.schedule.date);
  const time = useSelector((state: RootState) => state.schedule.time);
  const purpsose = useSelector((state:RootState) => state.schedule.purpose);
  const consultant = useSelector((state:RootState) => state.schedule.consultant);
  const consultant_uuid = useSelector((state:RootState)=> state.schedule.consultant_uuid);


  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const selectedDate = watch("date");
  const selectedTime = watch("time");

  // Initialize time slots
  const defaultTimes = [
    { value: "09:00:00", label: "9:00 am" },
    { value: "09:30:00", label: "9:30 am" },
    { value: "10:00:00", label: "10:00 am" },
    { value: "10:30:00", label: "10:30 am" },
    { value: "11:00:00", label: "11:00 am" },
    { value: "11:30:00", label: "11:30 am" },
    { value: "12:00:00", label: "12:00 pm" },
    { value: "12:30:00", label: "12:30 pm" },
    { value: "13:00:00", label: "1:00 pm" },
    { value: "13:30:00", label: "1:30 pm" },
    { value: "14:00:00", label: "2:00 pm" },
    { value: "14:30:00", label: "2:30 pm" },
    { value: "15:00:00", label: "3:00 pm" },
    { value: "15:30:00", label: "3:30 pm" },
    { value: "16:00:00", label: "4:00 pm" },
    { value: "16:30:00", label: "4:30 pm" },
    { value: "17:00:00", label: "5:00 pm" },
    { value: "17:30:00", label: "5:30 pm" },
    { value: "18:00:00", label: "6:00 pm" },
  ];

// Dynamically mark blocked times
// const times = defaultTimes.map((time) => ({
//   ...time,
//   match: blockedtime.includes(time.label),
// }));

const blockedTimeLabels = blockedtime.map((item) => item.time);

const times = defaultTimes.map((time) => ({
  ...time,
  match: blockedTimeLabels.includes(time.label),
}));


  // Convert "DD/MM/YYYY" schedule dates to JavaScript Date objects
  const availableDates: Date[] = schedules.map((schedule) => {
    const [day, month, year] = schedule.date.split("/").map(Number);
    return new Date(year, month - 1, day); // Month is 0-based in JavaScript
  });

  // Disable unavailable dates
  const isTileDisabled = ({ date }: { date: Date }) =>
    !availableDates.some((d) => d.toDateString() === date.toDateString());

  // Fetch blocked times
  useEffect(() => {
    async function fetchBlockedTime() {
      if (!specialist?.uuid || !selectedDate) return;

      try {
        const result = await getBlockedTime(
          specialist.uuid,
          moment(selectedDate).format("D/MM/YYYY")
        );
        setBlockedTime(result.disabledtimes || []);
        console.log(result);
        console.log(blockedtime);
      } catch (err: any) {
        alert(`Error: ${err.message}`);
      }
    }

    fetchBlockedTime();
  }, [specialist?.uuid, selectedDate]);

  if (!specialist) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Book an Appointment
        </h2>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Date Picker Section */}
          <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              Select an Available Date
            </h3>

            <Controller
              name="date"
              control={control}
              rules={{ required: "Appointment date is required" }}
              render={({ field }) => (
                <Calendar
                  {...field}
                  minDate={new Date()}
                  onChange={(value) => field.onChange(value)}
                  
                  
                  value={field.value || selectedDate}
                  next2Label={null}
                  prev2Label={null}
                  nextLabel={<p className="font-semibold text-[#ff9017]">Next</p>}
                  prevLabel={<p className="font-semibold text-[#ff9017]">Prev</p>}
                  tileDisabled={isTileDisabled}
                  className="appointment-calendar"
                />
              )}
            />

            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}

            {/* Time Slot Selection */}
            {selectedDate && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {times.map((row, index) =>
                  row.match ? (
                    <div
                      key={index}
                      className="p-1 rounded-lg text-center bg-gray-400 text-white"
                    >
                      {row.label}
                    </div>
                  ) : (
                    <Controller
                      key={index}
                      name="time"
                      control={control}
                      rules={{ required: "Appointment time is required" }}
                      render={({ field }) => (
                        <div
                          className={`p-1 rounded-lg cursor-pointer text-center border ${
                            field.value === row.label
                              ? "bg-green-700 text-white"
                              : "bg-gray-100"
                          }`}
                          // onClick={() => setValue("time", row.value)}
                          onClick={() => {
                            setValue("time", row.label); // Update React Hook Form state
                            dispatch(setTime(row.label)); // Dispatch to Redux
                          }}
                        >
                          {row.label}
                        </div>
                      )}
                    />
                  )
                )}
              </div>
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

            {/* Confirmation Message */}
            {selectedDate && selectedTime && (
              <div className="alert alert-info mt-4">
                <p>You have selected:</p>
                <p className="text-[#1997cf] font-semibold">
                  {moment(selectedDate).format("dddd, MMMM DD, YYYY")} at{" "}
                  {moment(selectedTime, "HH:mm:ss").format("h:mm a")}
                </p>
              </div>
            )}

            {/* Confirm Booking Button */}

            <Link href={`/book/${specialist.uuid}/complete`}
      
             
              
            ><button onClick={function(){
              dispatch(setDate(selectedDate.toString()))
              dispatch(setPurpose(specialist.aos));
              dispatch(setConsultant(specialist.title + " " + specialist.firstname + " " + specialist.lastname));
              dispatch(setConsultantUuid(specialist.uuid));
            }}
            className="w-1/2 mt-4 bg-[#1997cf] hover:bg-orange-500 text-white py-2 px-4 rounded-lg"
            disabled={!selectedDate || !selectedTime}
            
            
          >
            Confirm Booking
          </button>
             
            </Link>
            
          </div>
        </div>
      </div>
    </>
  );
}
