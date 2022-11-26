import { Flex, Icon, Image, Text } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { useUser } from "@auth0/nextjs-auth0";

export default function User() {
	const { user, error, loading } = useUser();
	console.log(user.picture);
	// next Link tag is for client side transitions, the login interfaces with an api so a regular a tag is appropriate
	return (
		<Flex
			direction="column"
			gap={1}
			justifyContent="center"
			alignItems="center"
		>
			<Image src={user.picture} borderRadius="full" boxSize="35px" />
			<Text>{user.name}</Text>
		</Flex>
	);
}
