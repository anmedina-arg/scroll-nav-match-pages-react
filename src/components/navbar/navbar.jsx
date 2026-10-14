import "./navbar.css";
export default function NavBar(props) {
  const { navRefs, active, scrollTo, index, item } = props;
  return (
    <li className="nav-item " ref={navRefs.current[index]}>
      <a
        href={`#s-${index}`}
        className={`nav-link listTop ${active === index ? "text-danger" : ""}`}
        onClick={() => {
          scrollTo(index);
        }}
      >
        {item}
      </a>
    </li>
  );
}
