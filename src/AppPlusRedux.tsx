import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './TODOLIST_COMPONENTS/Todolist/Todolist';
import {v1} from 'uuid';
import {Input} from "./TODOLIST_COMPONENTS/Input/Input";
import ButtonAppBar from "./components/ButtonAppBar/ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    AddToDoListAC,
    ChangeListFilterAC,
    ChangeListTitleAC,
    TodolistReducer
} from "./08_todolist_tests_on_reducer/todolist_reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC, RemoveToDoListAC,
    tasksReducer, TaskStateType
} from "./09_state/tasks-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./10_store/10_store";


export type FilterValuesType = "all" | "active" | "completed";

export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function AppPlusRedux() {

    let todolistID1 = v1();
    let todolistID2 = v1();


    const todolists = useSelector<AppRootStateType, ToDoListType[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);



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
        console.log(isDone);
        dispatchToTasks(changeTaskStatusAC(todolistID, taskId, isDone));
    }

    function changeFilter(todolistID: string,value: FilterValuesType) {
        dispatchToTodolists(ChangeListFilterAC(todolistID, value))
    }

    const removeList = (todolistID: string) => {
        const action = RemoveToDoListAC(todolistID)
        dispatchToTodolists(action);
        dispatchToTasks(action);
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
        </div>
    )
}

export default AppPlusRedux;
