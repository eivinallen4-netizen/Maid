// Database configuration for the admin-core system.
// Uses Turso (LibSQL) as the database backend.

export interface DatabaseConfig {
  url: string;
  authToken: string;
}

/**
 * Get database configuration from environment variables.
 */
export function getDatabaseConfig(): DatabaseConfig {
  const url =
    process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error(
      "Database URL not configured. Set TURSO_DATABASE_URL or DATABASE_URL in .env"
    );
  }

  if (!authToken) {
    throw new Error(
      "Database auth token not configured. Set TURSO_AUTH_TOKEN in .env"
    );
  }

  return { url, authToken };
}

/**
 * Check if database is configured.
 */
export function isDatabaseConfigured(): boolean {
  const url =
    process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  return Boolean(url && authToken);
}

/**
 * Database schema definition.
 * Tables created by admin-core:
 * - users: User accounts (admin, rep, tech)
 * - jobs: Service jobs created from quotes
 * - quotes: Customer quotes
 * - schedules: Rep/tech availability schedules
 * - contacts: Customer contacts
 * - transactions: Payment transactions
 * - bookings: Customer booking sessions
 * - reviews: Customer reviews
 * - app_config: Business configuration
 */
export const SCHEMA_TABLES = [
  "app_config",
  "users",
  "jobs",
  "transactions",
  "contacts",
  "schedules",
  "quotes",
  "bookings",
  "reviews",
];
