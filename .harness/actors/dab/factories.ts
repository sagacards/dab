import { Principal } from '@dfinity/principal';
import { Metadata } from './interface/tarot-dab/tarot-dab.did.d';

export function MetadataFactory () : Metadata {
    return {
        'thumbnail' : 'https://nges7-giaaa-aaaaj-qaiya-cai.raw.ic0.app/assets/logo.png',
        'name' : 'Test Canister',
        'frontend' : [],
        'description' : 'Lorem ipsum dolor sit amet...',
        'details' : [
            ['test', { 'Text' : 'Some value...' }]
        ],
        'principal_id' : Principal.fromText('nges7-giaaa-aaaaj-qaiya-cai'),
    };
};