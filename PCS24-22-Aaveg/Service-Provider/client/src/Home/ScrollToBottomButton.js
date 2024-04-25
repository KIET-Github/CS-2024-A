import { useRef } from "react";

function ScrollToBottomButton() {
  const bottomRef = useRef(null);

  const handleClick = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  return (
    <div>
      <button onClick={handleClick}>Go to Bottom</button>
      <div style={{ height: "1000px" }}>Some content on the page</div>
      <div ref={bottomRef}></div>
    </div>
  );
}

export default ScrollToBottomButton;
