import {createSlice} from '@reduxjs/toolkit'

const initial={
    history:[],
    filter:''
}

const slice=createSlice({
    name:'HistorySlice',
    initialState:initial,
    reducers:{
        addHistory(state,action)
        {
            state.history.push(...action.payload)
        },
        addFilter(state,action)
        {
            state.filter=action.payload
        },
        clearFilter(state,action)
        {
            state.filter=''
        },
        clearHistory(state,action)
        {
            state.history=[]
            state.filter=''
        }
    }
})

export const {addHistory,addFilter,clearFilter,clearHistory}=slice.actions
export default slice.reducer;