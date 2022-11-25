import { Box, Icon } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";

export default function User() {
	// next Link tag is for client side transitions, the login interfaces with an api so a regular a tag is appropriate
	return (
		<Box>
			<a href="/api/auth/login">
				<Icon as={FaUserCircle} fontSize="3xl" />
			</a>
		</Box>
	);
}
