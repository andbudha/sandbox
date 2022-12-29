import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {Input} from "./components/Input";


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
    
    
    const updateTask = (todolistID: string, taskID: string, newTitle: string) => {
        setTasks({...tasks, [todolistID]:[...tasks[todolistID].map(el=>el.id===taskID ? {...el, title: newTitle} : el)]})
    }
    
    const updateToDoList = (todolistID: string, newTitle: string) => {
        setTodolists(todolists.map(el=>el.id===todolistID ? {...el, title: newTitle} : el));
    }
    
    function removeTask(todolistID: string, taskID: string) {
        setTasks({...tasks, [todolistID]:[...tasks[todolistID].filter(task=>task.id!==taskID)]});
    }

    function addTask(todolistID: string,title: string) {
        const newTask = {id: v1(), title: title, isDone: true}
        setTasks({...tasks, [todolistID]:[newTask, ...tasks[todolistID]]});
    }

    const addToDoList = (title: string) => {
        const newID= v1();
        const newTodo:ToDoListType  = {id: newID, title: title, filter: 'all'};
        setTodolists([...todolists, newTodo]);
        setTasks({[newID]:[{id: v1(), title: "ReactJS-2", isDone: false}], ...tasks});
    }


    function changeStatus(todolistID: string,taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]:[...tasks[todolistID].map(task=>task.id===taskId ? {...task, isDone} : task)]})
    }

    function changeFilter(todolistID: string,value: FilterValuesType) {
        setTodolists( [...todolists.map(list=>list.id===todolistID ? {...list, filter: value} : list)])
    }

    const removeList = (todolistID: string) => {
        setTodolists([...todolists.filter(list=>list.id!==todolistID)]);
        delete (tasks[todolistID]);
    }

    return (
        <div className="App">
            <Input callBack={addToDoList}/>

            {todolists.map(list=>{

                let tasksForTodolist = tasks[list.id];

                if (list.filter === "active") {
                    tasksForTodolist = tasks[list.id].filter(t => !t.isDone);
                }
                if (list.filter === "completed") {
                    tasksForTodolist = tasks[list.id].filter(t => t.isDone);
                }
                // console.log(tasksForTodolist)

                return(
                    <Todolist
                        key={list.id}
                        todolistID={list.id}
                        title={list.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={list.filter}
                        removeList={removeList}
                        updateTask={updateTask}
                        updateToDoList={updateToDoList}
                    />
                );
            })}

        </div>
    )
}

export default App;
