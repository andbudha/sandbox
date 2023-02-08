import {v1} from "uuid";
import {ToDoListType} from "../App";
import {RemoveToDoListAC, TodolistReducer} from "./todolist_reducer";

test('the right todolist must be removed', ()=>{

    let todolistID1 = v1();
    let todolistID2 = v1();


    let startState: ToDoListType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ];

    const endState = TodolistReducer(startState, RemoveToDoListAC(todolistID1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);


})