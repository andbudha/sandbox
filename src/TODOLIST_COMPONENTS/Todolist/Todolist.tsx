import React, {memo, useCallback} from 'react';
import {FilterValuesType} from '../../App';
import {Input} from "../Input/Input";
import {TitleChanger} from "../TitleChanger/TitleChanger";
import IconButton from '@mui/material/IconButton';
import {Delete} from "@mui/icons-material";
import Button from '@mui/material/Button';
import {SuperCheckbox} from "../Super_checkbox/SuperCheckbox";
import './Todolist.css'



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string,taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string,title: string) => void
    changeTaskStatus: (todolistID: string,taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeList:(todolistID: string)=> void
    updateTaskTitle:(todolistID: string,taskId: string, newTitle: string)=> void
    updateToDoListTitle:(todolistID: string, newTitle: string)=> void
}

export const Todolist = memo((props: PropsType) => {

    console.log('Todolist rendered!');

    const onAllClickHandler = () => props.changeFilter(props.todolistID,"all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID,"active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID,"completed");


    const removeListHandler = () => {
        props.removeList(props.todolistID);
    }

    const addTaskViaInput = useCallback((newTitle: string) => {
        props.addTask(props.todolistID, newTitle);
    },[props.addTask, props.todolistID]);

    const updateTodolistTitleHandler = (newTitle: string) => {
        props.updateToDoListTitle(props.todolistID, newTitle);
    }


    const checkboxStatusHandler = (changedStatus: boolean, taskID: string) => {
        props.changeTaskStatus(props.todolistID, taskID, changedStatus);
    }


    let tasksForTodolist = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }

    return <div>
        <h3>
            <TitleChanger title={props.title} callBack={updateTodolistTitleHandler}/>

            <IconButton aria-label="delete" onClick={removeListHandler}>
                <Delete />
            </IconButton>
        </h3>

        <Input callBack={addTaskViaInput}/>
        <ul>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID,t.id);
                    
                    const updateTasTitleHandler = (newTitle: string) => {
                      props.updateTaskTitle(props.todolistID, t.id, newTitle);
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>

                        <SuperCheckbox callBack={(changedStatus)=>checkboxStatusHandler(changedStatus,t.id)} checkboxStatus={t.isDone}/>

                        <TitleChanger title={t.title} callBack={updateTasTitleHandler}/>

                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "contained"} color="success" onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? "outlined" : "contained"} color="error" onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "contained"} color="secondary" onClick={onCompletedClickHandler}>Completed</Button>

        </div>
    </div>
});
