import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();


    let[todolists, setTodolists]=useState<Array<ToDoListType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}

    ])

    let [tasks, setTasks] = useState({
        [todolistID1] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todolistID2] : [
            {id: v1(), title: "HTML&CSS-2", isDone: true},
            {id: v1(), title: "JS-2", isDone: true},
            {id: v1(), title: "ReactJS-2", isDone: false}
        ]
    });


    function removeTask(todolistID: string, taskID: string) {
        setTasks({...tasks,[todolistID]:[...tasks[todolistID].filter(task=>task.id!==taskID)]});
    }

    function addTask(title: string) {

    }

    function changeStatus(taskId: string, isDone: boolean) {

    }

    function changeFilter(value: FilterValuesType) {

    }

    return (
        <div className="App">
            {todolists.map(list=>{

                let tasksForTodolist = tasks[list.id];

                if (list.filter === "active") {
                    tasksForTodolist = tasks[list.id].filter(t => !t.isDone);
                }
                if (list.filter === "completed") {
                    tasksForTodolist = tasks[list.id].filter(t => t.isDone);
                }


                return(
                    <Todolist
                        todolistID={list.id}
                        title={list.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={list.filter}
                    />
                );
            })}

        </div>
    )
}

export default App;
