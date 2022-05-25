import { useQuery, QueryClient } from 'react-query';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';
import { Actor } from "@dfinity/agent";
import { defaultAgent } from "stores/connect";
import { TarotDAB } from './interface/tarot-dab.did.d';
import { idlFactory } from './interface/tarot-dab.did';

// TODO: Connect as admin and add/remove canisters

// Just a plain actor we can use to make requests.
const actor = Actor.createActor<TarotDAB>(idlFactory, {
    agent: defaultAgent,
    canisterId: import.meta.env.DAPP_DAB_CANISTER_ID,
})

// Retrieve all tarot NFTS.
function getAll () {
    return actor.getAll().then(r => r.map(x => ({
        ...x,
        // Principal objects don't survive localstorage, so we text encode here.
        principal_id: x.principal_id.toText()
    })));
};

// We initialize a react-query client with localstorage, because the directory won't change often at all.
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 7 * 24 * 60 * 60_000,
            staleTime: 60 * 60_000,
        },
    },
});
const localStoragePersistor = createWebStoragePersistor({ storage: window.localStorage });
persistQueryClient({
    queryClient,
    persistor: localStoragePersistor,
});

// The hook providing our tarot NFT registry.
export function useTarotDAB() {
    return useQuery('tarotDAB', getAll, {
        cacheTime: 7 * 24 * 60 * 60_000,
        staleTime: 60 * 60_000,
    });
};
