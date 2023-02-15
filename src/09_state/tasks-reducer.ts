import {TaskType} from "../TODOLIST_COMPONENTS/Todolist/Todolist";
import {v1} from "uuid";

export type TaskStateType = {
    [key: string]: TaskType[]
}

type ActionsType = removeTaskType | addTaskACType

export const tasksReducer = (state: TaskStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state,
                [action.payload.listID]:state[action.payload.listID]
                    .filter(task=>task.id!==action.payload.taskIDtoRemove)};
        case "ADD-TASK":
            const newTaskID = v1();
            const newTask = {id: newTaskID, title: action.payload.newTaskTitle, isDone: false}
            return {...state, [action.payload.listID]:[newTask, ...state[action.payload.listID]]};
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


