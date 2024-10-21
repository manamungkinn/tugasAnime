import ButtonSignIn from "@/components/ButtonSignIn/ButtonSignIn";
import { authUserSession } from "@/libs/auth-libs";
import Image from "next/image";
import Link from "next/link";

const Dashboard = async () => {
  const user = await authUserSession();

  const UserLogin = () => {
    return (
      <div className="container p-4 mt-2">
        <div className="max-w-xl  mx-auto bg-white shadow shadow-main-primary rounded-lg overflow-hidden">
          <div className="m-2">
            <ButtonSignIn />
          </div>
          <div className="flex items-center justify-center p-6 flex-col">
            <Image className="w-32 h-32 rounded-full border-2 border-blue-500" src={user.image} alt="Profile" width={250} height={250} />
            <div className="flex gap-3 mt-3 text-sm">              
            <Link href={"dashboard/users"} className="bg-main-accent px-1 py-[2px] rounded-sm  bg-opacity-90 hover:bg-opacity-100">
              My Collection
            </Link>
            <Link href={"dashboard/users"} className="bg-main-accent px-1 py-[2px] rounded-sm bg-opacity-90 hover:bg-opacity-100">
              My  Collection
            </Link>
            </div>
          </div>
          <div className="p-6">
            <h1 className="text-center text-2xl font-semibold text-gray-800">{user.name}</h1>
            <p className="text-center text-xs text-gray-600">{user.email}</p>
            <p className="mt-4 text-center text-gray-700">Hi, {user.name}</p>
          </div>
        </div>
      </div>
    );
  };

  const UserNotLogin = () => {
    return (
      <div className="container p-2 mt-2">
        <div className="max-w-xl mx-auto h-[77svh] flex items-center justify-center flex-col bg-white shadow shadow-main-primary rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-center text-2xl font-semibold text-gray-800">You Not Login Yet</h1>
            <p className="text-center text-gray-600">Login Here 👇</p>
          </div>
          <div className="w-full items-center text-center flex justify-center m-2">
            <ButtonSignIn />
          </div>
        </div>
      </div>
    );
  };

  return user ? <UserLogin /> : <UserNotLogin />;
};

export default Dashboard;
