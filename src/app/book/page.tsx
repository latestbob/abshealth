import Navbar from "@/components/navbar";
import Image from "next/image";
import Link from "next/link";
import { ISpecialist } from "@/Interfaces/specialist";

// Fetch specialists from an API on the server
async function getSpecialists(): Promise<ISpecialist[]> {
    const res = await fetch("http://localhost:4000/api/specialist/fetch", {
      cache: "no-store", // Ensures fresh data per request (optional)
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch specialists");
    }
  
    const data = await res.json();
  return data.specialists;
  }
  
  

export default async function Book() {
  const specialists : ISpecialist[] = await getSpecialists(); // Fetching specialists on the server

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="w-full bg-[#1997cf] min-h-[25vh] flex justify-center items-center space-x-8 px-10">
        <div className="w-[60%] py-3">
          <h2 className="font-bold text-3xl text-white">Book Your Physiotherapy Session with Ease</h2>
          <p className="text-white font-medium mt-3">
            Take the first step toward pain relief and recovery. Schedule an appointment with our expert physiotherapists at
            <br /> Nello Physiotherapy Clinic and get personalized care tailored to your needs.
          </p>
        </div>
      </div>

      {/* Specialists Section */}
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Meet Our Specialists</h2>
        <br />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {specialists.map((specialist) => (
            <div key={specialist.uuid} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img 
                src={specialist.profileImage || "https://via.placeholder.com/300"} 
                alt={specialist.firstname} 
                className="w-full h-80 object-cover"
              />
              
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{specialist.title} {specialist.firstname} {specialist.lastname}</h3>
                <p className="text-gray-500">{specialist.aos || "Specialist"}</p>
                <p className="text-green-600 font-medium mt-2">N{specialist.fee || "N/A"}</p>
                

                <Link href={`/book/${specialist.uuid}`}>
                <button className="mt-4 bg-[#1997cf] hover:bg-[#ff9017] text-white py-2 px-4 rounded-lg cursor-pointer">
                  Book Appointment
                </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
