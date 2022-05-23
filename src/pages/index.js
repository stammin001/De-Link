import styles from "../styles/Home.module.css";
import Head from "next/head";
import Header from "../components/Header";
import FormHandler from "../components/FormHandler";
import FileHandler from "../components/FileHandler";
import { useMoralis } from "react-moralis";

export default function Home() {
    const { Moralis, isWeb3Enabled } = useMoralis();

    const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER; 
    const appId = process.env.NEXT_PUBLIC_MORALIS_APPID; 
    Moralis.start({ serverUrl, appId });

    return (
        <div className={styles.container}>
            <Head>
                <title>DeLink | Imporving Trust</title>
                <link rel="icon" href="/delink.png" />
                <meta name="description" content="Improving Trust" />
            </Head>

            <main className={styles.main}>
                
                <Header/>

                {isWeb3Enabled ? (
                    <>
                        <FormHandler/>
                        <FileHandler/>
                    </>
                ) : (<div></div>
                )}
            </main>
        </div>
    );
}
