import { MongoClient, Collection} from 'mongodb'
import { Book } from './apollo/models/book.js'
import { ModelCollections } from './apollo/models/collections.js'

const books: Omit<Book, '_id'>[] = [
    {
      author: 'Kate Chopin',
      title: 'The Awakening',
      price: 10.95,
      inventory: 1000,
    },
 
    {
      author: 'Paul Auster',
      title: 'City of Glass',
      price: 15.95,
      inventory: 500,
    },
]

export async function connectToDatabase(client: MongoClient, dbName: string) {

    console.log('Connecting to mongoDB ...')
    await client.connect();
    console.log('Connected successfully to MongoDB')

    const db = client.db(dbName)
    
    // initialize book collection and init some data
    ModelCollections.books =  db.collection("books")
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${ModelCollections.books.collectionName}`);
    // add some books to the database
    const existingBook = await ModelCollections.books.findOne({});
    if (existingBook) {
        console.log("skip adding books collection.");
    } else {
        console.log("inserting books collection", await ModelCollections.books.insertMany(books as any))
    }
}


