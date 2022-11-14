import { Provider, createClient } from "urql";
import { ChakraProvider } from "@chakra-ui/react";

// this is the address to the backend. Provider below gives access to the backend to our app
const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });
function MyApp({ Component, pageProps }) {
	return (
		<Provider value={client}>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</Provider>
	);
}

export default MyApp;
