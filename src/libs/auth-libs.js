import { getServerSession } from "next-auth";
import { session } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
export const authUserSession = async () => {
  const user = await getServerSession(session);
  // if (!session || !session.user) {
  //     notFound()
  // }

  return user?.user;
};
