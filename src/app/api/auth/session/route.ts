import { Try } from "@/utils/safeTry";
import { cookies } from "next/headers";
import { authenticate } from "../authenticate";
import { cookiesOptions } from "../cookiesOptions";

export async function GET() {
  const cookieStore = cookies();
  const sid = cookieStore.get("sid")?.value;

  const { error: authError, result: authResult } = await Try(authenticate({ sid }));

  if (authError) {
    return new Response(JSON.stringify(authError), { status: 500 });
  }

  if (!authResult.foundUserSession) {
    const clearCookieOption = cookiesOptions;
    delete clearCookieOption.maxAge;

    cookieStore.delete("sid");

    return Response.json(
      { message: authResult.message, error: authResult.error },
      { status: authResult.status },
    );
  }

  const { name, email, role } = authResult.foundUserSession;

  return Response.json({
    user: { name, email, role },
    message: "Found user session",
  });
}
