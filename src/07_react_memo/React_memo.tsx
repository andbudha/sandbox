import React, {useState} from 'react';
import './React_memo.css'


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

    
    
    //add user func
    
    const addUserHandler = () => {
        const userCopy = users.map(user=>user);
        userCopy.push({name: 'Mihai', age: 75});
        setUsers(userCopy);
    }

    return(
        <div className={'memo_container'}>
            <h2>React Memo Practice</h2>
            <MessageCounter counterValue={counterValue}/>
            <button onClick={()=>{setCounterValue(counterValue+1)}}>Increment Number</button>
            <Users users={users}/>
            <button onClick={addUserHandler}>Add User</button>
        </div>
    );
};

