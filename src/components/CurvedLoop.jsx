import {
  useRef,
  useEffect,
  useState,
  useMemo,
  useId
} from "react";
import React from "react";

const CurvedLoop = ({
  marqueeText = "",
  highlightText = "",
  highlightClassName = "",
  speed = 2,
  className = "",
  curveAmount = 400,
  direction = "left",
  interactive = true,
}) => {
  const fullText = useMemo(() => marqueeText + "\u00A0", [marqueeText]);

  const measureRef = useRef(null);
  const textPathRef = useRef(null);
  const [spacing, setSpacing] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;

  // Positive curveAmount creates a downward curve
// This is the new, shorter line
const pathD = `M100,-100 Q720,${-100+ curveAmount} 1340,-100`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);

  const textLength = spacing;
  
  // Create an array of text parts to render with different colors
  const textParts = useMemo(() => {
    const parts = fullText.split(new RegExp(`(${highlightText})`, 'g')).filter(Boolean);
    const repeatedParts = Array(Math.ceil(1800 / (textLength || 1)) + 2).fill(parts).flat();
    return repeatedParts;
  }, [fullText, highlightText, textLength]);

  const ready = spacing > 0;

  useEffect(() => {
    if (measureRef.current) {
      setSpacing(measureRef.current.getComputedTextLength());
    }
  }, [fullText, className]);

  useEffect(() => {
    if (!spacing || !textPathRef.current) return;
    const initialOffset = dirRef.current === "right" ? 0 : -spacing;
    textPathRef.current.setAttribute("startOffset", `${initialOffset}px`);
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready) return;
    let frame;
    const animate = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === "right" ? speed : -speed;
        const currentOffset = parseFloat(textPathRef.current.getAttribute("startOffset") || "0");
        let newOffset = currentOffset + delta;

        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;

        textPathRef.current.setAttribute("startOffset", `${newOffset}px`);
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready]);

  const onPointerDown = (e) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    const currentOffset = parseFloat(textPathRef.current.getAttribute("startOffset") || "0");
    let newOffset = currentOffset + dx;
    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;
    textPathRef.current.setAttribute("startOffset", `${newOffset}px`);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    if (Math.abs(velRef.current) > 1) {
      dirRef.current = velRef.current > 0 ? "right" : "left";
    }
  };

  const cursorStyle = interactive ? (dragRef.current ? "grabbing" : "grab") : "default";

  return (
    <div
      className="w-full"
      style={{ visibility: ready ? "visible" : "hidden", cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg className="select-none w-full overflow-visible" viewBox="0 0 1440 120">
        <text ref={measureRef} x="-9999" y="-9999" className={className} style={{ visibility: "hidden" }}>
          {fullText}
        </text>
        <defs>
          <path id={pathId} d={pathD} fill="none" />
        </defs>
        {ready && (
          <text className={`fill-current ${className}`}>
            <textPath ref={textPathRef} href={`#${pathId}`}>
              {textParts.map((part, i) => (
                <tspan
                  key={i}
                  className={part === highlightText ? highlightClassName : ""}
                >
                  {part}
                </tspan>
              ))}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
