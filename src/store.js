import { configureStore } from "@reduxjs/toolkit";
import generalSlice from './features/generalSlice'

const store = configureStore({
    reducer: {
        general:generalSlice
    }

})

export default store