import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser : null,
    error: null,
    loading : false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading= true,
            state.error = null
        },
        singInSuccess:(state,action)=>{
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null
        },
        singInFailure:(state,action)=>{
            state.loading = false,
            state.error = action.payload
        },
        updateStart:(state)=>{
            state.loading= true,
            state.error = null
        },
        updateSuccess:(state,action)=>{
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null
        },
        updateFailure:(state,action)=>{
            state.loading = false,
            state.error = action.payload
        },
        signOutSuccess:(state,action)=>{
            state.currentUser = null,
            state.loading = false,
            state.error = null
        },blogPostInStart:(state)=>{
            state.loading= true,
            state.error = null
        },
        blogPostInSuccess:(state)=>{
            state.loading = false,
            state.error = null
        },
        blogPostInFailure:(state,action)=>{
            state.loading = false,
            state.error = action.payload
        },
        deleteUser:(state,action)=>{
            state.currentUser= null,
            state.loading= false,
            state.error= null
        }
    }
})

export const { signInStart,
    singInSuccess ,
    singInFailure,
    updateStart,
    updateFailure,
    updateSuccess,
    signOutSuccess,
    blogPostInStart,
    blogPostInSuccess,
    blogPostInFailure,
    deleteUser
} = userSlice.actions
export default userSlice.reducer