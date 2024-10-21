import Link from "next/link";
import { authUserSession } from "@/libs/auth-libs";

const ButtonSignIn = async () => {
  const user = await authUserSession();
  const buttonTitle = !user ? "Sign In" : "Sign Out";
  const buttonHref = !user ? "/api/auth/signin" : "/api/auth/signout";

  return (
    <div className="w-fit items-center text-center">
      <Link href={buttonHref}>
        <h1 className="text-base text-main-accent py-1 px-3 rounded-md bg-main-dark hover:bg-opacity-90">{buttonTitle}</h1>
      </Link>
    </div>
  );
};

export default ButtonSignIn;
