import React, {ChangeEvent} from 'react';

type SuperCheckboxPropsType = {
    callBack:(checkboxStatus: boolean)=>void
    checkboxStatus: boolean
}

export const SuperCheckbox = (props: SuperCheckboxPropsType) => {

    const checkboxStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callBack(event.currentTarget.checked);
    }
    return (
        <>
            <input
                type="checkbox"
                checked={props.checkboxStatus}
                onChange={checkboxStatusHandler}
            />
        </>
    );
};
