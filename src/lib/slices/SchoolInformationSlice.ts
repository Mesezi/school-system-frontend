import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllinformationSchema } from "@/interfaces/information.interface";
const initialState: any = {};

const informationSlice = createSlice({
	name: "information",
	initialState,
	reducers: {
		setSchoolInformation(state, action: PayloadAction<AllinformationSchema>) {
			state.information = action.payload;
		},
	},
});

export const { setSchoolInformation } = informationSlice.actions;
export default informationSlice.reducer;
