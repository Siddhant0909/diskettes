import { Client, Account, Databases } from "appwrite";
import { config } from "../../config";

const client = new Client();

client
  .setEndpoint(config.appwriteEndpoint)
  .setProject(config.appwriteProjectId);

export const account = new Account(client);

export const databases = new Databases(client);
