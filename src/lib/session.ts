import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function requireSession(next: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/signin?next=${encodeURIComponent(next)}&reason=protected`);
  return session;
}
