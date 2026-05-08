export const portalRoutes = {
  home: "/",
  quote: "/quote",
  signin: "/signin",
  account: "/account",
};

export function getHomePathForRole(role?: string): string {
  return "/";
}
