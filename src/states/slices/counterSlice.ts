import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
    value : number;
}

//set the initial state

const initialState : CounterState = {
    value : 0
}

//counter slice

const counterSlice = createSlice({
    name : 'counter',
    initialState,
    reducers : {
        increment : (state) => {
            state.value++;
        },
        decrement : (state) => {
            state.value--;
        },
        incrementByAmount : (state, action : PayloadAction<number>) => {
            state.value += action.payload;
        },

        // mutiplyByAamount : (state, action : PayloadAction<number>) => {
        //     state.value *= action.payload;
        // }
    }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;