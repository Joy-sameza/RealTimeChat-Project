import { Request, Response } from "express";
import { databaseOperation } from "../database/directusCreateDb.js";
import { sendErrorToClient } from "../utils/sendAndLogError.js";

/**
 * ## Create request for the following tables
 * - usertable
 * - chatroom table
 * - member table
 * - message table
 * @param req Client request to create existing database tables
 * @param res Response to client if tables are created
 * @error - Will not succed if internal server error
 */
export async function createTables(req: Request, res: Response) {
  try {
    await databaseOperation("create");
    res.json("Database tables created");
  } catch (error) {
    sendErrorToClient(res, "could not crete tables", error);
  }
}

/**
 * ## Delete request for the following tables
 * - usertable
 * - chatroom table
 * - member table
 * - message table
 * @param req Client request to delete existing database tables
 * @param res Response to client if tables are deleted
 * @error - Will not succed if internal server error
 */
export async function deleteTables(req: Request, res: Response) {
  try {
    await databaseOperation("delete");
    res.json("Database tables deleted");
  } catch (error) {
    sendErrorToClient(res, "could not delete tables", error);
  }
}
