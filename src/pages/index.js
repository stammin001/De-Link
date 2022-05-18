import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import FormHandler from "../components/FormHandler";
import { useMoralis } from "react-moralis";

export default function Home() {
    const { Moralis, isWeb3Enabled } = useMoralis();

    const serverUrl = "https://rgebnq5rsjd2.usemoralis.com:2053/server";
    const appId = "nAj7Xf3E1CGDb4diSgvIBj6bb4FxoSl8XPLIkd4T";
    Moralis.start({ serverUrl, appId });

    return (
        <main className={styles.container}>
            
            <Header/>

            {isWeb3Enabled ? (
                <>
                    <FormHandler />
                </>
            ) : (<div></div>
            )}
        </main>
    );
}
