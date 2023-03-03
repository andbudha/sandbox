import React, {useEffect, useState} from 'react';

export const UseEffectTwo = () => {

    const[counter, setCounter]=useState(0);

    useEffect(()=>{
        setInterval(()=>{
            setCounter((state)=> state+3);
            console.log('tick')
        }, 1000)
    }, []);

    return (
        <div>
            <h3>SANDBOX</h3>
            <h2>{counter}</h2>

        </div>
    );
};

