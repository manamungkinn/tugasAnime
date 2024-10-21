import React from 'react';

const PaginationManual = ({ data, page, setPage, itemPerPage }) => {
  const total = data.length / itemPerPage;
  const totalPage = Math.ceil(total);

  // Function to get the page numbers to display
  const getPageNumbers = () => {
    const numbers = [...Array(totalPage).keys()].map(n => n + 1);
    let start = Math.max(page - 4, 1); // Start page is 4 pages before the current page
    let end = Math.min(start + 9, totalPage); // End page is 10 pages after the start page

    // Adjust if we are too close to the end
    if (end - start < 9) {
      start = Math.max(end - 9, 1);
    }

    // Ensure page 1 is always included
    if (start > 2) {
      return [1, '...', ...numbers.slice(start - 1, end)];
    }
    if (end < totalPage - 1) {
      return [...numbers.slice(start - 1, end), '...', totalPage];
    }

    return numbers.slice(start - 1, end);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      scrollTop();
    }
  };

  const nextPage = () => {
    if (page < totalPage) {
      setPage(page + 1);
      scrollTop();
    }
  };

  const scrollTop = () => {
    window.scroll({
      behavior: 'smooth',
      top: 0,
    });
  };

  const changePage = (id) => {
    if (page !== id) {
      setPage(id);
      scrollTop();
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="max-w-full">
      <ul className="flex text-sm lg:-space-x-px">
        {page !== 1 && (
          <li className="items-center justify-center">
            <button
              onClick={prevPage}
              className="flex items-center justify-center px-4 h-7 lg:h-10 ms-0 leading-tight text-main-accent bg-main-primary border border-main-accent rounded-s-lg hover:bg-gray-100"
            >
              Prev
            </button>
          </li>
        )}
        <div className="no-scrollbar overflow-x-scroll inline-flex -space-x-px">
          {pageNumbers.map((n, i) => (
            <li key={i} className="flex items-center justify-center">
              {n === '...' ? (
                <span className="flex items-center justify-center px-4 h-7 lg:h-10 leading-tight text-main-accent bg-white border border-main-accent">...</span>
              ) : (
                <button
                  onClick={() => changePage(n)}
                  className={`flex items-center justify-center px-4 h-7 lg:h-10 leading-tight ${
                    page === n
                      ? 'place-items-center text-blue-600 border border-main-accent bg-blue-100 hover:bg-blue-100 hover:text-blue-700'
                      : 'text-main-accent bg-main-primary border border-main-accent hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {n}
                </button>
              )}
            </li>
          ))}
        </div>
        {page !== totalPage && (
          <li className="items-center justify-center">
            <button
              onClick={nextPage}
              className="flex items-center justify-center px-4 h-7 lg:h-10 leading-tight text-main-accent bg-main-primary border border-main-accent rounded-e-lg hover:bg-gray-100"
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default PaginationManual;
