
import { useParams } from "next/navigation";
import { useEffect, useState,  } from "react";



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
    date: string;
    specialist_uuid:string;
  }

 


function useSchedule(){

    const { uuid } = useParams();

   

  const [specialist, setSpecialist] = useState<ISpecialist | null>(null);
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;



      useEffect(() => {
    if (!uuid) return;



    const fetchSpecialistData = async () => {
      try {
        const response = await fetch(`${API_URL}specialist/unique/${uuid}`);
        const data = await response.json();

        if (data.status === "success") {
          setSpecialist(data.specialist);
          setSchedules(data.schedules);
        }
      } catch (error) {
        console.error("Error fetching specialist data:", error);
      }
    };

    fetchSpecialistData();
  }, [uuid]);


   

    return {specialist, schedules, selectedDate, uuid};
}



 export default useSchedule;