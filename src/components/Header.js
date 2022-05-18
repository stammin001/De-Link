import { ConnectButton } from "web3uikit";

export default function Header() {
    return (
        <nav>
            <h1 className="">
                Link3.0 (Chainlink Hackathon Project)
            </h1>
            <div className="">
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    );
}
