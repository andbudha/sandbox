import {increaseAgeAC, newFamilyMemberAC, StateType, userReducer} from "./07_reducer";



test('The user-age will be increased',()=>{
    //data
    const startState: StateType = {
        name: 'Delia',
        age: 5,
        brother: 0
    }

    const ageToAdd: number = 1;
    //operation

    const newAge = userReducer(startState, increaseAgeAC(ageToAdd));

    //expectation

    expect(newAge).toBe(6);
})

test('Now Delia has got a brother!',()=>{
    //data
    const newlyBornBrother: StateType = {
        name: 'Delia',
        age: 6,
        brother:0
    }

    const brother: number = 1

    //operation

    const bigFamily = userReducer(newlyBornBrother, newFamilyMemberAC(brother));

    //expectation

    expect(bigFamily).toBe(1)
})