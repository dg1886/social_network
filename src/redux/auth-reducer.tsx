import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {rootAppStateType} from "./redux-store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {stopSubmit} from "redux-form";
import React from "react";

export type AuthReducerType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    // messages: Array<string> | null
}
export type AuthUserDataActionType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
// export type SetAuthUserDataActionType = {
//     type: 'SET-USER-DATA'
//     payload: AuthUserDataActionType
// }


export type authUsersActionsTypes =
    ReturnType<typeof setAuthUserData>

export const SET_USER_DATA = 'auth/SET-USER-DATA';


let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    // messages: null
}
type ThunkType = ThunkAction<void, rootAppStateType, unknown, authUsersActionsTypes>

const authReducer = (state: AuthReducerType = initialState, action: authUsersActionsTypes): AuthReducerType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,

            }

        default:
            return state
    }
}
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({type: SET_USER_DATA, payload: {id, email, login, isAuth}})

export type setAuthUserDataActinType = ReturnType<typeof setAuthUserData>

/*export const getAuthUserData = () => (dispatch: Dispatch<setAuthUserDataActinType>) => {
    return authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login, isAuth} = response.data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
}*/
export const getAuthUserData = () => async (dispatch: Dispatch<setAuthUserDataActinType>) => {
    let response = await authAPI.me()
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                dispatch(setAuthUserData(id, email, login, true))
}}


export const login = (email: string, password: string, rememberMe: boolean,): ThunkType => async (dispatch: any) => {
    let responce = await authAPI.login(email, password, rememberMe)
            if (responce.data.resultCode === 0) {
                dispatch(getAuthUserData())
            } else {
                let message = responce.data.messages.length > 0 ? responce.data.messages : "Some error"
                dispatch(stopSubmit("login", {_error: message}))
            }
}

export const logout = () => async (dispatch: Dispatch) => {
    let responce = await authAPI.logout()
            if (responce.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
}

export default authReducer

//ThunkDispatch<rootAppStateType, unknown, authUsersActionsTypes>