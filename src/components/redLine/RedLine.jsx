import React, { useState, useEffect } from "react";

import "./redLine.scss";

const RedLine = () => {
  let [top, setTop] = useState(new Date().getMinutes());

  useEffect(() => {
    let interval = setInterval(() => {
      if (top < 59) {
        setTop(() => (top = new Date().getMinutes()));
      } else {
        setTop((top) => top + 1);
      }
    }, 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [top]);

  return <div className="red-line" style={{ top: `${top}px` }}></div>;
};

export default RedLine;
