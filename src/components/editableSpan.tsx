import React, {useState} from 'react';
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

type PropsType = {
    title: string
}

export const EditableSpan = (props: PropsType) => {

    const[edit, setEdit] = useState(false);

    const editFooHandler = () => {
      setEdit(!edit);
    }
    return (
        edit
            ? <input value={props.title} autoFocus onBlur={editFooHandler}/>
            :   <span onDoubleClick={editFooHandler}>{props.title}</span>
    );
};

