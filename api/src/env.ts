// src/env.mjs
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    PORT: z.coerce.number().default(4000),

    // DATABASE_URL: z.string().url(),
    DATABASE_HOST: z.string(),
    DATABASE_NAME: z.string(),
    DATABASE_PORT: z.coerce.number(),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),

    REFRESH_PUBLIC_KEY: z.string(),
    REFRESH_PRIVATE_KEY: z.string(),
    ACCESS_PUBLIC_KEY: z.string(),
    ACCESS_PRIVATE_KEY: z.string(),
  },

  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,

    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,

    REFRESH_PUBLIC_KEY: process.env.REFRESH_PUBLIC_KEY,
    REFRESH_PRIVATE_KEY: process.env.REFRESH_PRIVATE_KEY,
    ACCESS_PUBLIC_KEY: process.env.ACCESS_PUBLIC_KEY,
    ACCESS_PRIVATE_KEY: process.env.ACCESS_PRIVATE_KEY,
  },
});
