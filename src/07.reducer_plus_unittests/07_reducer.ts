


export type StateType = {
    name: string
    age: number
    brother: number
}

export const userReducer = (state: StateType, action: VersatileType) => {
    switch (action.type) {
        case "INCREASE-AGE":{
            return state.age + action.payload.ageToAdd;
        }
        case "GOT-A-BROTHER":{
            return state.brother + action.payload.brother;
        }
        default:{
            return state;
        }
    }
}


type VersatileType = increaseAgeACType | newFamilyMemberACType

type increaseAgeACType = ReturnType<typeof increaseAgeAC>
export const increaseAgeAC = (ageToAdd:number) => {
    return{
        type: 'INCREASE-AGE',
        payload: {
            ageToAdd: ageToAdd
        }
    }as const
}

type newFamilyMemberACType = ReturnType<typeof newFamilyMemberAC>
export const newFamilyMemberAC =(brother: number)=>{
    return{
        type: 'GOT-A-BROTHER',
        payload: {
            brother: brother
        }
    }as const
}