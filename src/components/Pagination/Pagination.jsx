import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Pagination = ({ onPage, setPage,lastPage }) => {
const scrollTop=()=>{
    scroll({
        behavior:"smooth",
        top:0,
    })
}

  const pageNext = () => {
    onPage != lastPage 
    ?(setPage((i) => i + 1),scrollTop())
    :null
  };

  const pagePrev = () => {
    onPage !== 1
    ? (setPage((i) => i - 1), scrollTop()) 
    : null
  };
  
  const goTolastPage=()=>{
    setPage(lastPage)
  }
  return (
    <div className="justify-center w-full text-center mt-2 bg-main-primary container">

      <div className="items-center p-4 gap-12 text-center justify-center flex">
        <div className="flex gap-1 items-center">
          <h1 className="text-xs font-bold md:text-base">Prev</h1>
          <button onClick={pagePrev} className="bg-main-secondary rounded-md hover:bg-main-accent p-[10px]">
            {<FaArrowLeft size={25}/>}
          </button>
        </div>
        <div className="flex gap-1 items-center">
          <button onClick={pageNext} className="bg-main-secondary rounded-md hover:bg-main-accent p-[10px]">
            {<FaArrowRight size={25}/>}
          </button>
          <h1 className="text-xs font-bold md:text-base">Next</h1>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
