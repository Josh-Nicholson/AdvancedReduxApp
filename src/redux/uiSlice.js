import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	showCart: true,
	notification: null
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleCart: (state) => {
			state.showCart = !state.showCart;
		},
		showNotification: (state, action) => {
			console.log(action);
			state.notification = { status: action.payload.status, title: action.payload.title, message: action.payload.message };
		}
	}
});

export const { toggleCart, showNotification } = uiSlice.actions;
export default uiSlice.reducer;
