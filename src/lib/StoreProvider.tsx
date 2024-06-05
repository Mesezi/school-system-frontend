"use client";
import React, { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = makeStore();

export default function StoreProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const storeRef = useRef<AppStore>();
	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = makeStore();
	}

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
}
