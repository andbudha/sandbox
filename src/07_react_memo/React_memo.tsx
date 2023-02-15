import React, {useState} from 'react';


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

    console.log('Users rendered!')
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



export const ReactMemo = () => {


    const[users, setUsers] = useState([
        {name: 'Andrei', age: 40},
        {name: 'Delia', age: 5},
        {name: 'Natalia', age: 37},
        {name: 'Dorian', age: 1}
    ]);
    const[counterValue, setCounterValue]=useState(0);
    console.log('value rendered:', counterValue);

    return(
        <div>
            <MessageCounter counterValue={counterValue}/>
            <button onClick={()=>{setCounterValue(counterValue+1)}}>Increment Number</button>
            <Users users={users}/>
            <button>Add User</button>
        </div>
    );
};

