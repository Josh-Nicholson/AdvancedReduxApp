import { createSlice } from '@reduxjs/toolkit';
import { fetchCartData, sendCartData } from './cartActions';

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
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCartData.rejected, (state, action) => {
			state.notification = {
				status: 'error',
				title: 'Error!',
				message: action.error.message || 'Fetch failed'
			};
		});
		builder.addCase(sendCartData.pending, (state) => {
			state.notification = {
				status: '',
				title: 'Pending ...',
				message: 'Sending Books ...'
			};
		});
		builder.addCase(sendCartData.fulfilled, (state) => {
			state.notification = {
				status: 'success',
				title: 'Success!',
				message: 'Cart data sent successfully!'
			};
		});
		builder.addCase(sendCartData.rejected, (state, action) => {
			state.notification = {
				status: 'error',
				title: 'Error!',
				message: 'Failed to send cart data!'
			};
		});
	}
});

export const uiActions = uiSlice.actions;
export default uiSlice;
