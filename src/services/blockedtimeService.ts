import React from "react";

import axios from "axios";

//get all registered patient

export async function getBlockedTime(uuid:string, date:string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}schedule?uuid=${uuid}&date=${date}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Unable to get blocked time"
    );
  }
}