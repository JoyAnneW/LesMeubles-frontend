import { Provider, createClient } from "urql";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { ShopContextProvider } from "../lib/context";

// this is the address to the backend. Provider below gives access to the backend to our app
const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });
function MyApp({ Component, pageProps }) {
	return (
		<Provider value={client}>
			<ChakraProvider>
				<ShopContextProvider>
					<Navbar />
					<Component {...pageProps} />
				</ShopContextProvider>
			</ChakraProvider>
		</Provider>
	);
}

export default MyApp;
