import { Client, Account, Databases, Storage, ID } from 'appwrite';

// --- DATABASE EXAMPLES ---
// Replace with your actual database and collection IDs
const DATABASE_ID = '688aaa76001b395e9fac';
const TASKS_COLLECTION_ID = '688aaa99002fb02312db';

// Create a new task
export async function createTask(data) {
  return databases.createDocument(DATABASE_ID, TASKS_COLLECTION_ID, ID.unique(), data);
}

// Get all tasks
export async function getTasks() {
  return databases.listDocuments(DATABASE_ID, TASKS_COLLECTION_ID);
}

// --- STORAGE EXAMPLES ---
// Replace with your actual bucket ID
const BUCKET_ID = '688aaabb0001ca8cfaa1';

// Upload a file
export async function uploadFile(file) {
  return storage.createFile(BUCKET_ID, ID.unique(), file);
}

// List all files
export async function listFiles() {
  return storage.listFiles(BUCKET_ID);
}



export const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('688a72110001662cd53f'); // Replace with your project ID


export const account = new Account(client);
export const databases = new Databases(client);
// export const functions = new Functions(client); // Removed as functions are not used
export const storage = new Storage(client);

export {ID} from 'appwrite';

