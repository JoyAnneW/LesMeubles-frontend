import {
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardFooter,
	Divider,
	Heading,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";

export default function Product({ product }) {
	const { image, name, price, description } = product.attributes;
	const mdImg = image.data.attributes.formats.medium.url;
	return (
		<Card>
			<CardBody>
				<Image src={mdImg} borderRadius="lg" />
				<Stack mt="6">
					<Heading size="md">{name}</Heading>
					<Text>{description}</Text>
					<Text fontSize="2xl">€{price}</Text>
				</Stack>
			</CardBody>
			<Divider />
			<CardFooter>
				<ButtonGroup spacing="2">
					<Button variant="solid" colorScheme="orange">
						Buy now
					</Button>
					<Button variant="ghost" colorScheme="orange">
						Add to cart
					</Button>
				</ButtonGroup>
			</CardFooter>
		</Card>
	);
}
