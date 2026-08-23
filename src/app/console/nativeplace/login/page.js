import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isAdminAuthenticatedFromCookies } from "../../../lib/admin-auth.js";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Admin Login | The Native Place",
  description: "Admin sign in for The Native Place console.",
};

export default async function AdminLoginPage({ searchParams }) {
  const cookieStore = await cookies();
  const resolvedSearchParams = await searchParams;

  if (isAdminAuthenticatedFromCookies(cookieStore)) {
    redirect("/console/nativeplace");
  }

  const nextPath =
    typeof resolvedSearchParams?.next === "string" &&
      resolvedSearchParams.next.startsWith("/console/nativeplace")
      ? resolvedSearchParams.next
      : "/console/nativeplace";

  return <LoginForm nextPath={nextPath} />;
}
