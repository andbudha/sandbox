import React, {useEffect, useState} from 'react';

export const Clock = () => {
    const [time, setTime]=useState(new Date());


    useEffect(()=>{
        setInterval(()=>{
            setTime(new Date());
        }, 1000)
    }, [time])

    const getTwoDigits = (number: number) => number < 10 ? '0' + number : number;


    return (
        <div>
            <span>{getTwoDigits(time.getHours())}</span>
            :
            <span>{getTwoDigits(time.getMinutes())}</span>
            :
            <span>{getTwoDigits(time.getSeconds())}</span>
        </div>
    );
};
