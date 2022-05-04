import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import CONSUMERAPI from "../components/ConsumerAPI";
import { useMoralis } from "react-moralis";

export default function Home() {
    const { isWeb3Enabled } = useMoralis();
    return (
        <main className={styles.container}>
            <Header />

            {isWeb3Enabled ? (
                <>
                    <CONSUMERAPI />
                </>
            ) : (
                <div>No Wallet detected.</div>
            )}
        </main>
    );
}
