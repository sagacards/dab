import 'isomorphic-fetch'
import dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { Actor, ActorSubclass, HttpAgent, HttpAgentOptions, Identity } from "@dfinity/agent"
import { IDL } from "@dfinity/candid"
import { Principal } from "@dfinity/principal"
import { idlFactory } from './interface/tarot-dab/tarot-dab.did'
import { _SERVICE } from './interface/tarot-dab/tarot-dab.did.d'

dotenv.config({
    path: './.env/.env.local'
});

const canisters = JSON.parse(readFileSync(`${__dirname}/../../../.dfx/local/canister_ids.json`).toString());
const canistersIC = JSON.parse(readFileSync(`${__dirname}/../../../canister_ids.json`).toString());

export function createActor<T>(canisterId: string | Principal, idlFactory: IDL.InterfaceFactory, options: HttpAgentOptions) : ActorSubclass<T> {
    const agent = new HttpAgent({
        host: process.env.HOST,
        ...options
    });

    agent.fetchRootKey().catch(err => {
        console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
        console.error(err);
    });

    return Actor.createActor(idlFactory, {
        agent,
        canisterId,
    });
};

export function tarotDabActor (
    identity?: Identity,
    network: 'ic' | 'local' = 'local',
) : ActorSubclass<_SERVICE> {
    const canisterId = network === 'local' ? canisters['tarot-dab'].local : canistersIC['tarot-dab'].ic;
    return createActor(canisterId, idlFactory, { identity, host: network === 'local' ? 'http://localhost:8000' : 'https://ic0.app' });
};

