"use client";
import { useOnKeyPress } from "@/hooks/useOnKeyPress";
import { FaSearch } from "react-icons/fa";
import "/src/app/globals.css";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const searchRef = useRef();
  const router = useRouter();

  const handleSearch = (e) => {
    const keySearch = searchRef.current.value;

    if (!keySearch || keySearch.trim() == "") return;

    if (e.key == "Enter" || e.type == "click") {
      e.preventDefault();
      router.push(`/search/${keySearch}`);
      searchRef.current.value = '';
    }
    // alert(searchRef.current.value)
  };
  //bisa pakai ini juga untuk keyHandler (bukan hanya enter)
  // useOnKeyPress(handleSearch,'Enter') //buat enterhandler nya melalui file terpisah

  return (
    <div className="px-2 lg:px-4 w-full">
          <div className="flex items-center max-w-md lg:mx-auto ml-auto">
            <input onKeyDown={handleSearch} ref={searchRef} type="text" placeholder="Search Here ..." className="text-main-accent w-full py-1 px-4 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-.5 focus:ring-main-accent focus:border-main-accent" />
            <button onClick={handleSearch} className="flex items-center px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200" aria-label="Search">
              <FaSearch className="text-gray-700" />
            </button>
      </div>
    </div>
  );
};

export default SearchBar;
