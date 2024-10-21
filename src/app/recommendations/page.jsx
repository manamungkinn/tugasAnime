"use client";

import { useEffect, useState } from "react";
import { nestedApiAnime } from "@/libs/api-libs";
import AnimeList from "@/components/AnimeList";
import PaginationManual from "@/components/PaginationManual/PaginationManual";
import HeaderMenu from "@/components/HeaderMenu/HeaderMenu";

const Page = () => {
  const [page, setPage] = useState(1);
  const itemPerPage = 24;
  const lastIndex = page * itemPerPage;
  const firstIndex = lastIndex - itemPerPage;
  const [dataRekom, setDataRekom] = useState([]);
  const [dataPagination, setDataPagination] = useState([]);

  const fetchData = async () => {
    const recommendations = await nestedApiAnime("/recommendations/anime", "entry");
    setDataPagination(recommendations);
    const sliceRecommendation = recommendations.slice(firstIndex, lastIndex);
    setDataRekom({ data: sliceRecommendation });
  };

  // const getDataRekom =(page,itemPerPage)=>{
  //   return dataRekom;
  // }

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      <section className="container">
        <AnimeList api={dataRekom} />
        <div className="flex items-center justify-center p-3">
          <PaginationManual data={dataPagination} page={page} setPage={setPage} itemPerPage={itemPerPage} lastIndex={lastIndex} firstIndex={firstIndex} />
        </div>
      </section>
    </>
  );
};
///belum siap rencana mau buat pagination
export default Page;
