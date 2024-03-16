import { Router } from "express";
import { createTables, deleteTables } from "../controllers/adminController.js";

const adminRoutes = Router();

/**
 * @openapi
 * '/api/admin/create/tables':
 *  get:
 *     tags:
 *     - Admin EndPoints
 *     summary: Create database tables
 *     responses:
 *      200:
 *        description: request successful
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
adminRoutes.get("/create/tables", createTables);

/**
 * @openapi
 * '/api/admin/delete/tables':
 *  delete:
 *     tags:
 *     - Admin EndPoints
 *     summary: Delet database tables
 *     responses:
 *      200:
 *        description: request successful
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
adminRoutes.delete("/delete/tables", deleteTables);

export default adminRoutes;
