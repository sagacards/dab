import React from 'react'
import { QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';

import { useConnect } from 'stores/connect';
import { queryClient } from 'api/tarot-dab';

import HomePage from 'pages/home';

import Messages from 'ui/messages';
import ScrollToTop from 'ui/scroll-to-top';
import Modal from 'ui/modal';
import useMessageStore from 'stores/messages';
import ConnectPage from 'pages/connect';

function App() {
    const { initConnect } = useConnect();
    const { initMessage } = useMessageStore();
    React.useEffect(() => {
        initConnect()
        initMessage()
    }, []);
    return <>
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/connect" element={<ConnectPage />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
            <Messages />
            <ScrollToTop />
            <Modal />
        </QueryClientProvider>
    </>
}

export default App
