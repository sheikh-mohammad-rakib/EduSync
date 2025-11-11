import { account } from "../lib/appwrite";

export async function logout() {
  try {
    await account.deleteSession("current");
  } catch {
    // Ignore errors
  }
}
