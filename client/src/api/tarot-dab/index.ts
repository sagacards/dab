import { useQuery, QueryClient } from 'react-query';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';
import { Actor } from "@dfinity/agent";
import { defaultAgent } from "stores/connect";
import { Metadata, TarotDAB } from './interface/tarot-dab.did.d';
import { idlFactory } from './interface/tarot-dab.did';

// TODO: Connect as admin and add/remove canisters


////////////
// Types //
//////////


interface Entry extends Omit<Metadata, 'details' | 'principal_id' | 'frontend'> {};

interface LegendEntry extends Entry {
    artists: string;
    principal: string;
    isDeck: boolean;
};


//////////////
// Mapping //
////////////


// Maps an entry from the DAB registry for use in this app.
function mapDabCanister (
    entry : Metadata,
) : LegendEntry {
    const details = Object.fromEntries(entry.details);
    return {
        name: entry.name,
        thumbnail: entry.thumbnail,
        description: entry.description,
        // Principal objects don't survive localstorage, so we text encode here.
        principal: entry.principal_id.toText(),
        // @ts-ignore: TODO improve this
        artists: details.artists.Text,
        // @ts-ignore: TODO improve this
        isDeck: details?.isDeck?.Text === 'true',
    }
};


///////////////
// Fetching //
/////////////


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

// Just a plain actor we can use to make requests.
const actor = Actor.createActor<TarotDAB>(idlFactory, {
    agent: defaultAgent,
    canisterId: import.meta.env.DAPP_DAB_CANISTER_ID,
})

// Retrieve all tarot NFTS.
function getAll () {
    return actor.getAll().then(r => r.map(mapDabCanister));
};


////////////
// Hooks //
//////////


// The hook providing our tarot NFT registry.
export function useTarotDAB() {
    return useQuery('tarotDAB', getAll, {
        cacheTime: 7 * 24 * 60 * 60_000,
        staleTime: 60 * 60_000,
    });
};
