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
import Link from "next/link";

export default function Product({ product }) {
	const { image, name, price, description, slug } = product.attributes;
	const mdImg = image.data.attributes.formats.medium.url;
	return (
		<Card>
			<CardBody>
				<Link href={`product/${slug}`}>
					<Image src={mdImg} cursor="pointer" borderRadius="lg" />
				</Link>
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
