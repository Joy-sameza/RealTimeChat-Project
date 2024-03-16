import {
  DirectusCollection,
  NestedPartial,
  createCollection,
  deleteCollection,
  readCollections,
} from "@directus/sdk";
import { directus } from "../directus/directuseConection.js";
import {
  chatRoomsCollection,
  membersCollection,
  messagesCollection,
  userCollection,
} from "./directusCollection.js";
import { SchemaType } from "../interface/dataTypes.js";

/**
 * @description based on the action this function will delete or create the 4 required database tables.
 * @example
 *  await databaseOperation("create")
 * @param {string} action - Creating or Deleting database action
 */
export async function databaseOperation(action: string) {
  await directus.request(readCollections()).then(async (res) => {
    const collectionList = res.map((x) => x.collection);
    const dataBaseTables = [
      {
        name: "users",
        schema: userCollection,
      },
      {
        name: "chatRooms",
        schema: chatRoomsCollection,
      },
      {
        name: "messages",
        schema: messagesCollection,
      },
      {
        name: "members",
        schema: membersCollection,
      },
    ];
    await createIfNotExist(collectionList, dataBaseTables, action);
  });
}

/**
 * @description Core function of the database table creation function, creating or deleting the database tables
 * @param {string[]} collectionList - A List of aveilable collections on diractus
 * @param {{name: string;schema: NestedPartial<DirectusCollection<SchemaType>>;}[]} dataBaseTables - a list of collection names and thier correcsponding collection definition
 * @param action - delete "delete" or create "create" actions
 */
async function createIfNotExist(
  collectionList: string[],
  dataBaseTables: {
    name: string;
    schema: NestedPartial<DirectusCollection<SchemaType>>;
  }[],
  action: string,
) {
  if (action === "create") {
    for (let index = 0; index < dataBaseTables.length; index++) {
      if (!collectionList.includes(dataBaseTables[index].name)) {
        await directus
          .request(createCollection(dataBaseTables[index].schema))
          .then(() => {
            console.log(`${dataBaseTables[index].name} collection created`);
          })
          .catch((err) => {
            console.log(err.errors.map((x: { message: string }) => x.message));
          });
      }
    }
  } else {
    console.log("dlets");
    for (let index = 0; index < dataBaseTables.length; index++) {
      if (collectionList.includes(dataBaseTables[index].name)) {
        await directus
          .request(deleteCollection(dataBaseTables[index].name))
          .then(() => {
            console.log(`${dataBaseTables[index].name} collection deleted`);
          })
          .catch((err) => {
            console.log(err.errors.map((x: { message: string }) => x.message));
          });
      }
    }
  }
}
