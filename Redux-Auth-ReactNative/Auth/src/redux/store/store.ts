import {configureStore} from '@reduxjs/toolkit'
import { auth } from '../../features/auth/slices/AuthSlice';


export const store = configureStore({
    reducer: auth,
});

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;