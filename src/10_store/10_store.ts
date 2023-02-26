import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../09_state/tasks-reducer";
import {TodolistReducer} from "../08_todolist_tests_on_reducer/todolist_reducer";



//The combineReducers helper function turns an object whose values
// are different reducing functions into a single reducing function
// you can pass to createStore .
// The resulting reducer calls every child reducer,
// and gathers their results into a single state object.
 const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: TodolistReducer
});


 //here we create he store
//createStore(reducer, [preloadedState], [enhancer]) Creates a Redux store
// that holds the complete state tree of your app. There should only be a single store in your app.
//What is the difference between configureStore and createStore?
// The configureStore here replaces the original createStore from Redux.
// Unlike createStore, configureStore from Redux Toolkit not only creates a store
// but can also accept reducer functions as arguments
// and automatically sets up the Redux DevTools Extension for easy debugging.
//We can use either createStore or legacy_createStore!!!
export const store = legacy_createStore(rootReducer);

//here we creat automatically the type for our rootReducer

export type AppRootStateType = ReturnType<typeof rootReducer>;

//in order to have access to our store from the console do the following below
//@ts-ignore

window.store = store;


//as a result of all the actions from above we shall get the following state and methods;

{/*


{
    state: {
        tasks: {}
        todolists: []
    }

    getState()
    dispatch()
    subscribe()
}


*/}