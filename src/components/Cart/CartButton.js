import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { toggleCart } from '../../redux/uiSlice';

const CartButton = (props) => {
	const cartItems = useSelector((state) => state.cart.cartItems);
	const dispatch = useDispatch();

	const totalQuantity = cartItems.reduce((accumulator, item) => {
		return accumulator + item.quantity;
	}, 0);

	const onToggleHandler = () => {
		dispatch(toggleCart());
	};

	return (
		<button onClick={onToggleHandler} className={classes.button}>
			<span>My Cart</span>
			<span className={classes.badge}>{totalQuantity}</span>
		</button>
	);
};

export default CartButton;
