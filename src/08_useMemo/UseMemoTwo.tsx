import React, {useMemo, useState} from 'react';



export const UseMemoTwo = () => {

    const[users, setUsers]=useState([
        {name: 'Andrei', age: 40},
        {name: 'Delia', age: 5},
        {name: 'Natalia', age: 37},
        {name: 'Dorian', age: 1}
    ]);

    const userArray = useMemo(()=>{
        return users.filter(user=>user.name.toLowerCase().indexOf('n')>-1);

    }, [])

    console.log('Users rendered:', users.length);
    const[counterValue, setCounterValue]=useState(0);

    console.log('CounterValue - rendered:', counterValue);

    return (
        <div>
            <h2>Message Count</h2>
            <MessageCount counterValue={counterValue}/>
            <button onClick={()=>setCounterValue(counterValue+1)}>INCREASE USER-COUNT</button>
            <Users users={userArray}/>
        </div>
    );
};



type MessageCountPropsType = {
    counterValue: number
}

const MessageCount = (props: MessageCountPropsType) => {
    return(
        <div>
            {props.counterValue}
        </div>
    );
}





type UserType = {
    name: string
    age: number
}

type UsersPropsType = {
    users: UserType[]
}
const UsersSecret = (props: UsersPropsType) => {
    return(
        <div>
            <ul>
                {props.users.map((user, index)=>{
                    console.log(user.name);
                    return(
                        <li key={index}>{user.name}</li>
                    );
                })}
            </ul>
        </div>
    );
}

const Users = React.memo(UsersSecret);