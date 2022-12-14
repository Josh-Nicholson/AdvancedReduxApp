import { createAsyncThunk } from '@reduxjs/toolkit';

const firebaseUrl = 'https://react-http-a82d2-default-rtdb.europe-west1.firebasedatabase.app';

export const fetchCartData = createAsyncThunk('cart/fetchData', async () => {
	const response = await fetch(`${firebaseUrl}/cart.json`);
	if (!response.ok) throw new Error();

	const data = await response.json();

	return {
		cartItems: data?.cartItems || [],
		totalPrice: data?.totalPrice || 0
	};
});

export const sendCartData = createAsyncThunk('cart/sendData', async (cart) => {
	const config = {
		method: 'PUT',
		body: JSON.stringify({
			cartItems: cart.cartItems,
			totalPrice: cart.totalPrice
		})
	};
	const response = await fetch(`${firebaseUrl}/cart.json`, config);
	if (!response.ok) throw new Error();
});
