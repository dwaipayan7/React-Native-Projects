import {configureStore} from '@reduxjs/toolkit'
import { auth } from '../../features/auth/slices/AuthSlice';
import { profile } from '../../features/auth/slices/ProfileSlice';



export const store = configureStore({
    reducer: {
        auth: auth,
        profile: profile
    }
});

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;