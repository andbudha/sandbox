import {getSum, increaseAgeAC, StateType, userReducer} from "./07_reducer";

test('The sum must be correct',()=>{
    //data
    const numOne: number = 55;
    const numTwo: number = 5;

    //operation
    const sumResult = getSum(numOne, numTwo);

    //expectation
    expect(sumResult).toBe(60);
})




test('The user-age will be increased',()=>{
    //data
    const startState: StateType = {
        name: 'Delia',
        age: 5
    }

    //operation

    const newAge = userReducer(startState, increaseAgeAC());

    //expectation

    expect(newAge).toBe(6);
})