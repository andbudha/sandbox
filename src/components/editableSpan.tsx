import React, {ChangeEvent, useState} from 'react';
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

type PropsType = {
    title: string
    callBack:(newTitle: string)=> void
}

export const EditableSpan = (props: PropsType) => {

    const[edit, setEdit] = useState(false);
    let [newTitle, setNewTitle] = useState(props.title)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)

    }

    const editHandler = () => {
        setEdit(!edit);
        props.callBack(newTitle);
    }

    return (
        edit
            ? <input value={newTitle} autoFocus onBlur={editHandler} onChange={onChangeHandler}/>
            :   <span onDoubleClick={editHandler}>{props.title}</span>
    );
};

