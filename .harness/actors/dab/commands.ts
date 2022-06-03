// Typescript functions we run against the dab canister.

import { fetchIdentity } from '../../keys/keys';
import { tarotDabActor } from './actor';
import { Metadata } from './interface/tarot-dab/tarot-dab.did.d';

const TarotDabAdmin = tarotDabActor(fetchIdentity("admin"));

// Add new canisters to the directory.
export function addCanisters (canisters : Metadata[]) {
    TarotDabAdmin.adds(canisters);
};
