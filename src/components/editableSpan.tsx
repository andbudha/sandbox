import React, {ChangeEvent, useState} from 'react';
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

type PropsType = {
    title: string
}

export const EditableSpan = (props: PropsType) => {

    const[edit, setEdit] = useState(false);
    let [newTitle, setNewTitle] = useState(props.title)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const editFooHandler = () => {
      setEdit(!edit);
    }
    return (
        edit
            ? <input value={newTitle} autoFocus onBlur={editFooHandler} onChange={onChangeHandler}/>
            :   <span onDoubleClick={editFooHandler}>{props.title}</span>
    );
};

