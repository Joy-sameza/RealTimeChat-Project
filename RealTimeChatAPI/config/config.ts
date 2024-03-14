import { configDotenv } from "dotenv";

configDotenv({
  path: process.env.NODE_ENV!.includes("production") ? ".env" : ".env.dev",
});

const env = process.env;

export const SERVER_HOST = env.SERVER_HOST ?? "localhost";
export const SERVER_PORT = env.SERVER_PORT ?? "4000";

export const DIRECTUS_HOST = env.DIRECTUS_HOST ?? "localhost";
export const DIRECTUS_PORT = env.DIRECTUS_PORT ?? 8055;
export const DIRECTUS_ADMIN_EMAIL =
  env.DIRECTUS_ADMIN_EMAIL ?? "admin@example.com";
export const DIRECTUS_ADMIN_PASSWORD =
  env.DIRECTUS_ADMIN_PASSWORD ?? "d1r3ctu5";

export const ENCRIPTION_SECRET_KEY =
  env.ENCRIPTION_SECRET_KEY ?? "Rea17im9cha7";
