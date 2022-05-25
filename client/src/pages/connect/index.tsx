import React from 'react';
import { useConnect } from 'stores/connect';
import Button from 'ui/button';
import Styles from './styles.module.css'

interface Props {};

export default function ConnectPage (props : Props) {
    const connect = useConnect();
    return <div className={Styles.root}>
        <h1>Connect</h1>
        {
            connect.connected
            ? <>
                <div>Principal: {connect.principal?.toText()}</div>
                <Button onClick={() => connect.disconnect()}>Disconnect</Button>
            </>
            : <>
                <Button disabled={connect.connecting} onClick={() => connect.plugConnect()}>Connect Plug</Button>
                <Button disabled={connect.connecting} onClick={() => connect.stoicConnect()}>Connect Stoic</Button>
                <Button disabled={connect.connecting} onClick={() => connect.iiConnect()}>Connect Internet Identity</Button>
                <Button disabled={connect.connecting} onClick={() => connect.nfidConnect()}>Connect NFID</Button>
            </>
        }
    </div>
};