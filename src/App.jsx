import { useState, useEffect } from 'react';
import { useAccount, useContractRead, useContractWrite, useWaitForTransactionReceipt } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import confetti from 'canvas-confetti';
import './App.css';

const contractAddress = '0xfd39CD1F87a237C628C42c0Efde88AC02654B775';
const abi = [
    { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "ApprovalCallerNotOwnerNorApproved", "type": "error" }, { "inputs": [], "name": "ApprovalQueryForNonexistentToken", "type": "error" }, { "inputs": [], "name": "BalanceQueryForZeroAddress", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "numerator", "type": "uint256" }, { "internalType": "uint256", "name": "denominator", "type": "uint256" }], "name": "ERC2981InvalidDefaultRoyalty", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "receiver", "type": "address" }], "name": "ERC2981InvalidDefaultRoyaltyReceiver", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "numerator", "type": "uint256" }, { "internalType": "uint256", "name": "denominator", "type": "uint256" }], "name": "ERC2981InvalidTokenRoyalty", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "address", "name": "receiver", "type": "address" }], "name": "ERC2981InvalidTokenRoyaltyReceiver", "type": "error" }, { "inputs": [], "name": "InsufficientEther", "type": "error" }, { "inputs": [], "name": "InvalidAmount", "type": "error" }, { "inputs": [], "name": "MintERC2309QuantityExceedsLimit", "type": "error" }, { "inputs": [], "name": "MintToZeroAddress", "type": "error" }, { "inputs": [], "name": "MintZeroQuantity", "type": "error" }, { "inputs": [], "name": "NotCompatibleWithSpotMints", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "OwnableInvalidOwner", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "OwnableUnauthorizedAccount", "type": "error" }, { "inputs": [], "name": "OwnerQueryForNonexistentToken", "type": "error" }, { "inputs": [], "name": "OwnershipNotInitializedForExtraData", "type": "error" }, { "inputs": [], "name": "SequentialMintExceedsLimit", "type": "error" }, { "inputs": [], "name": "SequentialUpToTooSmall", "type": "error" }, { "inputs": [], "name": "SoldOut", "type": "error" }, { "inputs": [], "name": "SpotMintTokenIdTooSmall", "type": "error" }, { "inputs": [], "name": "TokenAlreadyExists", "type": "error" }, { "inputs": [], "name": "TransferCallerNotOwnerNorApproved", "type": "error" }, { "inputs": [], "name": "TransferFromIncorrectOwner", "type": "error" }, { "inputs": [], "name": "TransferToNonERC721ReceiverImplementer", "type": "error" }, { "inputs": [], "name": "TransferToZeroAddress", "type": "error" }, { "inputs": [], "name": "URIQueryForNonexistentToken", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "fromTokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "toTokenId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "ConsecutiveTransfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "MAX_SUPPLY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "recipients", "type": "address[]" }, { "internalType": "uint256[]", "name": "_amounts", "type": "uint256[]" }], "name": "aidropMultiple", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "cost", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "salePrice", "type": "uint256" }], "name": "royaltyInfo", "outputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_newBaseURI", "type": "string" }], "name": "setBaseURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newCost", "type": "uint256" }], "name": "setMintCost", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "result", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "treasuryMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "uriSuffix", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "payable", "type": "function" }
];

class ErrorBoundary extends React.Component {
    state = { error: null };

    static getDerivedStateFromError(error) {
        return { error };
    }

    render() {
        if (this.state.error) {
            console.error('ErrorBoundary:', this.state.error);
            return <div id="message">Error: {this.state.error.message}</div>;
        }
        return this.props.children;
    }
}

function App() {
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');
    const [showCongrats, setShowCongrats] = useState(false);

    const { address, isConnected } = useAccount();

    const { data: totalSupply, error: totalSupplyError } = useContractRead({
        address: contractAddress,
        abi,
        functionName: 'totalSupply',
        watch: true
    });

    const { data: cost, error: costError } = useContractRead({
        address: contractAddress,
        abi,
        functionName: 'cost'
    });

    const { data: maxSupply, error: maxSupplyError } = useContractRead({
        address: contractAddress,
        abi,
        functionName: 'MAX_SUPPLY'
    });

    const { data: hash, write, isPending, isError, error } = useContractWrite({
        address: contractAddress,
        abi,
        functionName: 'mint'
    });

    const { isSuccess } = useWaitForTransactionReceipt({ hash });

    useEffect(() => {
        console.log('App: Running useEffect', { isConnected, address, totalSupply, cost, maxSupply });
        if (totalSupplyError) {
            console.error('App: totalSupply error', totalSupplyError);
            setMessage('Error reading totalSupply: ' + totalSupplyError.message);
        }
        if (costError) {
            console.error('App: cost error', costError);
            setMessage('Error reading cost: ' + costError.message);
        }
        if (maxSupplyError) {
            console.error('App: MAX_SUPPLY error', maxSupplyError);
            setMessage('Error reading MAX_SUPPLY: ' + maxSupplyError.message);
        }
        if (isConnected) {
            console.log('App: Wallet connected', address);
            setMessage('Wallet connected!');
        } else {
            console.log('App: Wallet disconnected');
            setMessage('');
        }
        if (isSuccess) {
            console.log('App: Mint successful');
            setMessage('Mint successful!');
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            setShowCongrats(true);
            setTimeout(() => setShowCongrats(false), 5000);
        }
        if (isError) {
            console.error('App: Mint error', error);
            if (error?.message.includes('SoldOut')) {
                setMessage('Error: The NFT collection is sold out.');
            } else {
                setMessage('Mint error: ' + (error?.message || 'Unknown error'));
            }
        }
    }, [isConnected, isSuccess, isError, error, address, totalSupply, cost, maxSupply, totalSupplyError, costError, maxSupplyError]);

    const handleMint = () => {
        console.log('mintNFT: Called with quantity', quantity);
        if (!isConnected) {
            setMessage('Please connect your wallet first.');
            console.error('mintNFT: Wallet not connected');
            return;
        }
        if (!cost) {
            setMessage('Error: Contract cost not loaded.');
            console.error('mintNFT: Cost not loaded');
            return;
        }
        const totalValue = BigInt(quantity) * BigInt(cost);
        console.log('mintNFT: Total value', ethers.formatEther(totalValue), 'ETH');
        write({ args: [quantity], value: totalValue });
    };

    const progress = maxSupply && totalSupply ? (Number(totalSupply) / Number(maxSupply)) * 100 : 0;
    const totalPrice = cost ? ethers.formatEther(BigInt(quantity) * BigInt(cost)) : '0';

    return (
        <ErrorBoundary>
            <div className="container">
                <h1>Genesis NFT Mint</h1>
                <div className="radial-progress" style={{ '--progress': `${progress}%` }}>
                    <div className="progress-text">{totalSupply ? Number(totalSupply) : 0} / {maxSupply || 0}</div>
                </div>
                <div className="nft-section">
                    <img
                        src="/GenesisNFT1.png"
                        alt="NFT Image"
                        className="nft-image"
                        onError={(e) => {
                            console.error('App: NFT image failed to load');
                            e.target.alt = 'NFT image failed to load. Check if GenesisNFT1.png is in public/';
                        }}
                    />
                    <div className="mint-controls">
                        <label htmlFor="quantity">Select Quantity (1-100):</label>
                        <input
                            type="range"
                            id="quantity"
                            min="1"
                            max="100"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                        <span id="quantity-value">{quantity}</span>
                        <p>Total Price: <span id="total-price">{totalPrice} ETH</span></p>
                        <ConnectButton />
                        {isConnected && (
                            <button onClick={handleMint} disabled={isPending}>
                                {isPending ? 'Minting...' : 'Mint'}
                            </button>
                        )}
                    </div>
                </div>
                {message && <div id="message">{message}</div>}
                {showCongrats && (
                    <div id="congrats">
                        <h2>Congratulations!</h2>
                        <p>You have successfully minted your NFTs!</p>
                    </div>
                )}
            </div>
        </ErrorBoundary>
    );
}

export default App;