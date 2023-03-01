import React, {useState} from 'react';


export const UseStateTwo = () => {

    const changer = (state: number) => {
        return state + 3
    }

    const[counter, setCounter]=useState(0);
    return (
        <div>
            <h2>useState-Feature-Two</h2>
            <h2>{counter}</h2>
            <button onClick={()=>setCounter(changer)}>increment</button>
        </div>
    );
};


//we can pass a function as an argument when setting the counter: setCounter(changer),
//in our case it is a function tha calculates a value. The useState hook will not remember the function as data,
// it will call it to get the data needed.