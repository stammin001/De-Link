import { ConnectButton } from "web3uikit";

export default function Header() {
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
