// Authentication configuration for the admin-core system.

export type AppAuthRole = "admin" | "rep" | "tech";

export interface AuthConfig {
  sessionTtlMs: number;
  sessionTtlSeconds: number;
  sessionCookieName: string;
  roleOverrideCookieName: string;
  secret: string;
}

/**
 * Get authentication configuration.
 */
export function getAuthConfig(): Omit<AuthConfig, "secret"> {
  return {
    sessionTtlMs: 1000 * 60 * 60 * 3, // 3 hours
    sessionTtlSeconds: 60 * 60 * 3,
    sessionCookieName: "pb_session",
    roleOverrideCookieName: "pb_role_override",
  };
}

/**
 * Get the auth secret from environment.
 * Must be set in .env for production.
 */
export function getAuthSecret(): string {
  return process.env.AUTH_SECRET ?? "";
}

/**
 * Role-based route permissions.
 */
export const rolePermissions: Record<AppAuthRole, string[]> = {
  admin: [
    "/admin",
    "/admin/leads",
    "/admin/schedule",
    "/account",
    "/quote",
    "/portal-quote",
  ],
  rep: ["/account", "/quote", "/portal-quote"],
  tech: ["/account"],
};

/**
 * Check if a role has permission to access a route.
 */
export function hasRoutePermission(role: AppAuthRole, route: string): boolean {
  const allowedRoutes = rolePermissions[role];
  return allowedRoutes.some((r) => route.startsWith(r));
}
