import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
	const cartItems = useSelector((state) => state.cart.cartItems);
	const showCart = useSelector((state) => state.cart.showCart);

	let content = <h5>Cart is currently empty</h5>;
	if (cartItems.length) content = cartItems.map((cartItem) => <CartItem key={cartItem.id} item={cartItem} />);

	return (
		<>
			{showCart && (
				<Card className={classes.cart}>
					<h2>Your Shopping Cart</h2>
					<ul>{content}</ul>
				</Card>
			)}
		</>
	);
};

export default Cart;
