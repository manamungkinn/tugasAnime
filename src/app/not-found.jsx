'use client'
import { TbFileSearch } from "react-icons/tb";
import Link from "next/link";
import { redirect,useRouter } from "next/navigation";

const NotFound = () => {
const router = useRouter()
    return (
    <div className="flex flex-col justify-center text-main-accent items-center h-[80vh] text-center">
      <div className=" inline-block">
        <div className="flex">
          <TbFileSearch size={33} className="flex" />
          <h1 className=" text-2xl static my-auto font-bold">Item Not Found</h1>
        </div>
        <Link href="https://www.instagram.com/gabrielhasahatan/" className="underline hover:text-main-accent text-blue-600 text-sm visited:text-red-800">
          report?
        </Link>
      </div>
        <button onClick={()=>router.back()} className="underline text-main-primary hover:text-main-accent mt-4">back</button>
    </div>
  );
};
export default NotFound;
