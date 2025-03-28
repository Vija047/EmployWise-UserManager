import React, { useState } from "react";

const Pagination = ({ totalPages = 5, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (onPageChange) onPageChange(page);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 border rounded-md disabled:opacity-50"
      >
        ❮
      </button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-4 py-2 border rounded-md ${
              currentPage === page ? "bg-blue-600 text-white font-bold" : "hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border rounded-md disabled:opacity-50"
      >
        ❯
      </button>
    </div>
  );
};

export default Pagination;
