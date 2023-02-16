
import {v1} from "uuid";
import {
    addNewListAC,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./tasks-reducer";
import {AddToDoListAC} from "../08_todolist_tests_on_reducer/todolist_reducer";



test('The correct task must be removed', ()=>{

    const todolistID1 = v1();

    const todolistID2 = v1();

    const startState = {
        [todolistID1] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS-2", isDone: true},
            {id: v1(), title: "JS-2", isDone: true},
            {id: v1(), title: "ReactJS-2", isDone: false}
        ]
    };

    const  listID = todolistID2;
    const taskIDtoRemove = startState[todolistID2][1].id;

    const resultState = tasksReducer(startState, removeTaskAC(listID, taskIDtoRemove));

    expect(resultState[todolistID2].length).toBe(2);
    expect(resultState[todolistID2][1].title).toBe("ReactJS-2");
});

test('A new task must be added to the second list!', ()=>{

    const listID1 = v1();

    const listID2 = v1();

    const startState = {
        [listID1] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [listID2]: [
            {id: v1(), title: "HTML&CSS-2", isDone: true},
            {id: v1(), title: "JS-2", isDone: true},
            {id: v1(), title: "ReactJS-2", isDone: false}
        ]
    };

    const  listID = listID2;
    const newTaskTitle = 'TDD';

    const resultState = tasksReducer(startState, addTaskAC(listID, newTaskTitle));

    expect(resultState[listID2].length).toBe(4);
    expect(resultState[listID2][0].title).toBe('TDD');
});

test('The first task in the first list should change its status to false', ()=>{

    const listID1 = v1();

    const listID2 = v1();

    const startState = {
        [listID1] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [listID2]: [
            {id: v1(), title: "HTML&CSS-2", isDone: true},
            {id: v1(), title: "JS-2", isDone: true},
            {id: v1(), title: "ReactJS-2", isDone: false}
        ]
    };

    const taskIDToBeChanged = startState[listID1][0].id
    const taskStatus = startState[listID1][0].isDone

    const resultState = tasksReducer(startState, changeTaskStatusAC(listID1, taskIDToBeChanged, taskStatus));

    expect(resultState[listID1][0].isDone).toBe(false);
    expect(resultState[listID2][0].isDone).toBe(true);
    expect(resultState[listID1][0].title).toBe("HTML&CSS");
});

test('The title of a specific task must be changed', () =>{

    const listID1 = v1();

    const listID2 = v1();

    const startState = {
        [listID1] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [listID2]: [
            {id: v1(), title: "HTML&CSS-2", isDone: true},
            {id: v1(), title: "JS-2", isDone: true},
            {id: v1(), title: "ReactJS-2", isDone: false}
        ]
    };

    const taskIDToBeChanged = startState[listID1][2].id
    const newTaskTitle = 'ReactNative';

    const resultState = tasksReducer(startState, changeTaskTitleAC(listID1, taskIDToBeChanged, newTaskTitle));

    expect(resultState[listID1][2].title).toBe(newTaskTitle);
    expect(resultState[listID2][2].title).toBe("ReactJS-2");
});

test('A new to-do-list must be added', () =>{

    const listID1 = v1();

    const listID2 = v1();

    const startState = {
        [listID1] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [listID2]: [
            {id: v1(), title: "HTML&CSS-2", isDone: true},
            {id: v1(), title: "JS-2", isDone: true},
            {id: v1(), title: "ReactJS-2", isDone: false}
        ]
    };


    const newListID = v1();

    const resultState = tasksReducer(startState, addNewListAC(newListID));
    const listKeys = Object.keys(resultState);

    expect(listKeys.length).toBe(3);
    expect(listKeys[2]).toBe(newListID);
});

test('A new to-do-list from to-do-list reducer must be added', () =>{

    const listID1 = v1();

    const listID2 = v1();

    const startState = {
        [listID1] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [listID2]: [
            {id: v1(), title: "HTML&CSS-2", isDone: true},
            {id: v1(), title: "JS-2", isDone: true},
            {id: v1(), title: "ReactJS-2", isDone: false}
        ]
    };

    const title = 'New To Do List';

    const resultState = tasksReducer(startState, AddToDoListAC(title));
    const listKeys = Object.keys(resultState);

    console.log(listKeys[0][0]);
    expect(listKeys.length).toBe(3);
});