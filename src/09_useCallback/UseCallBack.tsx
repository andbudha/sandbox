import React, {useCallback, useState} from 'react';


export const UseCallBack = () => {
    const [counter, setCounter] = useState(0);
    const [todos, setTodos] = useState(['Task: 1', 'Task: 2']);
    const increment = () => {
        setCounter(counter+1);
    }

    const addTask = useCallback(()=>{
        setTodos((t)=>[...t, 'New Task']);
    }, [todos]);



    return(
        <div>
            <h1>{counter}</h1>
            <button onClick={increment}>increment</button>
            <br/>
            <hr/>
            <br/>
            <NewAddTask todos={todos} AddNewTask={addTask}/>
        </div>
    );
}


type AddTaskPropsType = {
    todos: Array<string>
    AddNewTask: ()=> void
}
const AddTask =(props: AddTaskPropsType)=>{

    return(
        <div>
            <ul>
                {props.todos.map((task, index)=>{
                    return(
                        <li key={index}>{task}</li>
                    );
                })}
            </ul>
            <button onClick={props.AddNewTask}>add task</button>

        </div>
    );
}


const NewAddTask = React.memo(AddTask);