import React, {useEffect, useState} from 'react';

export const UseEffectOne = () => {

    const[counter, setCounter]=useState(0);
    const[fake, setFake]=useState(0);

    useEffect(()=>{
        console.log('useEffect after each render!')
    });

    useEffect(()=>{
        console.log('useEffect single render, similar to Component-did-mount!')
    }, []);

    useEffect(()=>{
        console.log('useEffect after counter increases!')
    }, [counter]);

    return (
        <div>
            <h2>useEffect-Feature-One</h2>
            <h2>{counter}</h2>
            <button onClick={()=>setCounter(counter+1)}>counter</button>
            <button onClick={()=>setFake(fake+1)}>fake</button>

        </div>
    );
};

