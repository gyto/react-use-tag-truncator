import * as React from "react";
import { useTagTruncator } from "../hooks/useTagTruncator";
import "./List.css";

const List = (
  {
    itemCount,
  },
) => {
  const [
    containerRef,
    isExtended,
    toggleExtend,
    hiddenCount,
  ] = useTagTruncator([ itemCount ]);

  return (
    <ul
      className="list"
      ref={containerRef}
      style={{
        maxHeight: isExtended ? "none" : "65px",
        width: "350px",
        display: "flex",
        flexWrap: "wrap",
        listStyle: "none",
      }}
    >
      {Array.from({ length: itemCount }).map((_, index) => (
        <li key={index} className="item">item #{index + 1}</li>
      ))}
      <li onClick={toggleExtend} className="item moreBtn">
        {isExtended ? "Hide" : `+ ${hiddenCount} more...`}
      </li>
    </ul>
  );
};

export default List;
