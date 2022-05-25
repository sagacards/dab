import { Ed25519KeyIdentity } from '@dfinity/identity'
import { tarotDabActor } from '../actors/actor'
import { MetadataFactory } from '../actors/factories';
import { fetchIdentity } from '../keys/keys';

const TarotDabAnon = tarotDabActor();
const TarotDabAdmin = tarotDabActor(fetchIdentity("admin"));

const randomPrincipal = Ed25519KeyIdentity.generate().getPrincipal();

describe("Admin module admin functions", () => {
    it("addAdmin is NOT callable by users", async () => {
        const rejected = await TarotDabAnon.addAdmin(randomPrincipal).catch(r => true);
        expect(rejected).toBe(true);
    });
    it("removeAdmin is NOT callable by users", async () => {
        const rejected = await TarotDabAnon.removeAdmin(randomPrincipal).catch(r => true);
        expect(rejected).toBe(true);
    });
    it("addAdmin IS callable by admins", async () => {
        const success = await TarotDabAdmin.addAdmin(randomPrincipal).then(r => true);
        expect(success).toBe(true);
    });
    it("removeAdmin IS callable by admins", async () => {
        const success = await TarotDabAdmin.removeAdmin(randomPrincipal).then(r => true);
        expect(success).toBe(true);
    });
});

describe("Registry module admin function", () => {
    it("add is NOT callable by users", async () => {
        const metadata = MetadataFactory();
        const response = await TarotDabAnon.add(metadata);
        expect(response).toStrictEqual({ Err: { NotAuthorized: null } });
    });
    it("add IS callable by admins", async () => {
        const metadata = MetadataFactory();
        const response = await TarotDabAdmin.add(metadata);
        expect(response).toStrictEqual({ Ok: [] });
    });
    it("add is NOT callable by users", async () => {
        const response = await TarotDabAnon.remove(randomPrincipal);
        expect(response).toStrictEqual({ Err: { NotAuthorized: null } });
    });
    it("add IS callable by admins", async () => {
        const response = await TarotDabAdmin.remove(randomPrincipal);
        expect(response).toStrictEqual({ Ok: [] });
    });
});

describe("Canistergeek module admin functions", () => {});