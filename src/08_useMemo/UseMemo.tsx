import React, {useMemo, useState} from 'react';

const UseMemo = () => {

    const[A, setA]=useState(5);
    const[B, setB]=useState(5);

    let resultA = 1;
    let resultB = 1;

    //we use useMemo to avoid vain/useless rendering of A if its value remains intact
    resultA = useMemo(()=>{
        let tempResultA = 1;
        for (let i = 1; i<=A; i++){
            let fake = 0;
            while (fake<10000000){
                fake++
                const fakeValue = Math.random();
            }

            resultA = tempResultA * i;
        }
        return tempResultA;
    }, [A])


    for (let i = 1; i<=B; i++){
        resultB = resultB * i;
    }


    return (
        <div>
            <h2>useMemo-hook practicing</h2>
            <br/>
            <h3>Number A</h3>
            <input value={A} onChange={(event)=>setA(Number(event.currentTarget.value))}/>
            <br/>
            <br/>
            <h3>Number B</h3>
            <input value={B} onChange={(event)=>setB(Number(event.currentTarget.value))}/>
            <br/>
            <div>
                <h2>Result for A: {resultA}</h2>
            </div>
            <div>
                <h2> Result for B: {resultB}</h2>
            </div>
        </div>
    );
};

export default UseMemo;