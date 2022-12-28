import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import PropTypes from 'prop-types';

type PropsType = {
    callBack: (todolistID: string, newTitle: string)=> void
    todolistID: string
}

export const Input = (props: PropsType) => {

    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTask();
        }
    }

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callBack(props.todolistID, newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }


    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

Input.propTypes = {

};
