import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import {
	Box,
	Button,
	Center,
	Heading,
	Spinner,
	Text,
	Image,
	Input,
	HStack,
	useNumberInput,
	Flex,
	ButtonSpinner,
} from "@chakra-ui/react";
import { useShopContext } from "../../lib/context";

export default function ProductDetails() {
	const { qty, setQty, addToCart } = useShopContext();
	const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
		useNumberInput({
			step: 1,
			defaultValue: 1,
			min: 1,
			value: qty,
			onChange: (valueStr) => {
				// console.log({ valueStr });
				setQty(valueStr);
			},
		});

	const inc = getIncrementButtonProps();
	const dec = getDecrementButtonProps();
	const input = getInputProps();

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
	if (error) return <p>{error.message}</p>;
	// console.log({ query, results, data });
	const product = data.products.data[0];
	const { name, description, image, price } = product.attributes;
	const mdImg = image.data.attributes.formats.medium.url;

	return (
		<Center mt="20">
			<Flex gap={4} mt={6}>
				<Box boxSize="sm">
					<Image src={mdImg} cursor="pointer" borderRadius="lg" />
				</Box>
				<Flex direction="column">
					<Heading>{name}</Heading>
					<Text fontSize="2xl">€{price}</Text>
					<Text>{description}</Text>
					<HStack maxW="320px" mt={16}>
						<Text>Quantity</Text>
						<Button {...inc}>+</Button>
						<Input {...input} />
						<Button {...dec}>-</Button>
					</HStack>
					<Button
						variant="solid"
						mt={2}
						onClick={() => addToCart(product, qty)}
					>
						Add To Cart
					</Button>
				</Flex>
			</Flex>
		</Center>
	);
}
