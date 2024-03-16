import { authentication, createDirectus, rest } from "@directus/sdk";
import {
  DIRECTUS_ADMIN_EMAIL,
  DIRECTUS_ADMIN_PASSWORD,
  DIRECTUS_HOST,
  DIRECTUS_PORT,
} from "../../config/config.js";
import { databaseOperation } from "../database/directusCreateDb.js";
import { SchemaType } from "../interface/dataTypes.js";

/**
 * @description Connection to directus CMS
 */
export const directus = createDirectus<SchemaType>(
  `http://${DIRECTUS_HOST}:${DIRECTUS_PORT}`,
)
  .with(authentication("json"))
  .with(rest());

/**
 * @description Login to directuse server using Admin email and passwords
 */
await directus.login(DIRECTUS_ADMIN_EMAIL, DIRECTUS_ADMIN_PASSWORD);

//Creating databases
databaseOperation("create");
