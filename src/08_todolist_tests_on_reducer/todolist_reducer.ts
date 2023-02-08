import {ToDoListType} from "../App";
import {v1} from "uuid";


export const TodolistReducer = (state: ToDoListType[], action: VersatileType):ToDoListType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(list=>list.id !== action.payload.id);
        }
        case "ADD-NEW-TODOLIST":{
            const newID = v1();
            const newToDoList:ToDoListType = {id: newID, title: action.payload.newTitle, filter: 'all'}
            return [...state, newToDoList];
        }
        case "CHANGE-LIST-TITLE":{
            return state.map(list=>list.id === action.payload.id ? {...list, title: action.payload.newTitle} : list);
        }
        default:{
            return state;
        }
    }
}


type VersatileType = RemoveToDoListACType | AddToDoListACType | ChangeListTitleACType

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

type ChangeListTitleACType = ReturnType<typeof ChangeListTitleAC>
export const ChangeListTitleAC = (title: string, listID: string) => {
    return{
        type: 'CHANGE-LIST-TITLE',
        payload: {
            newTitle: title,
            id: listID
        }
    }as const
}