import React from 'react';
import './App.css';
import {Todolist} from './TODOLIST_COMPONENTS/Todolist/Todolist';
import {Input} from "./TODOLIST_COMPONENTS/Input/Input";
import ButtonAppBar from "./components/ButtonAppBar/ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    AddToDoListAC,
    ChangeListFilterAC,
    ChangeListTitleAC,
} from "./08_todolist_tests_on_reducer/todolist_reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC, RemoveToDoListAC,
    TaskStateType
} from "./09_state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./10_store/10_store";


export type FilterValuesType = "all" | "active" | "completed";

export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function AppPlusRedux() {

    // The use of useSelector hook!!!
    const todolists = useSelector<AppRootStateType, ToDoListType[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);

    const dispatch = useDispatch();

    const updateTaskTitle = (todolistID: string,taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskId, newTitle));
    }

    function removeTask(todolistID: string, taskID: string) {
        dispatch(removeTaskAC(todolistID, taskID));
    }

    function addTask(todolistID: string,title: string) {
        dispatch(addTaskAC(todolistID, title));
    }

    function changeStatus(todolistID: string,taskId: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(todolistID, taskId, isDone));
    }

    function changeFilter(todolistID: string,value: FilterValuesType) {
        dispatch(ChangeListFilterAC(todolistID, value))
    }

    const removeList = (todolistID: string) => {
        dispatch(RemoveToDoListAC(todolistID));
    }

    const createToDoListHandler = (newListTitle: string) => {
        dispatch(AddToDoListAC(newListTitle));
    }

    const updateToDoListTitle = (todolistID: string, newTitle: string) => {
        dispatch(ChangeListTitleAC(newTitle, todolistID));
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
