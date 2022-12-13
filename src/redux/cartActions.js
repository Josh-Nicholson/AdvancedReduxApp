import { replaceCart } from './cartSlice';
import { showNotification } from './uiSlice';

export const fetchCartData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch('https://react-http-a82d2-default-rtdb.europe-west1.firebasedatabase.app/cart.json');

			if (!response.ok) {
				throw new Error('Fetching cart data failed!');
			}
			const data = await response.json();

			return data;
		};

		try {
			const cartData = await fetchData();
			dispatch(replaceCart({ cartItems: cartData.cartItems || [], totalPrice: cartData.totalPrice }));
		} catch (error) {
			dispatch(showNotification({ status: 'error', title: 'Error!', message: 'Fetching cart data failed!' }));
		}
	};
};

export const sendCartData = (cart) => {
	return async (dispatch) => {
		dispatch(showNotification({ status: 'pending', title: 'Sending...', message: 'Sending cart data...' }));

		const sendRequest = async () => {
			const response = await fetch('https://react-http-a82d2-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
				method: 'PUT',
				body: JSON.stringify({ cartItems: cart.cartItems, totalPrice: cart.totalPrice })
			});

			if (!response.ok) {
				throw new Error('Sending cart data failed!');
			}
		};

		try {
			await sendRequest();
			dispatch(showNotification({ status: 'success', title: 'Success!', message: 'Sent cart data successful!' }));
		} catch (error) {
			dispatch(showNotification({ status: 'error', title: 'Error!', message: 'Sending cart data failed!' }));
		}
	};
};
