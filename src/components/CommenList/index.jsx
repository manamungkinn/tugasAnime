"use client";

import { PiDotsThreeOutlineFill } from "react-icons/pi";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { authUserSession } from "@/libs/auth-libs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Comment = ({ anime_mal_id, user_email, user_name, user_image, commenList }) => {
  // const [comment, setComment] = useState("");
  const [load, setLoad] = useState(false);
  const dates = new Date();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthName = monthNames[dates.getMonth()];
  const date = `${dates.getFullYear()}-${monthName}-${dates.getDate()}`;
  const [setting, setSetting] = useState([]);
  const commentRef = useRef();
  const router = useRouter();
  // console.log(comment)
  // const handleComment = (e) => {

  //   setComment(e.target.value);
  // };
  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleInput = async (e) => {
    e.preventDefault();
    if (!user_email) {
      router.push(`/api/auth/signin?callbackUrl=/anime/${anime_mal_id}`);
      return;
    }
    const comment = commentRef.current.value;
    if (!comment) return;
    setLoad(true);

    try {
      const data = { anime_mal_id, user_email, comment, user_name, user_image, date };
      const response =await fetch("/api/v1/comment", { method: "POST", body: JSON.stringify(data) });
    //   const dataComment = await response.json();
    console.log(response)

      await delay(100);
    } catch (error) {
      toast.error("something wrong!"+error);
    } finally {
      setLoad(false);
      router.refresh();
      commentRef.current.value = "";
    }
  };
  const openOption = (i) => {
    setSetting((prev) => {
      const newSetting = [...prev];
      newSetting[i] = !newSetting[i]; // Toggle dropdown untuk indeks i
      return newSetting;
    });
  };

  return (
    <div>
      {/* start form comment */}
      <div className="bg-main-comment p-4 rounded">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">{`Discussion (${commenList.data.length})`}</h2>
        </div>
        <form className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              // onChange={handleComment}
              ref={commentRef}
              rows="6"
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <div className="flex items-center">
            {!load && (
              <button
                // type="submit"
                onClick={handleInput}
                className="inline-flex bg-main-accent hover:bg-opacity-95 items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Post comment
              </button>
            )}
            {load && (
              <button
                className="inline-flex bg-main-accent hover:bg-opacity-95 items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                disabled={true}
                type="button"
              >
                <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  ></path>
                </svg>
                Loading...
              </button>
            )}
          </div>
        </form>
      </div>
      {/* end form comment */}

      {/* start comment list */}
      <div className="bg-main-comment rounded p-4 mt-2 flex flex-col gap-2">
        {commenList.data?.map((data, i) => {
          return (
            <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900" key={i}>
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm md:text-md text-gray-900 dark:text-white font-semibold">
                    <Image className="mr-2 w-6 h-6 rounded-full" src={data.user_image} width={250} height={250} alt="Michael Gough" />
                    {data.user_name}
                  </p>
                  <p className="text-xs text-gray-600  dark:text-gray-400">
                    <time dateTime="2022-02-08" title="February 8th, 2022">
                      {data.date}
                    </time>
                  </p>
                </div>
                <div className="relative">
                <button
                  onClick={() => {
                    openOption(i);
                  }}
                  id="dropdownComment1Button"
                  data-dropdown-toggle="dropdownComment1"
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  type="button"
                >
                  <PiDotsThreeOutlineFill />
                  <span className="sr-only">Comment settings</span>
                </button>
                {/* <!-- Dropdown menu --> */}
                {setting[i]&&(
                  <div id="dropdownComment1" className="absolute right-1 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Remove
                        </a>
                      </li>
                      <li>
                        <a href="https://www.instagram.com/gabrielhasahatan/" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Report
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
                {/* Dropdown menu end */}
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">{data.comment}</p>
            </article>
          );
        })}
      </div>
      {/* End comment list */}
    </div>
  );
};

export default Comment