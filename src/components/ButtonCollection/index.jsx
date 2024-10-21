"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from 'sonner';

const ButtonCollection = ({ collection, anime_mal_id, user_email,anime_image,anime_title }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isCreated, setIsCreated] = useState(false);
  const [btnDisable, setBtnDisable] = useState(collection); //buat nyari default nya kalo ada di collection maka true(makasih chat gpt)
  const [btnTitle, setBtnTitle] = useState(
    !collection ? "Add To Collection" : "Already In Collection"
  );


  // buat delay
  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handle = async (e) => {
    e.preventDefault();

    if (!user_email) {
      router.push(`/api/auth/signin?callbackUrl=/anime/${anime_mal_id}`);
      return;
    }

    setIsLoading(true);
    try {
      setIsCreated(false);
      const data = { anime_mal_id, user_email,anime_image,anime_title };
      if (!data) return;
      const response = await fetch("/api/v1/collection", { method: "POST", body: JSON.stringify(data) });
      const collection = await response.json();
      console.log({ collection });
      if (collection.isCreated) {
        setIsCreated(true);
      }
      await delay(50);
      setIsLoading(false); // Reset loading state setelah request selesai
    } catch (error) {
      console.log({ error: error.message });
    } finally {
      toast.success("Added To Collecction")
      setBtnDisable(true); // Disable button after successful addition
      setBtnTitle("Already In Collection"); // Update button title
    }
  };


  const Button = () => {
    return (
      <div className="mt-2 text-center">
        {isCreated ? (
          <div className="px-4 py-2 mb-1 text-xs text-main-accent rounded-lg bg-main-primary" role="alert">
            <p>
              <span className="font-medium">Succes ! </span>
              Anime Successfully Added
            </p>
          </div>
        ) : null}
        <button
          onClick={handle}
          disabled={btnDisable}
          className={`px-3  py-[5px] rounded-[1px] ${btnDisable ? `bg-gray-400 text-white text-sm text-wrap` : "text-sm text-wrap text-main-accent transition-all ease-in-out  bg-main-dark  hover:bg-main-accent hover:text-main-dark"}`}
        >
          {btnTitle}
        </button>
      </div>
    );
  };

  const ButtonLoading = () => {
    return (
      <div className="mt-2">
        <button disabled type="button" className=" bg-main-dark px-3 text-sm text-wrap py-[5px] rounded-[1px] hover:bg-main-accent hover:text-main-dark text-main-accent">
          <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"
            />
          </svg>
          Loading...
        </button>
      </div>
    );
  };

  return isLoading ? <ButtonLoading /> : <Button />;
};

export default ButtonCollection;
