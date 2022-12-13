import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
	{ id: 'p1', title: 'Hat', description: 'Woolen hat that keeps your head warm', price: 9.99 },
	{ id: 'p2', title: 'Mittens', description: 'Cute and fluffy gloves for all ages', price: 12.99 },
	{ id: 'p3', title: 'Hiking Boots', description: 'Best walking shoes money can buy', price: 69.99 }
];

const Products = (props) => {
	const listProducts = DUMMY_PRODUCTS.map((product) => (
		<ProductItem key={product.id} id={product.id} title={product.title} price={product.price} description={product.description} />
	));

	return (
		<section className={classes.products}>
			<h2>Buy your favorite products</h2>
			<ul>{listProducts}</ul>
		</section>
	);
};

export default Products;
