import { TbExposurePlus1 } from "react-icons/tb";
import NotFound from "@/app/not-found";
import { notFound } from "next/navigation";

export const ApiAnime = async (resource, query) => {
  const respone = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${resource}?${query}`);
  const data = await respone.json();
  if (!data || !data.data) {
    return notFound
  }
  return data;
};

export const nestedApiAnime = async (resource, objectProperty) => {
  const respone = await ApiAnime(resource);
  if (!respone || !respone.data) {
    return notFound
  }
  return respone.data.flatMap((item) =>item[objectProperty]);
};

  
export const reproduce = (dataAnime,pageLimit)=>{
  const arrayApi = dataAnime.length - pageLimit
  let x = ~~((Math.random() * arrayApi)+1);
  let y = x + pageLimit;
  dataAnime= {data:dataAnime.slice(x,y)}
  return dataAnime
}