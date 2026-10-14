import "./App.css";

import React, { createRef, useRef, useState, useEffect } from "react";
import NavBar from "./components/navbar/navbar";
import Card from "./components/card/card";

import { list } from "./mock/mock";

var scrolling = false;

export default function App() {
  const [active, setActive] = useState(0);

  const scrollRefs = useRef([]);
  const navRefs = useRef([]);

  scrollRefs.current = [...Array(list.length).keys()].map(
    (_, i) => scrollRefs.current[i] ?? createRef()
  );

  navRefs.current = [...Array(list.length).keys()].map(
    (_, i) => navRefs.current[i] ?? createRef()
  );

  const scrollTo = (index) => {
    console.log("setting scrolling" + scrolling);

    scrolling = true;

    scrollRefs.current[index].current.scrollIntoView({ behavior: "smooth" });

    setActive(index);

    setTimeout(() => {
      scrolling = false;
      navRefs.current[index].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }, 1000);
  };

  const scrollHandler = (e) => {
    if (e.target !== document) return;

    if (scrolling === true) return;

    const scrollRefsElements = scrollRefs.current;

    scrollRefsElements.forEach((el, i) => {
      const rect = el.current.getBoundingClientRect();
      const elemTop = rect.top;
      const elemBottom = rect.bottom;
      const isVisible =
        elemTop < window.innerHeight / 2 && elemBottom > window.innerHeight / 2;

      if (isVisible) {
        navRefs.current[i].current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "center",
        });
        setActive(i);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div className="container">
      <ul className="myMenu">
        {list.map((item, i) => (
          <NavBar
            key={i}
            item={item}
            index={i}
            navRefs={navRefs}
            active={active}
            scrollTo={scrollTo}
          />
        ))}
      </ul>

      <ul className="mb-100">
        {list.map((item, i) => (
          <Card key={i} item={item} index={i} scrollRefs={scrollRefs} />
        ))}
      </ul>
    </div>
  );
}
