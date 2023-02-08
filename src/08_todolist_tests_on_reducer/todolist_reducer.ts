import {ToDoListType} from "../App";
import {v1} from "uuid";


export const TodolistReducer = (state: ToDoListType[], action: VersatileType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(list=>list.id !== action.payload.id);
        }
        case "ADD-NEW-TODOLIST":{
            const newID = v1();
            const newToDoList = {id: newID, title: action.payload.newTitle, filter: 'all'}
            return [...state, newToDoList];
        }
        default:{
            return state;
        }
    }
}


type VersatileType = RemoveToDoListACType | AddToDoListACType

type RemoveToDoListACType = ReturnType<typeof RemoveToDoListAC>
export const RemoveToDoListAC = (listID: string) => {
    return{
        type: 'REMOVE-TODOLIST',
        payload: {
            id: listID
        }
    }as const
}


type AddToDoListACType = ReturnType<typeof AddToDoListAC>
export const AddToDoListAC = (title: string) => {
    return{
        type: 'ADD-NEW-TODOLIST',
        payload: {
            newTitle: title
        }
    }as const
}