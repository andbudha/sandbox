import React, {useMemo, useState} from 'react';



const generateValue = () => {
    console.log('generate-value carried-out')
    return 55+125 -169;
}

export const UseState = () => {

    //const initialValue = useMemo(generateValue, []);
    console.log('counter increased');

    const[counter, setCounter]=useState(generateValue);
    return (
        <div>
            <h2>{counter}</h2>
            <button onClick={()=>setCounter(counter+1)}>increment</button>
        </div>
    );
};

//in order to somehow prevent either a component or a function from undesirable rendering/calling we can
//make use of the useMemo hook. In the useState hook case, the useState hook can easily do without the
//useMemo hook if an undesirable rendering/calling is to be avoided.
//In this case an undesirable rendering/calling of a function has got to do with some possible difficult
//mathematical operation