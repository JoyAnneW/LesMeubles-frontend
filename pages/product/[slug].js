import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";

export default function ProductDetails() {
	// destructure the query property from the obj returned from useRouter.
	const { query } = useRouter();
	// fetch graphql data
	const [results] = useQuery({
		query: GET_PRODUCT_QUERY,
		variables: { slug: query.slug },
	});
	const { data, fetching, error } = results;

	if (fetching) {
		return (
			<Center h="100vh">
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="green.500"
					size="xl"
				/>
			</Center>
		);
	}
	if (error) return <p>error</p>;
	console.log({ query, results, data });
	return (
		<div>
			ProductDetails - title, description, quantity, buttons to add and
			subtract, add to cart
		</div>
	);
}
