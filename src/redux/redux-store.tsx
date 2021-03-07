import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    usersPage: usersReducer
})

let store = createStore(rootReducer)

export type rootAppStateType = ReturnType<typeof rootReducer >
export type StoreReduxType = typeof store





export default store