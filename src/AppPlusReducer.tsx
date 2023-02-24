import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './TODOLIST_COMPONENTS/Todolist/Todolist';
import {v1} from 'uuid';
import {Input} from "./TODOLIST_COMPONENTS/Input/Input";
import ButtonAppBar from "./components/ButtonAppBar/ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {UseCallBack} from "./09_useCallback/UseCallBack";
import {
    AddToDoListAC,
    ChangeListFilterAC,
    ChangeListTitleAC,
    removeToDoListAC,
    TodolistReducer
} from "./08_todolist_tests_on_reducer/todolist_reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC, RemoveToDoListAC,
    tasksReducer
} from "./09_state/tasks-reducer";


export type FilterValuesType = "all" | "active" | "completed";

export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();


    let[todolists, dispatchToTodolists]=useReducer(TodolistReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}

    ])


    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
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
        dispatchToTasks(changeTaskTitleAC(todolistID, taskId, newTitle));
    }

    function removeTask(todolistID: string, taskID: string) {
        dispatchToTasks(removeTaskAC(todolistID, taskID));
    }

    function addTask(todolistID: string,title: string) {
        dispatchToTasks(addTaskAC(todolistID, title));
    }

    function changeStatus(todolistID: string,taskId: string, isDone: boolean) {
        dispatchToTasks(changeTaskStatusAC(todolistID, taskId, isDone));
    }

    function changeFilter(todolistID: string,value: FilterValuesType) {
        dispatchToTodolists(ChangeListFilterAC(todolistID, value))
    }

    const removeList = (todolistID: string) => {
        dispatchToTodolists(removeToDoListAC(todolistID));
        dispatchToTasks(RemoveToDoListAC(todolistID));
    }

    const createToDoListHandler = (newListTitle: string) => {
        let action = AddToDoListAC(newListTitle);
        dispatchToTodolists(action);
        dispatchToTasks(action);
    }

    const updateToDoListTitle = (todolistID: string, newTitle: string) => {
        dispatchToTodolists(ChangeListTitleAC(newTitle, todolistID));
    }
    return (
        <div className="App">

            <ButtonAppBar/>
            <Container fixed>
                <Grid container className={'container_padding'}>
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
                                <Paper className={'paper_note'} elevation={3}>
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
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>

            <hr/>

            <UseCallBack/>

        </div>
    )
}

export default App;
