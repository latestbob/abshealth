import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/states/store";
import { increment, decrement, incrementByAmount } from "@/states/slices/counterSlice";

function useCounter(){
    
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();


    const incrementCount = () => {
        dispatch(increment());
    }

    const decrementCount = () => {
        dispatch(decrement());
    }

    const incrementByAmountCount = (amount : number) => {
        dispatch(incrementByAmount(amount));
    }

    return {count, incrementCount, decrementCount, incrementByAmountCount};
}



 export default useCounter;