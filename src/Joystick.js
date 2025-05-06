import React, { useState, useRef } from 'react';
import axios from 'axios';

function Joystick() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const sendPositionToServer = (x, y) => {
    axios.post('/joystick', { x, y })
      .then(response => console.log('Server response:', response.data))
      .catch(error => console.error('Error:', error));
  };

  const getRelativePosition = (clientX, clientY) => {
    const container = containerRef.current.getBoundingClientRect();
    const centerX = container.width / 2;
    const centerY = container.height / 2;

    const x = clientX - container.left - centerX;
    const y = clientY - container.top - centerY;

    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = centerX;

    let newX = x;
    let newY = y;

    if (distance > maxDistance) {
      const angle = Math.atan2(y, x);
      newX = Math.cos(angle) * maxDistance;
      newY = Math.sin(angle) * maxDistance;
    }

    return { x: newX, y: newY };
  };

  const handleStart = (clientX, clientY) => {
    isDragging.current = true;
    const newPos = getRelativePosition(clientX, clientY);
    setPosition(newPos);
    sendPositionToServer(newPos.x, newPos.y);
  };

  const handleMove = (clientX, clientY) => {
    if (!isDragging.current) return;
    const newPos = getRelativePosition(clientX, clientY);
    setPosition(newPos);
    sendPositionToServer(newPos.x, newPos.y);
  };

  const handleEnd = () => {
    isDragging.current = false;
    setPosition({ x: 0, y: 0 }); // Optional reset
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: 300,
        height: 300,
        backgroundColor: '#eee',
        borderRadius: '50%',
        position: 'relative',
        margin: '50px auto',
        touchAction: 'none', // Prevent default scroll/pinch behavior
        userSelect: 'none',
      }}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={(e) => {
        if (e.touches.length > 0) {
          handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }}
      onTouchEnd={handleEnd}
    >
      <div
        onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          if (e.touches.length > 0) {
            handleStart(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        style={{
          width: 50,
          height: 50,
          backgroundColor: '#333',
          borderRadius: '50%',
          position: 'absolute',
          top: `calc(50% + ${position.y}px - 25px)`,
          left: `calc(50% + ${position.x}px - 25px)`,
          cursor: 'grab',
          touchAction: 'none',
        }}
      />
    </div>
  );
}

export default Joystick;
