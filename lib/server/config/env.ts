import { z } from "zod";

const optionalString = z.preprocess((value) => (value === "" ? undefined : value), z.string().optional());
const optionalUrl = z.preprocess((value) => (value === "" ? undefined : value), z.string().url().optional());

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: optionalString,
  AUTH_SECRET: optionalString,
  AUTH_URL: optionalUrl,
  GITHUB_CLIENT_ID: optionalString,
  GITHUB_CLIENT_SECRET: optionalString,
  SENTRY_DSN: optionalString,
  OPENAI_API_KEY: optionalString,
});

export const serverEnv = serverEnvSchema.parse(process.env);

export function hasDatabaseUrl() {
  return Boolean(serverEnv.DATABASE_URL);
}

export function hasGitHubOAuth() {
  return Boolean(serverEnv.GITHUB_CLIENT_ID && serverEnv.GITHUB_CLIENT_SECRET);
}

export function assertRuntimeEnv(keys: Array<keyof typeof serverEnv>) {
  const missing = keys.filter((key) => !serverEnv[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}
