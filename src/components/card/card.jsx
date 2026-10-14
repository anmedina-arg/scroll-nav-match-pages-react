import "./card.css";

export default function Card({ item, index, scrollRefs }) {
  return (
    <li id={`s-${index}`} ref={scrollRefs.current[index]} className="py-100">
      <h3>{item}</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, dicta.
      </p>
    </li>
  );
}
