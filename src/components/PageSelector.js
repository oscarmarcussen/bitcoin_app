import React from "react";
import "./PageSelector.css";

export const PageSelector = ({
  entriesPerPage,
  totalEntries,
  changePage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalEntries / entriesPerPage); i++) {
    pageNumbers.push(i);
  }

  const checkPage = (pageNum) => {
    if (currentPage !== pageNum) {
      if (pageNum === 1) changePage(currentPage - 1);
      else if (pageNum === pageNumbers.length) changePage(currentPage + 1);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <a onClick={() => checkPage(1)} href="!#" className="page-link">
            &#8592;
          </a>
        </li>
        {pageNumbers.map((num) => (
          <li key={num} className="page-item">
            <a onClick={() => changePage(num)} href="!#" className="page-link">
              {num}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            onClick={() => checkPage(pageNumbers.length)}
            href="!#"
            className="page-link"
          >
            &#8594;
          </a>
        </li>
      </ul>
    </nav>
  );
};
