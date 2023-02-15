import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../../App';
import {Input} from "../Input/Input";
import {TitleChanger} from "../TitleChanger/TitleChanger";
import IconButton from '@mui/material/IconButton';
import {Delete} from "@mui/icons-material";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
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

export function Todolist(props: PropsType) {



    const onAllClickHandler = () => props.changeFilter(props.todolistID,"all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID,"active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID,"completed");


    const removeListHandler = () => {
        props.removeList(props.todolistID);
    }

    const inputValueHandler = (newTitle: string) => {
        props.addTask(props.todolistID, newTitle);
    }

    const updateTodolistTitleHandler = (newTitle: string) => {
        props.updateToDoListTitle(props.todolistID, newTitle);
    }


    const checkboxStatusHandler = (changedStatus: boolean, taskID: string) => {
        props.changeTaskStatus(props.todolistID, taskID, changedStatus);
    }

    return <div>
        <h3>
            <TitleChanger title={props.title} callBack={updateTodolistTitleHandler}/>

            <IconButton aria-label="delete" onClick={removeListHandler}>
                <Delete />
            </IconButton>
        </h3>

        <Input callBack={inputValueHandler}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID,t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID,t.id, e.currentTarget.checked);
                    }
                    
                    const updateTasTitleHandler = (newTitle: string) => {
                      props.updateTaskTitle(props.todolistID, t.id, newTitle);
                    }



                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>

                        {/*Checkbox from Material UI*/}
                        {/*
                        <Checkbox
                            defaultChecked
                            onChange={onChangeHandler}
                            checked={t.isDone}
                        />
                        */}
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
}
