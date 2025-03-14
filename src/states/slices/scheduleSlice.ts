import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface ScheduleState {
    date :string,
    time:string,
    purpose:string;
    consultant:string;
    consultant_uuid:string;
    
}

const initialState : ScheduleState = {
    date:"",
    time:"",
    purpose:"",
    consultant:"",
    consultant_uuid:""
}

//create user slice

const scheduleSlice = createSlice({
    name : 'schedule',
    initialState,
    reducers : {
        setDate : (state, action : PayloadAction<string>) => {
            state.date = action.payload;
        },
        setTime : (state, action : PayloadAction<string>) => {
            state.time = action.payload;
        },

        setPurpose : (state, action : PayloadAction<string>) => {
            state.purpose = action.payload;
        },

        setConsultant : (state, action : PayloadAction<string>) => {
            state.consultant = action.payload;
        },

        setConsultantUuid : (state, action : PayloadAction<string>) => {
            state.consultant_uuid = action.payload;
        }
    }
})

export const { setDate, setTime, setPurpose, setConsultant, setConsultantUuid } = scheduleSlice.actions;

export default scheduleSlice.reducer;