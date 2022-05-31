import React from "react";
import SortSelector from "./SortSelector";
import Button from "@mui/material/Button";

const PageControl = ({ currentPage, totalPage, onChange, onClick }) => {
  const pageDisplay = `${currentPage}/${totalPage}`;
  return (
    <div className="pageControlBar">
      <div style={{ visibility: "hidden" }} id="emptyPadding">
        Padding
      </div>
      <div id="pageControl">
        <Button variant="outlined" id="prevBtn" onClick={onClick}>
          Prev
        </Button>
        <label id="pageNumber">{pageDisplay}</label>
        <Button variant="outlined" id="nextBtn" onClick={onClick}>
          Next
        </Button>
      </div>
      <div>
        <SortSelector onChange={onChange} />
      </div>
    </div>
  );
};

export default PageControl;
