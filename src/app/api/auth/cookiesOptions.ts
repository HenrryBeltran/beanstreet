type CookiesOptions = {
  path: string;
  httpOnly: boolean;
  domain?: string;
  secure: boolean;
  maxAge?: number;
};

export const cookiesOptions: CookiesOptions = {
  path: "/",
  httpOnly: true,
  domain: process.env.DOMAIN,
  secure: process.env.NODE_ENVIRONMENT === "production",
  maxAge: 1000 * 60 * 60 * 24 * 92,
};
