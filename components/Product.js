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
import { useContext } from "react";
import { useShopContext } from "../lib/context";
import toast from "react-hot-toast";

export default function Product({ product }) {
	const { addToCart } = useShopContext();
	const { image, name, price, description, slug } = product.attributes;
	const mdImg = image.data.attributes.formats.medium.url;
	const notify = () => toast.success(`${name} has been added to your cart.`);

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
					<Button
						variant="ghost"
						colorScheme="orange"
						onClick={() => {
							addToCart(product);
							notify();
						}}
					>
						Add to cart
					</Button>
				</ButtonGroup>
			</CardFooter>
		</Card>
	);
}
