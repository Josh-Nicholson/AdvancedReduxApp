import { createSlice } from '@reduxjs/toolkit';
import { fetchCartData } from './cartActions';

const initialState = {
	cartItems: [], //{id: "", title: "", description: "", quantity: "", price: ""}
	totalPrice: 0,
	changed: false
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action) => {
			const passedInItem = action.payload;
			const cartItem = state.cartItems.find((e) => e.id === passedInItem.id);
			if (cartItem) {
				//if an item with the same id is already present then we just need to increment its quantity value and update the total price of the cart
				return {
					...state,
					changed: true,
					cartItems: state.cartItems.map((item) => (item.id === passedInItem.id ? { ...item, quantity: item.quantity + 1 } : item)),
					totalPrice: state.totalPrice + passedInItem.price
				};
			} else {
				//if an item is not present in the cart then add a new item in the items array and update the total price of the cart
				return {
					...state,
					changed: true,
					cartItems: [...state.cartItems, { ...passedInItem, quantity: 1 }],
					totalPrice: state.totalPrice + passedInItem.price
				};
			}
		},
		removeItem: (state, action) => {
			const passedInItem = action.payload;
			const cartItem = state.cartItems.find((e) => e.id === passedInItem.id);

			if (!cartItem) console.log('Tried to remove an item not present in the cart');
			if (cartItem.quantity > 1) {
				//if an item with the same id is already present then we subtract the quantity value
				return {
					...state,
					changed: true,
					cartItems: state.cartItems.map((item) => (item.id === passedInItem.id ? { ...item, quantity: item.quantity - 1 } : item)),
					totalPrice: state.totalPrice - passedInItem.price
				};
			} else {
				//if the value goes to 0 then remove from the items array
				return {
					...state,
					changed: true,
					cartItems: state.cartItems.filter((item) => item.id !== passedInItem.id),
					totalPrice: state.totalPrice - passedInItem.price
				};
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCartData.fulfilled, (state, action) => {
			state.totalPrice = action.payload.totalPrice;
			state.cartItems = action.payload.cartItems;
		});
	}
});

export const cartActions = cartSlice.actions;
export default cartSlice;
