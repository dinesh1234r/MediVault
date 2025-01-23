import {createSlice} from '@reduxjs/toolkit'


const slice=createSlice({
    name:'PrescriptionSlice',
    initialState:{
        DoctorDetails:{
            doctor:{
                Doctor_name:null
            }
        }
    },
    reducers:{
        addPrescriptionDetails(state,action)
        {
            Object.assign(state, action.payload);
        }
    }
})

export const {addPrescriptionDetails}=slice.actions
export default slice.reducer;