import Image from "next/image";
import { ApiAnime, nestedApiAnime } from "@/libs/api-libs";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import HorizontalList from "@/components/HorizontalList";
import ButtonCollection from "@/components/ButtonCollection";
import { authUserSession } from "@/libs/auth-libs";
import prisma from "@/libs/prisma";
import { Toaster } from "sonner";
import Comment from "@/components/CommenList";

const Page = async ({ params: { id } }) => {
  //kalo id saja gk kebaca jadi harus bikin param(sesuai dari reactnya keknya)
  const { data } = await ApiAnime(`/anime/${id}`); //biar langsung tembus ke data
  const user = await authUserSession();
  let recommendations = await nestedApiAnime(`/anime/${id}/recommendations`, "entry");
  recommendations = { data: recommendations };
  const collection = await prisma.collection.findFirst({
    where: {
      user_email: user?.email,
      anime_mal_id: id,
    },
  });

  let comment = await prisma.comment.findMany({
    where: {
      anime_mal_id: id,
    },
  });

  comment = {data:comment}

  // let x = ~~(Math.random() * recommendations.length - 24 + 1);
  // let y = x + 24;
  // let sliceRecommendation = recommendations.slice(x, y);
  // sliceRecommendation = { data: sliceRecommendation };

  return (
    <>
      <div className="container items-center">
        <div className=" lg:mx-28 bg-main-secondary  mt-2 py-1">
          <div className="px-4 text-center md:text-start">
            <h1 className="text-main-dark text-lg font-semibold">{data?.title}</h1>
          </div>
          <div className="mx-1 p-3">
            <div className="md:flex">
              <div className="flex flex-col items-center justify-center">
                <div className="md:mb-2 md:mr-2 w-fit">
                  <div className=" border-[1px] w-fit border-main-dark">
                    <Image src={data?.images.webp.image_url} alt={data?.images.jpg.image_url} width={250} height={200} className="max-h-[200px] max-w-[150px] border-[1px] border-white" />
                  </div>
                </div>
              </div>
              <div className="text-main-dark text-sm">
                <p className=" font-semibold">
                  Title : {""}
                  <span>
                    {data?.title} - {data?.year}
                  </span>
                </p>
                <p className=" font-semibold">
                  Score : {""}
                  <span>{data?.score}</span>
                </p>
                <>
                  <p className=" font-semibold overflow-hidden whitespace-pre-line overflow-ellipsis">
                    Produser :{" "}
                    {data?.producers.slice(0, 3).map((datas, i) => {
                      return (
                        <span key={i}>
                          {datas.name}
                          {i < data?.producers.length - 1 && ", "}
                        </span>
                      );
                    })}
                    {data?.producers.length > 3 && "etc."}
                  </p>
                </>
                <p className=" font-semibold">
                  Status : {""}
                  <span>{data?.status}</span>
                </p>
                <p className=" font-semibold">
                  Total Episode : {""}
                  <span>{data?.episodes}</span>
                </p>
                <p className=" font-semibold">
                  Duration : {""}
                  <span>{data?.duration}</span>
                </p>
                <p className=" font-semibold">
                  Rating : {""}
                  <span>{data?.rating}</span>
                </p>
                <p className=" font-semibold">
                  Score : {""}
                  <span>{data?.score}</span>
                </p>
              </div>
            </div>
            <div></div>
            <p className="text-main-dark text-sm font-semibold">
              Syinopsis : <span className="font-normal text-sm">{data?.synopsis}</span>
            </p>
            <div className="flex gap-2 justify-evenly md:justify-start items-center mt-1 mb-4">
              <ButtonCollection collection={collection} anime_mal_id={id} user_email={user?.email} anime_image={data?.images.webp.image_url} anime_title={data?.title}/>
              <Toaster richColors />
            </div>
            <div className="mt-4">
              <VideoPlayer youtubeId={data?.trailer.youtube_id} />
            </div>
          </div>
          <div>
            <Comment anime_mal_id={id} commenList={comment} user_email={user?.email} user_image={user?.image} user_name={user?.name}/>
          </div>
          <div>
            <HorizontalList api={recommendations} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
