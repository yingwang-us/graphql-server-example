import { GameState } from '../models/gameState.js'
import { ModelCollections } from '../models/collections.js'
import { getPubSub } from './pubsub.js';

export async function getGameState (): Promise<GameState> {
    const values = await ModelCollections.gameState.findOne({}) 
    const gs = values as GameState;
    return gs;
}