import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    callBack:(newTitle:string)=>void
}

export const EditableSpan = (props: PropsType) => {

    const[edit, setEdit]=useState(false);
    let [newTitle, setNewTitle] = useState(props.title);
    console.log(newTitle)

    const editHandler = () => {
      setEdit(!edit);
      props.callBack(newTitle);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        edit
            ? <input value={newTitle} onBlur={editHandler} autoFocus onChange={onChangeHandler}/>
            : <span onDoubleClick={editHandler}>{props.title}</span>
    );
};
