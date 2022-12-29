import React, {useState} from 'react';

type PropsType = {
    title: string
}

export const EditableSpan = (props: PropsType) => {

    const[edit, setEdit]=useState(true)

    return (
        edit ? <input value={props.title}/> :  <span>{props.title}</span>
    );
};
