import {StateType, userReducer} from "./user_reducer";

test('User reducer should increment only age', ()=>{
    const startState: StateType = { age: 40, childrenCount: 2, name: 'Andrei'};

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'});

    expect(endState.age).toBe(41);
    expect(endState.childrenCount).toBe(2);
})

test('User reducer should increment only childrenCount',()=>{
    const startState: StateType = {age: 40, childrenCount: 2, name: 'Andrei' };

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'});

    expect(endState.childrenCount).toBe(3);
})

test('user reducer should change name of user', ()=>{
    const startState: StateType = {age: 40, childrenCount: 2, name: 'Andrei' };
    const newName: string = 'Dorian';
    const endState = userReducer(startState, {type: 'CHANGE-USER-NAME', newName: newName});

    expect(endState.name).toBe(newName);
})