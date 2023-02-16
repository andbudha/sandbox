import {tasksReducer, TaskStateType} from "./tasks-reducer";
import {ToDoListType} from "../App";
import {AddToDoListAC, TodolistReducer} from "../08_todolist_tests_on_reducer/todolist_reducer";


test('The targeted IDs must be equal!', ()=>{
    const startTaskState: TaskStateType = {};
    const startToDoListState: ToDoListType[] = [];

    const title = 'New To Do List';
    const action = AddToDoListAC(title);

    const endTasksState = tasksReducer(startTaskState, action);
    const endToDoListState = TodolistReducer(startToDoListState, action);

    const keys = Object.keys(endTasksState);
    const firstListIDFromTasks = keys[0];
    const firstListIDFromToDoLists = endToDoListState[0].id;


    expect(firstListIDFromTasks).toBe(action.payload.todolistIDFromToDoListReducer);
    expect(firstListIDFromToDoLists).toBe(action.payload.todolistIDFromToDoListReducer);
})