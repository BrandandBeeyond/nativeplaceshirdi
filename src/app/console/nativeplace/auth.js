import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isAdminAuthenticatedFromCookies } from "../../lib/admin-auth.js";

export async function requireAdminSession(nextPath = "/console/nativeplace") {
  const cookieStore = await cookies();

  if (!isAdminAuthenticatedFromCookies(cookieStore)) {
    redirect(`/console/nativeplace/login?next=${nextPath}`);
  }
}
