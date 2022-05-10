import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";

export default function MyApp({ Component, pageProps }) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <Component {...pageProps} />
        </MoralisProvider>
    );
}