import { ConnectButton } from "web3uikit";
import { useMoralis } from "react-moralis";

export default function Header() {
    const {isInitialized} = useMoralis();
    return (
        <nav>
            <h1 className="">
                De-Link (Improving Trust)
            </h1>
            <div className="">
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>        
    );
}
