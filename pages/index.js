import Head from "next/head";
import Link from "next/link";
import { useQuery } from "urql";
import Product from "../components/Product";
import { PRODUCT_QUERY } from "../lib/query";

export default function Home() {
	// fetch products from strapi
	const [results] = useQuery({ query: PRODUCT_QUERY });
	const { data, fetching, error } = results;

	if (fetching) return <p>loading</p>;
	if (error) return <p>error</p>;
	const products = data.products.data;
	console.log({ products });
	return (
		<div>
			{/* Head component allows adding metadata */}
			<Head>
				<title>Les Meubles</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				Products
				{products.map((product) => (
					<Product key={product.attributes.slug} product={product} />
				))}
			</main>
		</div>
	);
}
