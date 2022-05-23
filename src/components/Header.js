import { ConnectButton } from "web3uikit";
import { useMoralis } from "react-moralis";
import classes from "./form.module.css";

export default function Header() {
    const {isInitialized} = useMoralis();
    return (
        <nav>
            <h1 className="">
                <img src="/delink.png" className={classes.logo}/>
                De-Link (Improving Trust)
            </h1>
            <div className="">
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>        
    );
}
