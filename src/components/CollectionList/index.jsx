"use client";

import { useState, useRef, useEffect } from "react";
import { PiDotsThreeCircleVerticalFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const CollectionList = ({ api }) => {
  const [open, setOpen] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [animeId, setAnimeId] = useState(null); // State untuk menyimpan animeId yang akan dihapus
  const dropdownRefs = useRef([]);
  const router = useRouter();
  const openOption = (i) => {
    setOpen((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const removeListAnime = async (id) => {
    const data = { id };
    try {
      const response = await fetch("/api/v1/removeCollection", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        closeModal(); // Tutup modal setelah penghapusan berhasil
        router.refresh();
      }
    } catch (error) {
      console.error("Error removing anime:", error);
    }
  };
  const closeModal = () => {
    document.getElementById("my_modal_5").close();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Tambahkan pengecekan jika elemen yang diklik adalah modal
      const modal = document.getElementById("my_modal_5");
      if (modal && modal.contains(event.target)) {
        return; // Jangan tutup dropdown jika modal yang diklik
      }

      // Lanjutkan menutup dropdown jika modal tidak terpengaruh
      dropdownRefs.current.forEach((ref, index) => {
        if (ref && !ref.contains(event.target)) {
          setOpen((prev) => ({ ...prev, [index]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Komponen PopUp Modal
  const PopUp = () => {
    return (
      <dialog id="my_modal_5" className="modal modal-middle p-4 rounded m-auto">
        <div className="modal-box max-w-sm">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">Do you want to remove this anime from the collection?</p>
          <div className="modal-action flex gap-3">
            {/* Tombol konfirmasi penghapusan */}
            <button onClick={() => removeListAnime(animeId)}  data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    Yes, I'm sure
                </button>
                <button onClick={closeModal} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
          </div>
        </div>
      </dialog>
    );
  };

  return (
    <>
      {/* Modal pop-up */}
      <div className="fixed">
      <PopUp />
      </div>

      <div className="overflow-x-scroll shadow-sm flex w-full scroll-smooth">
        <div className="flex max-w-fit my-1 px-[1px] gap-2">
          {/* List koleksi anime */}
          {api.data?.map((data, i) => {
            const isOpen = open[i];
            return (
              <div key={i} className="relative max-w-[115px]">
                <div className="absolute z-10">
                  <button
                    onClick={() => {
                      openOption(i);
                      setAnimeId(data.id);
                    }}
                    title="option"
                    className="w-fit m-1 float-right"
                  >
                    <PiDotsThreeCircleVerticalFill className="text-main-secondary" size={"25px"} />
                  </button>
                  <div ref={(el) => (dropdownRefs.current[i] = el)}>
                    {isOpen && (
                      <div className="absolute mt-8 left-2 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul className="py-2 px-1 text-sm text-gray-700 dark:text-gray-200 font-semibold">
                          <li className="w-[80px]">
                            <Link href={`/anime/${data.anime_mal_id}`} className="block py-2 text-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                              Detail Anime
                            </Link>
                          </li>
                          <li>
                            <button
                              className="block py-2 hover:bg-gray-100"
                              onClick={() => {
                                document.getElementById("my_modal_5").showModal(); // Buka modal
                              }}
                            >
                              Remove Anime
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <Link href={`/anime/${data.anime_mal_id}`} className="max-h-[150px] h-[250px] w-[250px] md:max-h-[160px] max-w-[105px]  md:max-w-[115px] flex flex-wrap">
                  {/* Gambar anime */}
                  <Image priority="true" src={data.anime_image} alt="" className="max-h-[150px] max-w-[105px] md:max-w-[115px] md:max-h-[160px] brightness-[87%]  border-[1px] border-main-dark rounded-[7px]" width={200} height={150} />
                </Link>
                <h1 className="text-main-accent overflow-hidden overflow-ellipsis line-clamp-2">{data.anime_title}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CollectionList;
