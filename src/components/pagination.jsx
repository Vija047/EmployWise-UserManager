import React from "react";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={(e) => {
            e.preventDefault(); // Prevent unintended multiple calls
            paginate(number);
          }}
          className={`px-3 py-1 mx-1 border rounded-lg ${
            currentPage === number
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
