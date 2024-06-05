import { combineReducers, configureStore } from "@reduxjs/toolkit";
import SchoolInformationSlice from "./slices/SchoolInformationSlice";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
	key: "root",
	storage: storageSession,
};

const persistedReducer = persistReducer(
	persistConfig,
	combineReducers({
		information: SchoolInformationSlice,
	})
);

export const makeStore = () => {
	const store = configureStore({
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			}),
	});
	const persistor = persistStore(store);
	return { store, persistor };
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["store"]["getState"]>;
export type AppDispatch = AppStore["store"]["dispatch"];
