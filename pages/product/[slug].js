import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import {
	Box,
	Button,
	Center,
	Heading,
	Spinner,
	StackDivider,
	Text,
	Image,
	Input,
	HStack,
	VStack,
	useNumberInput,
	Flex,
	Divider,
} from "@chakra-ui/react";

export default function ProductDetails() {
	const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
		useNumberInput({
			step: 1,
			defaultValue: 0,
			min: 0,
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
	if (error) return <p>error</p>;
	// console.log({ query, results, data });

	const { name, description, image, price } = data.products.data[0].attributes;
	const mdImg = image.data.attributes.formats.medium.url;

	return (
		<Center>
			<Flex gap={4} mt={6}>
				<Box boxSize="sm">
					<Image src={mdImg} cursor="pointer" borderRadius="lg" />
				</Box>
				<Flex direction="column">
					<Heading>{name}</Heading>
					<Text fontSize="2xl">€{price}</Text>
					<Text>{description}</Text>

					<HStack maxW="320px" mt={24}>
						<Text>Quantity</Text>
						<Button {...inc}>+</Button>
						<Input {...input} />
						<Button {...dec}>-</Button>
					</HStack>
				</Flex>
			</Flex>
		</Center>
	);
}
