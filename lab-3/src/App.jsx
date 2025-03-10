import { useState } from "react";

function Buttons({ count }) {
  const [counters, setCounters] = useState(Array(count).fill(0));
  const [lastClickedIndex, setLastClickedIndex] = useState(null);

  function handleClick(index) {
    setLastClickedIndex(index);

    setCounters([
      ...counters.slice(0, index),
      counters[index] + 1,
      ...counters.slice(index + 1),
    ]);
  }

  return (
    
    <div>
      {counters.map((counter, index) => {
        return <button
          style={index === lastClickedIndex ? {backgroundColor: "red"} : {}} 
          key={index}
          onClick={() => handleClick(index)}
        >
          {counter}
        </button>;
      })}
    </div>
  );
}

export default function App() {
  return <Buttons count={6}/>;
}
