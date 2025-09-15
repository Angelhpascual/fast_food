import { CreateUserParams, GetMenuParams, SignInParams } from "@/type"
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite"

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  platform: "com.virtulab.foodordering",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: "68c295ba00230a53b02a",
  bucketId: "68c7f41b003979e73bd6",
  userCollectionId: "68c295e9002999865181",
  categoriesCollectionId: "68c7ea95000915127288",
  menuCollectionId: "68c7ec9a002fbd587999",
  customizationsCollectionId: "68c7f0a6001fe34d916f",
  menuCustomizationCollectionId: "68c7f1aa000d095622b1",
}

export const client = new Client()

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform)

export const account = new Account(client)

export const databases = new Databases(client)

export const avatars = new Avatars(client)

export const storage = new Storage(client)

export const createUser = async ({
  email,
  password,
  name,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name)
    if (!newAccount) throw new Error("Account not created")
    await signIn({ email, password })

    const avatarUrl = avatars.getInitialsURL(name)

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        name,
        avatar: avatarUrl,
      }
    )
  } catch (e) {
    throw new Error(e as string)
  }
}

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password)
  } catch (e) {
    throw new Error(e as string)
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()
    if (!currentAccount) throw new Error("No user logged in")
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    )

    if (!currentUser) throw Error
    console.log(currentUser.documents[0], "currentUser")
    return currentUser.documents[0]
  } catch (error) {
    console.log(error)
    throw new Error(error as string)
  }
}

export const getMenu = async ({ category, query, limit }: GetMenuParams) => {
  try {
    const queries: string[] = []

    if (category) queries.push(Query.equal("categories", category))
    if (query) queries.push(Query.search("name", query))
    if (limit) queries.push(Query.limit(limit))

    const menu = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries
    )
    if (!menu) throw new Error("No menu found")
    return menu.documents
  } catch (error) {
    throw new Error(error as string)
  }
}

export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId
    )
    if (!categories) throw new Error("No categories found")
    return categories.documents
  } catch (error) {
    throw new Error(error as string)
  }
}
