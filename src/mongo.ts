import { MongoClient, Collection} from 'mongodb'
import { Book } from './apollo/models/book.js'
import { GameState } from './apollo/models/gameState.js'
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

const orgGameState: Omit<GameState, '_id'> =
{
    players: 
    [
        {
            id: '0',
            name: 'Erika',
            role: 'Mafia',
            status: 'Alive',
            votes: [], // Array of player Ids that this player has voted for
            killVote: [], // Optional property to store the kill vote for Mafia players for each night
        },
        {
            id: '1',
            name: 'Cynthia',
            role: 'Villager',
            status: 'Alive',
            votes: [], // Array of player Ids that this player has voted for
            killVote: [], // Optional property to store the kill vote for Mafia players for each night
        }
    ],
    hostId: '0', // Identifier of the game host
    round: 0,
    phase: 'night'
}

export async function connectToDatabase(client: MongoClient, dbName: string) {

    console.log('Connecting to mongoDB ...')
    await client.connect();
    console.log('Connected successfully to MongoDB')

    const db = client.db(dbName)
    
    // initialize book collection and init some data
    ModelCollections.books =  db.collection("books")
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${ModelCollections.books.collectionName}`);

    ModelCollections.gameState =  db.collection("GameState")
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${ModelCollections.gameState.collectionName}`);

    // add some books to the database
    const existingBook = await ModelCollections.books.findOne({});
    if (existingBook) {
        console.log("skip adding books collection.");
    } else {
        console.log("inserting books collection", await ModelCollections.books.insertMany(books as any))
    }

    // add a game state to the database
    const existingState = await ModelCollections.gameState.findOne({});
    if (existingState) {
        console.log("skip adding GameState collection.");
    } else {
        console.log("inserting GameState collection", await ModelCollections.gameState.insertOne(orgGameState as any))
    }
}


