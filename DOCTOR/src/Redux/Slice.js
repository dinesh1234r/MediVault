import {createSlice} from '@reduxjs/toolkit'


const slice=createSlice({
    name:'PrescriptionSlice',
    initialState:{},
    reducers:{
        addPrescriptionDetails(state,action)
        {
            Object.assign(state, action.payload);
        }
    }
})

export const {addPrescriptionDetails}=slice.actions
export default slice.reducer;