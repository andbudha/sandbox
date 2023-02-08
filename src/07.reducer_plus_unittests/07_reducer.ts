

export const getSum = (numOne: number, numTwo: number) => {
    return numOne + numTwo;
}


export type StateType = {
    name: string
    age: number
    brother: number
}

export const userReducer = (state: StateType, action: VersatileType) => {
    switch (action.type) {
        case "INCREASE-AGE":{
            const currentAge = state.age;
            return currentAge + 1;
        }
        case "GOT-A-BROTHER":{
            const newBrother = state.brother;
            return newBrother + 1;
        }
        default:{
            return state;
        }
    }
}


type VersatileType = increaseAgeACType | newFamilyMemberACType

type increaseAgeACType = ReturnType<typeof increaseAgeAC>
export const increaseAgeAC = () => {
    return{
        type: 'INCREASE-AGE'
    }as const
}

type newFamilyMemberACType = ReturnType<typeof newFamilyMemberAC>
export const newFamilyMemberAC =()=>{
    return{
        type: 'GOT-A-BROTHER'
    }as const
}