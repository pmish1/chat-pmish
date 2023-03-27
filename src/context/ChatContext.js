import React, { createContext, useReducer, useState } from 'react'

export const ChatContext = createContext()

export const ChatContextProvider = ({children}) => {
    const chatData = {
        user: "",
        chatId: ""
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'CHANGE_USER':
                return {
                    user: action.payload[1],
                    chatId: action.payload[0]
                }
            default: 
                return state 
        }
    }
    /*
        action = what we pass into the dipatch function
        state = current state
    */

    const [state, dispatch] = useReducer(reducer, chatData)
    /*
        state = initial state
        dispatch = function we want to run. 
        this is like [var, setVar], where var is state and setVar is dispatch

        reducer = function we want to run, will be assigned to 'dispatch'
        initialState = we will assign this to 'state'
    
    */
    return (
        <ChatContext.Provider value={{data: state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}