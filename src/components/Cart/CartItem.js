import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '../../redux/cartSlice';
import classes from './CartItem.module.css';

const CartItem = (props) => {
	const dispatch = useDispatch();

	const { id, title, quantity, price } = props.item;
	const total = quantity * price;

	const onDerementHandler = () => {
		dispatch(removeItem({ id, title, quantity, price }));
	};

	const onInrementHandler = () => {
		dispatch(addItem({ id, title, quantity, price }));
	};

	return (
		<li className={classes.item}>
			<header>
				<h3>{title}</h3>
				<div className={classes.price}>
					${total.toFixed(2)} <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
				</div>
			</header>
			<div className={classes.details}>
				<div className={classes.quantity}>
					x <span>{quantity}</span>
				</div>
				<div className={classes.actions}>
					<button onClick={onDerementHandler}>-</button>
					<button onClick={onInrementHandler}>+</button>
				</div>
			</div>
		</li>
	);
};

export default CartItem;
