import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {Input} from "./Input/Input";
import {TitleChanger} from "./components/TitleChanger";


type TaskType = {
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

    return <div>
        <h3>
            <TitleChanger title={props.title} callBack={updateTodolistTitleHandler}/>
            <button onClick={removeListHandler}>X</button>
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
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>

                        <TitleChanger title={t.title} callBack={updateTasTitleHandler}/>

                        <button onClick={onClickHandler}>x</button>
                       
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
