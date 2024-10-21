"use client";
import HeaderMenu from "@/components/HeaderMenu/HeaderMenu";
import { useEffect, useState } from "react";
import AnimeList from "@/components/AnimeList";
import Pagination from "@/components/Pagination/Pagination";
import { ApiAnime } from "../../libs/api-libs";
import { notFound } from "next/navigation";

const Page = () => {
  const [page, setPage] = useState(1);
  const [topAnime, setTopAnime] = useState([]); //setTop anime cara utk memasukin sesuatu ke variabel aslinya(topanime)
  // const [hasError, setHasError] = useState(false); // State untuk menandai jika terjadi error

  const fetchData = async () => {
    const data = await ApiAnime("/top/anime", `page=${page} && limit=24`);
    setTopAnime(data);
    // try {

    //   if (!data || !data.data || data.data.length === 0) {
    //     // Jika respons tidak valid atau data kosong
    //     setHasError(true);
    //   } else {
    //     setTopAnime(data);
    //   }
    // } catch (error) {
    //   console.error("API Error:", error);
    // }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  // if (hasError) {
  //   return <NotFound />; // Render komponen NotFound jika ada error
  // }

  return (
    <>
      <section>
        <HeaderMenu onPage={page} lastPage={topAnime.pagination?.last_visible_page}></HeaderMenu>
        <AnimeList api={topAnime} />
        <Pagination onPage={page} setPage={setPage} lastPage={topAnime.pagination?.last_visible_page} />
      </section>
    </>
  );
};

export default Page;
