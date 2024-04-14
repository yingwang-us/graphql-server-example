

import { PubSub } from 'graphql-subscriptions';

var pubSub: PubSub;

export function setPubSub(ps: PubSub) {
    pubSub = ps;
}

export function getPubSub(): PubSub {
    return pubSub;
}

