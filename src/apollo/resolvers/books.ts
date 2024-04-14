
import { Book } from '../models/book.js'
import { ModelCollections } from '../models/collections.js'
import { getPubSub } from './pubsub.js';

export async function listBooks (): Promise<Book[]> {
    const values = await ModelCollections.books.find({}).toArray()  
    const existingBooks = values as Book[];
    return existingBooks;
}

export async function addABook (parent, args, context) :Promise<string> {
    const { title, author, price, inventory } = args;
    const b: Omit<Book, '_id'> = {
        title, author, price, inventory
    };
    let result = await ModelCollections.books.insertOne(b)
    getPubSub().publish('NEW_BOOK_ADDED', { newBookAdded: b });
    return result.insertedId.toString()
}

