"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const DropDownProfile = ({ image, name, email }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };
  // Handle closing dropdown ketika di klik diluar element
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        //Kondisi ini mengecek apakah elemen yang diklik bukan bagian dari elemen
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="float-right relative" ref={dropdownRef}>
        <div onClick={handleToggle} className="py-1 px-3">
          <Image priority className=" rounded-full border-main-accent border-[1px] cursor-pointer w-[50px] h-[50px] " src={image} alt="Profile" width={100} height={100} />
        </div>

        <div className={`absolute right-1 transform transition-all duration-300 ease ${open ? "opacity-100" : "opacity-0  pointer-events-none"}`}>
          <div className="bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div>
                <h1 className="text-sm">{name}</h1>
              </div>
              <div className="font-medium truncate text-xs">{email}</div>
            </div>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 font-semibold" aria-labelledby="avatarButton">
              <li>
                <Link href="/" className=" block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Blm ada aowkwk
                </Link>
              </li>
            </ul>
            <div className="py-1">
              <Link href="/api/auth/signout" className="font-semibold block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Sign out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropDownProfile;
