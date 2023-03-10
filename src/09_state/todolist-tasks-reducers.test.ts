import {tasksReducer, TaskStateType} from "./tasks-reducer";
import {ToDoListType} from "../App";
import {AddToDoListAC, TodolistReducer} from "../08_todolist_tests_on_reducer/todolist_reducer";


test('The targeted IDs must be equal!', ()=>{

    const startTasksState: TaskStateType = {};
    const startToDoListState: ToDoListType[] = [];

    const title = 'New To Do List';
    const action = AddToDoListAC(title);

    const endTasksState = tasksReducer(startTasksState, action);
    const endToDoListState = TodolistReducer(startToDoListState, action);

    const keys = Object.keys(endTasksState);
    const firstTaskReducerID = keys[0];
    const firstToDoListReducerID = endToDoListState[0].id;

    expect(firstTaskReducerID).toBe(action.payload.todolistIDFromToDoListReducer);
    expect(firstToDoListReducerID).toBe(action.payload.todolistIDFromToDoListReducer);
})


