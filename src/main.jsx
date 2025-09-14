import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import App from './App.jsx';
import '@rainbow-me/rainbowkit/styles.css';

console.log('main.jsx: Initializing');

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

try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
        console.error('main.jsx: Root element not found');
        throw new Error('Root element not found');
    }
    ReactDOM.createRoot(rootElement).render(
        <QueryClientProvider client={queryClient}>
            <WagmiProvider config={config}>
                <RainbowKitProvider chains={[mainnet]}>
                    <App />
                </RainbowKitProvider>
            </WagmiProvider>
        </QueryClientProvider>
    );
    console.log('main.jsx: Rendered successfully');
} catch (error) {
    console.error('main.jsx: Render error', error);
}