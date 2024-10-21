import Image from "next/image";
import "/src/app/globals.css";
import Link from "next/link";
import NotFound from "@/app/not-found";
import { notFound } from "next/navigation";

const AnimeList = ({ api }) => {
  return (
    <>
      <div className="grid grid-cols-2 place-items-center sm:grid-cols-4 container py-3 lg:grid-cols-6 gap-5 ">
        {api.data?.map((anime, i) => {
          return (
            <div className="flex max-w-fit place-items-center my-1 px-2" key={i}>
              <div className="rounded-[7px] group judulList overflow-hidden ease-out transition-all duration-300  justify-center items-center my-[5px] mx-[4px] w-full drop-shadow-lg" >
                <Link href={`/anime/${anime.mal_id}`} className="relative">
                  <Image
                    priority="true"
                    src={anime.images.webp.image_url}
                    alt=""
                    className="max-h-[150px] max-w-[105px] md:max-w-[115px] md:max-h-[160px] brightness-[87%]  border-[1px] border-main-dark rounded-[7px]"
                    width={200}
                    height={150}
                  />
                  <figcaption className="lg:group-hover:bottom-0 lg:bottom-[-100rem] text-wrap bottom-0 bg-opacity-50 absolute rounded-b-[7px] text-white w-full text-center max-h-[70%] overflow-hidden overflow-ellipsis line-clamp-3 transition-all duration-300  bg-black text-sm md:text-base">
                    {anime.title}
                  </figcaption>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AnimeList;
