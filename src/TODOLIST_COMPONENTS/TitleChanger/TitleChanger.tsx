import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    callBack: (newTitle: string)=> void
}

export const TitleChanger = (props: PropsType) => {
    const[editor, setEditor]=useState(false);
    let [newTitle, setNewTitle] = useState(props.title)


    const inputDisplayHandler = () => {
      setEditor(true);
    }

    const inputHideHandler = () => {
      setEditor(false);
      props.callBack(newTitle);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }


    return (
        editor
            ? <input value={newTitle} autoFocus onBlur={inputHideHandler} onChange={onChangeHandler}/>
            : <span onDoubleClick={inputDisplayHandler}>{props.title}</span>
    );
};
