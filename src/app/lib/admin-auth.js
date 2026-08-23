export const COOKIE_NAME = "nativeplace_admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 8;

const toBase64Url = (value) => {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(String(value), "utf8").toString("base64url");
  }

  const bytes = new TextEncoder().encode(String(value));
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
};

export const getAdminCredentials = () => ({
  username: String(process.env.Admin_username || "").trim(),
  password: String(process.env.Admin_password || "").trim(),
});

export const createAdminSessionToken = (username, password) => {
  const resolvedUsername = String(username ?? process.env.Admin_username ?? "").trim();
  const resolvedPassword = String(password ?? process.env.Admin_password ?? "").trim();

  if (!resolvedUsername || !resolvedPassword) {
    return null;
  }

  return toBase64Url(`${resolvedUsername}:${resolvedPassword}`);
};

export const isAdminSessionValid = (token) => {
  const expectedToken = createAdminSessionToken();

  return Boolean(expectedToken && token === expectedToken);
};

export const isAdminAuthenticatedFromCookies = (cookieStore) => {
  if (!cookieStore?.get) {
    return false;
  }

  return isAdminSessionValid(cookieStore.get(COOKIE_NAME)?.value);
};

export const getAdminSessionCookieOptions = () => ({
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_MAX_AGE,
});
