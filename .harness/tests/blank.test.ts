import { tarotDabActor } from '../actors/actor'

const TarotDabAnon = tarotDabActor();

test('Test harness operational', () => {
    expect(true).toBe(true);
});

test('Test environment operational', async () => {
    const pong = await TarotDabAnon.ping();
    expect(pong).toBe('pong');
});