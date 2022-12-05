import "./App.css";

import React, { createRef, useRef, useState, useEffect } from "react";

var scrolling = false;

export default function App() {
  const scrollRefs = useRef([]);
  const navRefs = useRef([]);

  const [active, setActive] = useState(0);

  const list = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
  ];

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
    window.addEventListener("scroll", scrollHandler, true);
    return () => {
      window.removeEventListener("scroll", scrollHandler, true);
    };
  }, []);

  return (
    <div>
      <ul className="myMenu">
        {list.map((item, i) => (
          <li className="nav-item " key={i} ref={navRefs.current[i]}>
            <a
              href={`#s-${i}`}
              className={`nav-link listTop ${
                active === i ? "text-danger" : ""
              }`}
              onClick={(e) => {
                scrollTo(i);
              }}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <ul className="mb-100">
        {list.map((item, i) => (
          <li id={`s-${i}`} ref={scrollRefs.current[i]} className="py-100">
            <h3>{item}</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
              dicta.
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
