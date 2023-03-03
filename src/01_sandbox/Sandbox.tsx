import React, {useEffect, useState} from 'react';



export const Sandbox = () => {


    const[counter, setCounter]=useState(0);
    const[fake, setFake]=useState(0);

    console.log('Sandbox logged!');

    useEffect(()=>{

        console.log('useEffect logged!');

        setInterval(()=>{
            setCounter(state=>state+1);
        }, 1000)
    }, []);

    return (
        <div>
            <h3>SANDBOX</h3>
            <h2>{counter}</h2>
            <button onClick={()=>setCounter(counter+1)}>increment</button>
            <h2>{fake}</h2>
            <button onClick={()=>setFake(fake+1)}>fake</button>
        </div>
    );
};
