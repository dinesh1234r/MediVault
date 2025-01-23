import {configureStore} from '@reduxjs/toolkit'
import slice from './Slice'

const store=configureStore({
    devTools:true,
    reducer:{
        history:slice
    }
})

export default store;