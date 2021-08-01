import React from "react";
import Link from "next/link";

import classNames from "classnames";

import { getValueAsNumber } from "../utils";

export default function Pagination({query, pathname, totalPages}) {
  const renderPagination = () => {
    let pages = [];
    const page = getValueAsNumber(query.page) || 1;

    if (totalPages > 1) {
      for (var number = 0; number < totalPages; number++) {
        pages.push(
          <li
            key={number}
            className={classNames("page-item", {
              active: number == page - 1,
            })}
          >
            <Link
              href={{
                pathname,
                query: { ...query, page: number + 1 },
              }}
              scroll={false}
            >
              <a className="page-link">{number + 1}</a>
            </Link>
          </li>
        );
      }
    }

    return pages;
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {renderPagination()}
      </ul>
    </nav>
  );
}
