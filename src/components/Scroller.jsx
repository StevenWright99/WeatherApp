import React, { useEffect, useRef } from 'react';

export default function Scroller({ items }) {
  const scrollerRef = useRef(null);
  const speed = 0.2;

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !scroller.children.length) return;

    const items = Array.from(scroller.children);
    const totalWidth = items.reduce((sum, item) => sum + item.offsetWidth, 0);
    scroller.style.width = `${totalWidth}px`;

    let animationFrame;
    let left = 0;

    const scroll = () => {
      const firstItem = scroller.children[0];
      const scrollWidth = firstItem.offsetWidth;

      left -= speed;
      scroller.style.transform = `translateX(${left}px)`;

      if (Math.abs(left) >= scrollWidth) {
        scroller.appendChild(firstItem);
        left += scrollWidth;
        scroller.style.transform = `translateX(${left}px)`;
      }

      animationFrame = requestAnimationFrame(scroll);
    };

    scroll();

    return () => cancelAnimationFrame(animationFrame);
  }, [items]);

  return (
    <div className="scrollerWrapper">
      <ul className="scroller" ref={scrollerRef}>
        {items.map((item, index) => (
          <li key={index}>
            <div style={{ fontSize: "14px", textAlign: "center" }}>{item.time}</div>
            <img
              src={`/src/assets/WeatherIcons/${item.icon}`}
              alt={item.time}
              style={{ width: "80px" }}
            />
            <div style={{ fontSize: "14px", textAlign: "center" }}>{item.temp}°F</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
