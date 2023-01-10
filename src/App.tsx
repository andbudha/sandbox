import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {Input} from "./Input/Input";
import ButtonAppBar from "./components/ButtonAppBar/ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


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

    const updateTaskTitle = (todolistID: string,taskId: string, newTitle: string) => {
        setTasks(({...tasks, [todolistID]:[...tasks[todolistID].map(task=>task.id===taskId ? {...task, title: newTitle} : task)]}))
    }

    function removeTask(todolistID: string, taskID: string) {
        setTasks({...tasks, [todolistID]:[...tasks[todolistID].filter(task=>task.id!==taskID)]});
    }

    function addTask(todolistID: string,title: string) {
        const newTask = {id: v1(), title: title, isDone: true}
        setTasks({...tasks, [todolistID]:[newTask, ...tasks[todolistID]]});
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

    const createToDoListHandler = (newListTitle: string) => {
        const newID = v1();
        const newList: ToDoListType =  {id: newID, title: newListTitle, filter: 'all'}
        setTodolists([...todolists, newList])
        setTasks({...tasks, [newID]:[
                {id: v1(), title: "HTML&CSS-3", isDone: true},
                {id: v1(), title: "JS-3", isDone: true},
                {id: v1(), title: "ReactJS-3", isDone: false}
            ]})
    }

    const updateToDoListTitle = (todolistID: string, newTitle: string) => {
        setTodolists(todolists.map(list=>list.id===todolistID ? {...list, title: newTitle} : list))
    }
    return (
        <div className="App">

            <ButtonAppBar/>
            <Container fixed>
                <Grid container>
                    <Input callBack={createToDoListHandler}/>
                </Grid>

                <Grid container spacing={3}>
                    {todolists.map(list=>{

                        let tasksForTodolist = tasks[list.id];

                        if (list.filter === "active") {
                            tasksForTodolist = tasks[list.id].filter(t => !t.isDone);
                        }
                        if (list.filter === "completed") {
                            tasksForTodolist = tasks[list.id].filter(t => t.isDone);
                        }


                        return(
                            <Grid item>
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
                                updateTaskTitle={updateTaskTitle}
                                updateToDoListTitle={updateToDoListTitle}
                            />
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>


        </div>
    )
}

export default App;
