import {TaskType} from "../TODOLIST_COMPONENTS/Todolist/Todolist";
import {v1} from "uuid";

export type TaskStateType = {
    [key: string]: TaskType[]
}

type ActionsType = removeTaskType | addTaskACType | changeTaskStatusACType

export const tasksReducer = (state: TaskStateType, action: ActionsType):TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state,
                [action.payload.listID]:state[action.payload.listID]
                    .filter(task=>task.id!==action.payload.taskIDtoRemove)};
        case "ADD-TASK":
            const newTaskID = v1();
            const newTask = {id: newTaskID, title: action.payload.newTaskTitle, isDone: false}
            return {...state, [action.payload.listID]:[newTask, ...state[action.payload.listID]]};
        case "CHANGE-STATUS":
            return {...state,
                [action.payload.listID]:state[action.payload.listID]
                    .map(task=>task.id === action.payload.taskIDToBeChanged
                        ?{...task, isDone: !action.payload.taskStatus} : task)};
        default:
            return state;
    }
}

type removeTaskType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (listID: string, taskIDtoRemove: string) => {
    return{
        type: 'REMOVE-TASK',
        payload: {
            listID,
            taskIDtoRemove
        }
    }as const
}



type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (listID: string, newTaskTitle: string) => {
    return{
        type: 'ADD-TASK',
        payload: {
            listID,
            newTaskTitle
        }
    }as const
}


type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (listID: string, taskIDToBeChanged: string, taskStatus: boolean) =>{
    return{
        type: 'CHANGE-STATUS',
        payload: {
            listID,
            taskIDToBeChanged,
            taskStatus
        }
    }as const
}