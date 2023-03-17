
import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './Input.css'

type PropsType = {
    callBack:(newTitle: string)=>void
}

export const Input = memo((props: PropsType) => {

    console.log('input rendered')

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        const newTitle=title.trim();
        if (newTitle !== "") {
            props.callBack(newTitle);
            setTitle("");
        } else {
            setError(" ");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
       if(error) setError(null);
        if (e.key === 'Enter') {
            addTask();
        }
    }

    return (
        <div>
            {/*
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            */}

            <TextField
                size={'small'}
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyPressHandler}
                error={!!error}
                id="outlined-basic"
                label={error ? 'Title is required' : 'Typing in progress...'}
                variant="outlined"
            />

            {/*<button onClick={addTask}>+</button>*/}
            <Button variant="contained" size="small" onClick={addTask} className={'btn'}>+</Button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
});
