"use client";

import Link from "next/link";
import SearchBar from "../SearchBar/SearchBar";
import ButtonSignIn from "../ButtonSignIn/ButtonSignIn";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname();
  const home = "/";
  const dashboard = "/dashboard";

  return (
    <header className="w-full container h-full">
      <div className=" bg-main-primary">
        <div className="px-6 justify-center items-center lg:justify-start flex md:flex-row flex-col item-center">
          <Link href="/" className="py-[22px] text-2xl font-bold text-main-accent">
            GabNime
          </Link>
        </div>
      </div>
      <nav>
        <div className="lg:flex lg:relative px-3 items-center">
          <ul className=" grid grid-cols-2 lg:flex h-fit">
            <li className={`hover:bg-main-accent transition-all duration-300 ease-in-out ${pathname === home ? "bg-main-accent" : ""}`}>
              <a href={home} className=" px-5 text-ml text-main-primary font-semibold block py-3 ">
                Home
              </a>
            </li>
            <li className={`hover:bg-main-accent transition-all duration-300 ease-in-out ${pathname === dashboard ? "bg-main-accent" : ""}`}>
              <a href={dashboard} className=" px-5 text-ml text-main-primary font-semibold block py-3">
                Dashboard
              </a>
            </li>
          </ul>
          <div className="lg:right-2 lg:absolute right-3 py-3">{<SearchBar />}</div>
        </div>
        <hr className="border-main-accent border-[3px]" />
      </nav>
    </header>
  );
};

export default Navbar;
