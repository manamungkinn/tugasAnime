import AnimeList from "@/components/AnimeList";
import Header from "@/components/Header";
import { ApiAnime } from "@/libs/api-libs";
import { notFound } from "next/navigation";
import Link from "next/link";

const Page = async ({ params }) => {
  const { keyword } = params;
  const decodedKeyword = decodeURI(keyword);
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URl}/anime?q=${decodedKeyword}`);
  const searchAnime = await ApiAnime("/anime", `q=${decodedKeyword}`);
  return (
    <>
      <section className="container relative">
        <div className="absolute top-4 right-4">
          <Link href="https://www.instagram.com/gabrielhasahatan/" className="underline hover:text-main-accent text-blue-600 text-sm visited:text-red-800">
            report
          </Link>
        </div>
        <div className="text-main-primary">
          <Header title={`Hasil untuk : ${decodedKeyword}`} />
        </div>
        {searchAnime.pagination.items.count != 0 ? (
          <div className="bg-main-dark">
            <AnimeList api={searchAnime} />
          </div>
        ) : (
          notFound()
        )}
      </section>
    </>
  );
};

export default Page;
