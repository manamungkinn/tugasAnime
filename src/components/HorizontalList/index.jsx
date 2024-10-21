"use client";
import Image from "next/image";
import "/src/app/globals.css";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { IoMdArrowDroprightCircle } from "react-icons/io";

const HorizontalList = ({ api }) => {
  // const [scrollPosition, setScrollPosition] = useState(0);

  const divRef = useRef();
  const leftButtonRef = useRef();
  const rightButtonRef = useRef();

  const updateButtonVisibility = () => {
    const maxScrollPosition = divRef.current.scrollWidth - divRef.current.clientWidth;

    if (divRef.current.scrollLeft <= 1) {
      leftButtonRef.current.style.display = "none"; // Sembunyikan tombol kiri
      divRef.current.scrollLeft = 0;
    } else {
      leftButtonRef.current.style.display = "block"; // Tampilkan tombol kiri
    }

    if (divRef.current.scrollLeft >= maxScrollPosition - 1) {
      rightButtonRef.current.style.display = "none"; // Sembunyikan tombol kanan
      divRef.current.scrollLeft = maxScrollPosition;
    } else {
      rightButtonRef.current.style.display = "block"; // Tampilkan tombol kanan
    }
  };

  const handleScroll = (scrollAmount) => {
    updateButtonVisibility();
    divRef.current.scrollLeft += scrollAmount;
  };

  useEffect(() => {
    // Perbarui visibilitas tombol saat pertama kali komponen dimuat
    updateButtonVisibility();
  }, []);
  return (
    <div className="relative">
      <div className="overflow-x-scroll shadow-sm flex w-full scroll-smooth " ref={divRef} onScroll={updateButtonVisibility}>
        <div className=" flex max-w-fit place-items-center my-1 px-[1px] ">
          {api.data.map((anime, i) => {
            return (
              <div className="rounded-[7px] group judulList overflow-hidden ease-out transition-all duration-300  justify-center items-center my-[5px] mx-[4px] w-full drop-shadow-lg" key={i}>
                <Link href={`/anime/${anime.mal_id}`} className="relative">
                  <Image
                    priority="true"
                    src={anime.images.webp.image_url}
                    alt=""
                    className="max-h-[150px] max-w-[105px] md:max-w-[115px] md:max-h-[160px] brightness-[87%]  border-[1px] border-main-dark rounded-[7px]"
                    width={200}
                    height={150}
                  />
                  <figcaption className="lg:group-hover:bottom-0  lg:bottom-[-100rem] text-wrap bottom-0 bg-opacity-50 absolute rounded-b-[7px] text-white w-full  text-center md:px-1 max-h-[70%] overflow-hidden overflow-ellipsis line-clamp-3  transition-all duration-300  bg-black text-sm md:text-md lg:text-lg ">
                    {anime.title}
                  </figcaption>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="hidden lg:block">
        <>
          <button
            ref={leftButtonRef}
            className="hidden bg-opacity-70 bg-main-primary border-y-[1px] border-r-[1px] absolute left-0 items-center rounded-r-3xl top-1/3"
            onClick={() => {
              handleScroll(-500);
            }}
          >
            {<IoMdArrowDropleftCircle size={65} className="text-main-accent drop-shadow-md" />}
          </button>
        </>
        <>
          <button
            ref={rightButtonRef}
            className="bg-opacity-70 bg-main-primary border-y[1px] border-l-[1px] absolute right-0 items-center rounded-l-3xl top-1/3"
            onClick={() => {
              handleScroll(500);
            }}
          >
            {<IoMdArrowDroprightCircle size={65} className="text-main-accent drop-shadow-md" />}
          </button>
        </>
      </div>
    </div>
  );
};

export default HorizontalList;
