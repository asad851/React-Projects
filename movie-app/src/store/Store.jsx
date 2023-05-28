import { configureStore,combineReducers } from "@reduxjs/toolkit";
import {persistStore,persistReducer,FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import homeSlicer from "./homeSlicer";
import MyListSlicer from './MyListSlicer'
const persistConfig ={
    key:'root',
    version:1,
    storage
};
const rootReducer = combineReducers(
    {
       home:homeSlicer,
       mylist:MyListSlicer, 
    }
)
const persistedReducer =persistReducer(persistConfig,rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
      
    
})
export const persistor = persistStore(store)