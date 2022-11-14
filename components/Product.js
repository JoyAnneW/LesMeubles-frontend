export default function Product({ product }) {
	const { image, name, price, description } = product.attributes;
	const mdImg = image.data.attributes.formats.medium.url;
	return (
		<div>
			<div>
				<img src={mdImg} className="img-fluid rounded-top" />
			</div>
			<h2>{name}</h2>
			<h3>{price}</h3>
			<h3>{description}</h3>
		</div>
	);
}
