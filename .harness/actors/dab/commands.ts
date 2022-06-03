// Typescript functions we run against the dab canister.

import { Principal } from '@dfinity/principal';
import axios from 'axios'

import { fetchIdentity } from '../../keys/keys';
import { tarotDabActor } from './actor';
import { DetailValue, Metadata } from './interface/tarot-dab/tarot-dab.did.d';

const TarotDabAdmin = tarotDabActor(fetchIdentity("admin"));

// Provision legends canisters from the authoritative google sheet.
export async function provisionLegendsCanisters () {
    const data : string = await axios('https://docs.google.com/spreadsheets/d/10CU-7BdG5OLt_hWAVjuGl0FkRanUvODQEJPNJTj01FQ/export?format=csv').then(r => r.data);
    const headers = data.split('\n').slice(0, 1)[0].split(',');
    const rows = data.split('\n').slice(1).map(r => r.split(','));

    const fields = ['name', 'principal_id', 'thumbnail', 'description'];
    const detailsFields = ['preview_image', 'banner_image', 'artists', 'description_long',];
    
    // Make sure we got the expected headers
    const expectedRows = [...fields, ...detailsFields];
    for (let i = 0; i < headers.length; i++) {
        const [actual, expected] = [headers[i].trim(), expectedRows[i].trim()];
        if (actual != expected) throw new Error(`Unexpected header. Expected "${expected}" got "${actual}"`);
    }

    // Map CSV into an object
    const canisters = rows.map(row => ({

        ...fields.reduce((agg, field, i) => ({
            ...agg,
            [field]: field === 'principal_id' ? Principal.fromText(row[i] || "aaaaa-aa") : row[i],
        }), { frontend: [] } as Metadata),

        details: detailsFields.map((field, i) => ([field, { 'Text': row[i + fields.length] }] as [string, DetailValue]))

    }));

    const update = canisters.filter(x => x.principal_id.toText() !== "aaaaa-aa");

    // TODO: Automate asset upload:
    //  - Create new admin role on NFT canisters that only permits managing assets
    //  - Create a new private key that holds the new asset admin role on all NFT canisters
    //  - Store asset admin pk as saga gh org secret
    //  - Download and reupload assets (with correct tags) to each NFT canister
    //  - Replace asset urls in `canisters` objects with new onchain assets

    console.log(`Adding ${update.length} canisters.`);

    const r = await TarotDabAdmin.adds(update);

    console.log(r);
};
