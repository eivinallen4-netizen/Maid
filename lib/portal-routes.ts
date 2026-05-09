export const portalRoutes = {
  home: "/",
  quote: "/quote",
  signin: "/signin",
  account: "/account",
};

export type Portal = keyof typeof portalRoutes;

export function getHomePathForRole(role?: string): string {
  return "/";
}

export function getNextPortal(current: Portal): Portal {
  const portals: Portal[] = ["home", "quote", "signin", "account"];
  const currentIndex = portals.indexOf(current);
  const nextIndex = (currentIndex + 1) % portals.length;
  return portals[nextIndex];
}

export function getPreviousPortal(current: Portal): Portal {
  const portals: Portal[] = ["home", "quote", "signin", "account"];
  const currentIndex = portals.indexOf(current);
  const previousIndex = (currentIndex - 1 + portals.length) % portals.length;
  return portals[previousIndex];
}

export function getPortalForPathname(pathname: string): Portal {
  if (pathname.includes("quote")) return "quote";
  if (pathname.includes("signin")) return "signin";
  if (pathname.includes("account")) return "account";
  return "home";
}

export function getPortalLabel(portal: Portal): string {
  const labels: Record<Portal, string> = {
    home: "Home",
    quote: "Quote",
    signin: "Sign In",
    account: "Account",
  };
  return labels[portal];
}

export type AppRole = "admin" | "rep" | "tech";
