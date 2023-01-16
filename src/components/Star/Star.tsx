import React from 'react';

type StarPropsType = {
    selected: boolean
}
export const Star = (props: StarPropsType) => {
    return (
       <span>{props.selected ? <b>star </b> : 'star'} </span>
    );
};

