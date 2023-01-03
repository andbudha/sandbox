import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    callBack:(title: string)=>void
}
export const TitleChanger = (props: PropsType) => {
    const[edit, setEdit]=useState(false);
    const[newTitle, setNewTitle]=useState(props.title);

    const displayInput = () => {
      setEdit(true);
    }

    const hideInput = () => {
        setEdit(false);
        props.callBack(newTitle);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        edit
            ? <input value={newTitle} autoFocus onBlur={hideInput} onChange={onChangeHandler}/>
            : <span onDoubleClick={displayInput}>{props.title}</span>
    );
};
