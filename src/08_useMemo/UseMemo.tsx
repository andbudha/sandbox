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


{/*


//just a copy for practicing

import React, {useMemo, useState} from 'react';


type UserType = {
    name: string
    age: number
}
type UserPropsType = {
    users: UserType[]
}




type MessageCounterType = {
    counterValue: number
}
const MessageCounter = (props: MessageCounterType) => {
    return(
        <div>
            {props.counterValue}
        </div>
    );
}

const UsersSecret = (props: UserPropsType) => {

    console.log('users rendered!')
    return (
        <div>
            <ul>
                {props.users.map((user, index)=>{
                    return(
                        <li key={index}>{user.name}</li>
                    );
                })}
            </ul>

        </div>
    );
}


const Users = React.memo(UsersSecret);



export const UseMemoTwo = () => {


    const[users, setUsers] = useState([
        {name: 'Andrei', age: 40},
        {name: 'Delia', age: 5},
        {name: 'Natalia', age: 37},
        {name: 'Dorian', age: 1}
    ]);

    const[counterValue, setCounterValue]=useState(0);

    console.log('rendered',counterValue);

    const newArray = useMemo(()=>{
        const newArray = users.filter(user=>user.name.toLowerCase().indexOf('n') > -1);
        return newArray;
    }, [])

    return(
        <div className={'memo_container'}>
            <h2>useMemo 2 - Practice</h2>
            <MessageCounter counterValue={counterValue}/>
            <button onClick={()=>{setCounterValue(counterValue+1)}}>Increment Number</button>
            <Users users={newArray}/>
        </div>
    );
};



*/}