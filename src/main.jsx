import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import App from './App.jsx';
import '@rainbow-me/rainbowkit/styles.css';

const config = createConfig({
    chains: [mainnet],
    connectors: [
        RainbowKit.injectedWallet({ chains: [mainnet] }),
        RainbowKit.walletConnectWallet({ projectId: '1b283111322d4899186ca0e1474dbf35', chains: [mainnet] })
    ],
    transports: {
        [mainnet.id]: http('https://mainnet.infura.io/v3/2GQEuel4OBbYmZKDFtjGoOA7ZXv')
    }
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
            <RainbowKitProvider chains={[mainnet]}>
                <App />
            </RainbowKitProvider>
        </WagmiProvider>
    </QueryClientProvider>
);