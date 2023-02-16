import {FilterValuesType, ToDoListType} from "../App";
import {v1} from "uuid";


export const TodolistReducer = (state: ToDoListType[], action: VersatileType):ToDoListType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(list=>list.id !== action.payload.id);
        }
        case "ADD-NEW-TODOLIST":{
            const newToDoList:ToDoListType = {id: action.payload.todolistIDFromToDoListReducer, title: action.payload.newTitle, filter: 'all'}
            return [...state, newToDoList];
        }
        case "CHANGE-LIST-TITLE":{
            return state.map(list=>list.id === action.payload.id ? {...list, title: action.payload.newTitle} : list);
        }
        case "CHANGE-LIST-FILTER":{
            return state.map(list=>list.id === action.payload.listID ? {...list, filter: action.payload.newFilter} : list)
        }
        default:{
            return state;
        }
    }
}


export type VersatileType = RemoveToDoListACType | AddToDoListACType | ChangeListTitleACType | ChangeListFilterACType

type RemoveToDoListACType = ReturnType<typeof RemoveToDoListAC>
export const RemoveToDoListAC = (listID: string) => {
    return{
        type: 'REMOVE-TODOLIST',
        payload: {
            id: listID
        }
    }as const
}


export type AddToDoListACType = ReturnType<typeof AddToDoListAC>
export const AddToDoListAC = (title: string) => {
    return{
        type: 'ADD-NEW-TODOLIST',
        payload: {
            newTitle: title,
            todolistIDFromToDoListReducer: v1()
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

type ChangeListFilterACType = ReturnType<typeof ChangeListFilterAC>
export const ChangeListFilterAC = (filter: FilterValuesType, id: string) => {
    return{
        type: 'CHANGE-LIST-FILTER',
        payload: {
            newFilter: filter,
            listID: id
        }
    }as const
}