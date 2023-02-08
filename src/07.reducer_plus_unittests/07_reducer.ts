

export const getSum = (numOne: number, numTwo: number) => {
    return numOne + numTwo;
}


export type StateType = {
    name: string
    age: number
}

export const userReducer = (state: StateType, action: increaseAgeACType) => {
    switch (action.type) {
        case "INCREASE-AGE":{
            const currentAge = state.age;
            return currentAge + 1;
        }
        default:{
            return state;
        }
    }
}

type increaseAgeACType = ReturnType<typeof increaseAgeAC>
export const increaseAgeAC = () => {
    return{
        type: 'INCREASE-AGE'
    }as const
}