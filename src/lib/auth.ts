import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const g = globalThis as unknown as { _mongo?: MongoClient };
const client = (g._mongo ??= new MongoClient(process.env.MONGODB_URI!));

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: { enabled: true, autoSignIn: false, minPasswordLength: 8 },
  socialProviders: {
    google: { clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! },
    github: { clientId: process.env.GITHUB_CLIENT_ID!, clientSecret: process.env.GITHUB_CLIENT_SECRET! },
  },
});
