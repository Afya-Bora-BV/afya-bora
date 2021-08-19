import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

import appointmetReducer from "./slices/appointment";
import profileReducer from "./slices/profile"

const authPersistConfig = {
	key: 'auth',
	storage: AsyncStorage
}

const rootPersistConfig = {
	key: 'root',
	storage: AsyncStorage,
	blacklist: ['appointment']
}

const rootReducer = combineReducers({
	appointment: appointmetReducer,
	profile: persistReducer(authPersistConfig, profileReducer)
});

const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedRootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
