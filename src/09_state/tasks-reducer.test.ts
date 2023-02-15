
import {v1} from "uuid";
import {addTaskAC, removeTaskAC, tasksReducer} from "./tasks-reducer";



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