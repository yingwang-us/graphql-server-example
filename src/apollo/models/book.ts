
import type { WithId, Document } from 'mongodb'
import { MongoClient, Collection, Db, ObjectId } from 'mongodb'

export interface Book extends WithId<Document> {
    id: ObjectId;
    author: string;
    title: string;
    price: number;
    inventory: number;
};
