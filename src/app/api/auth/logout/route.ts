import { db } from "@/drizzle";
import { Try } from "@/utils/safeTry";
import { cookies } from "next/headers";
import { authenticate } from "../authenticate";
import { cookiesOptions } from "../cookiesOptions";

export async function GET() {
  const cookieStore = cookies();
  const sid = cookieStore.get("sid");

  const { error: authError, result: authResult } = await Try(
    authenticate({ sid: sid?.value }),
  );

  if (authError) {
    return new Response(JSON.stringify(authError), { status: 500 });
  }

  if (!authResult.foundUserSession) {
    return Response.json(
      { message: authResult.message, error: authResult.error },
      { status: authResult.status },
    );
  }

  const { error: updateError } = await Try(
    db
      .updateTable("user")
      .set({ session: null })
      .where("user.id", "=", authResult.foundUserSession.id)
      .execute(),
  );

  if (updateError) {
    return Response.json(
      {
        message: "Database Error: Failed to update user session",
        error: updateError,
      },
      { status: 500 },
    );
  }

  const clearCookieOption = cookiesOptions;
  delete clearCookieOption.maxAge;

  cookieStore.delete("sid");

  return Response.json({ message: "Successfully logout" });
}
