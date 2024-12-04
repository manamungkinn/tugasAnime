import Image from "next/image";
import HorizontalList from "@/components/HorizontalList";
import "./globals.css";
import Header from "@/components/Header";
import AnimeList from "@/components/AnimeList";
import { ApiAnime, nestedApiAnime, reproduce } from "../libs/api-libs";

const Page = async () => {

  const topAnime = await ApiAnime("/top/anime"); //apiAnime

  let recommendations = await nestedApiAnime("/recommendations/anime", "entry");
  recommendations = reproduce(recommendations, 16);
  // console.log(recommendations)

  return (
    <>
      {/* Paling Populer */}
      <section className="container py-4">
        <div className=" text-main-primary">
        <Header title="Most Popular" linkHref="/populer" linkTitle="See all populer" />
        </div>
        <div className="bg-main-accent">
          <HorizontalList api={topAnime} />
        </div>
      </section>
      {/* End Paling Populer */}

      {/* Anime Baru */}
      <section className="mt-[10px] container">
        <div className="text-main-primary">
        <Header title="Recommended Anime" linkHref="/recommendations" linkTitle="See all" />
        </div>
        {/* <>

    <HorizontalList></HorizontalList>
          </> */}
        <AnimeList api={recommendations} />
      </section>
      {/* End Anime Baru */}
    </>
  );
};

export default Page;
