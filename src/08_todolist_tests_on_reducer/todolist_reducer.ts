import {ToDoListType} from "../App";


export const TodolistReducer = (state: ToDoListType[], action: VersatileType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(list=>list.id !== action.payload.id);
        }
        default:{
            return state;
        }
    }
}


type VersatileType = RemoveToDoListACType

type RemoveToDoListACType = ReturnType<typeof RemoveToDoListAC>
export const RemoveToDoListAC = (listID: string) => {
    return{
        type: 'REMOVE-TODOLIST',
        payload: {
            id: listID
        }
    }as const
}
