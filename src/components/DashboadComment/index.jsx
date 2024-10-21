import Image from "next/image";
import React from "react";
import Link from "next/link";

const DashboardComment = ({ data }) => {
  return (
    <div>
      <div className="overflow-x-scroll shadow-sm flex w-full scroll-smooth ">
        <div className=" flex gap-2 max-w-fit place-items-center my-1 px-[1px] ">
          {data.map((data) => {
            return (
              <div className="bg-white p-3 rounded-md h-fit w-[150px]">
                <p className="text-xs text-gray-600  dark:text-gray-400">
                  <time dateTime="2022-02-08" title="February 8th, 2022">
                    {data.date}
                  </time>
                </p>
                <p className="overflow-hidden overflow-ellipsis line-clamp-3">{data.comment}</p>
                <Link href={`/anime/${data.anime_mal_id}`} className="text-xs text-blue-600">See My Comment</Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardComment;
