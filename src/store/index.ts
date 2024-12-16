import { configureStore } from "@reduxjs/toolkit";
import partitionReducer from "../features/partition";

const store = configureStore({
	reducer: {
		partition: partitionReducer,
	},
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export default store;
