import { Account, Client, Functions, ID, Query, Storage, TablesDB } from "react-native-appwrite";

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform("com.Vitanta.Vitanta");

export const auth = new Account(client);
export const db = new TablesDB(client);
export const storage = new Storage(client);
export const functions = new Functions(client);
export const id = ID;
export const query = Query;

//databases ID
export const DB_ID = "692f3e90000e51ddb875";

//colections ID
export const USERS_COLLECTION_ID = "692f3ed50009640c7ad7";
export const MOOD_REGISTERS_COLLECTION_ID = "692f3f6c001af825c60d";

//buckets ID
export const USER_PROFILE_IMAGES_BUCKET_ID = "692f40980028aa5cf1b5";
