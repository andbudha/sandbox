import React, {useCallback} from 'react';
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
import {Clock} from "./11/Clock";



export type FilterValuesType = "all" | "active" | "completed";

export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

const AppPlusRedux=()=> {

    // The use of useSelector hook!!!
    const todolists = useSelector<AppRootStateType, ToDoListType[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);

    const dispatch = useDispatch();

    const updateTaskTitle = useCallback((todolistID: string,taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskId, newTitle));
    },[dispatch]);

    const removeTask = useCallback((todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID));
    },[dispatch]);

    const addTask = useCallback((todolistID: string,title: string) => {
        dispatch(addTaskAC(todolistID, title));
    },[dispatch]);

    const changeStatus = useCallback((todolistID: string,taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskId, isDone));
    }, [dispatch]);

    const  changeFilter = useCallback((todolistID: string,value: FilterValuesType) => {
        dispatch(ChangeListFilterAC(todolistID, value));
    }, [dispatch]);

    const removeList = useCallback((todolistID: string) => {
        dispatch(RemoveToDoListAC(todolistID));
    }, [dispatch]);

    const createToDoListHandler = useCallback ((newListTitle: string) => {
        dispatch(AddToDoListAC(newListTitle));
    },[dispatch]);

    const updateToDoListTitle = useCallback((todolistID: string, newTitle: string) => {
        dispatch(ChangeListTitleAC(newTitle, todolistID));
    }, [dispatch]);

    return(
        <div className="App">

            <ButtonAppBar/>
            <Container fixed>
                <Grid container className={'container_padding'}>
                    <Input callBack={createToDoListHandler}/>
                </Grid>

                <Grid container spacing={3}>
                    {todolists.map(list=>{

                        return(
                            <Grid item>
                                <Paper className={'paper_note'} elevation={3}>
                                    <Todolist
                                        key={list.id}
                                        todolistID={list.id}
                                        title={list.title}
                                        tasks={tasks[list.id]}
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
            <br/>
            <br/>
            <Clock/>
        </div>
    )
}

export default AppPlusRedux;
