import React from "react";

import axios from "axios";


//schedule appointment
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function scheduleAppointment(
    title:string,
    firstname:string,
    lastname:string,
    email:string,
    phone:string,
    purpose:string,
    visit_date:string,
    scheduled_time:string,
    consultant:string,
    consultant_uuid:string,
    gender:string,
          
           
        
        
  ) {
    try {
      const response = await axios.post(
        `${API_URL}api/appointment/create`,
        { title, firstname, lastname, email, phone, purpose, visit_date, scheduled_time, consultant, consultant_uuid}
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || "Unable to schedule appointment"
      );
    }
  }
  
  