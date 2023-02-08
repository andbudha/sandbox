import {v1} from "uuid";
import {FilterValuesType, ToDoListType} from "../App";
import {
    AddToDoListAC,
    ChangeListFilterAC,
    ChangeListTitleAC,
    RemoveToDoListAC,
    TodolistReducer
} from "./todolist_reducer";

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


test('a new todolist should be added', ()=>{

    let todolistID1 = v1();
    let todolistID2 = v1();

    const newToDoListTitle = 'New Todolist'

    let startState: ToDoListType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ];

    const endState = TodolistReducer(startState, AddToDoListAC(newToDoListTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newToDoListTitle);


})

test('the chosen todolist should be able change its name', ()=>{

    let todolistID1 = v1();
    let todolistID2 = v1();

    const newTitle = 'Movies to watch';

    let startState: ToDoListType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ];

    const endState = TodolistReducer(startState, ChangeListTitleAC(newTitle, todolistID2));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTitle);


})


test('the  right filter of todolist should be changed', ()=>{

    let todolistID1 = v1();
    let todolistID2 = v1();

    const newFilter: FilterValuesType = 'completed'

    let startState: ToDoListType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ];

    const endState = TodolistReducer(startState, ChangeListFilterAC(newFilter, todolistID2));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);


})