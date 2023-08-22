import React from "react";
import { usePagination, DOTS } from "./usePagination";
import { ButtonGroup } from "devextreme-react";
const Pagination = (props) => {
  const { onPageChange, siblingCount = 2, currentPage, pages } = props;
  console.log("currentPage", currentPage);
  console.log("pages", pages);
  const paginationRange = usePagination({
    currentPage,
    pages,
    siblingCount,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  let lastPage = paginationRange[paginationRange.length - 1];

  let buttonData = [
    {
      id: "back",
      icon: "back",
      disabled: currentPage === 1,
    },
  ];
  paginationRange.forEach((page) => {
    let pageData = {
      id: page,
      text: page,
      disabled: page === DOTS,
    };
    buttonData.push(pageData);
  });
  buttonData.push({
    id: "next",
    icon: "chevronnext",
    disabled: currentPage === lastPage,
  });
  console.log("buttonData", buttonData);
  return (
    <ButtonGroup
      items={buttonData}
      keyExpr="id"
      selectedItemKeys={[currentPage]}
      onSelectionChanged={onPageChange}
    />
  );
};

export default Pagination;
