import React, { useState, useRef } from 'react';
import axios from 'axios';

function Joystick() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const joystickRef = useRef(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    // Optionally, reset joystick position here
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const centerX = container.width / 2;
    const centerY = container.height / 2;

    const x = e.clientX - container.left - centerX;
    const y = e.clientY - container.top - centerY;

    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = centerX; // limit movement within container

    let newX = x;
    let newY = y;

    if (distance > maxDistance) {
      const angle = Math.atan2(y, x);
      newX = Math.cos(angle) * maxDistance;
      newY = Math.sin(angle) * maxDistance;
    }

    setPosition({ x: newX, y: newY });

    // Send position to Flask
    sendPositionToServer(newX, newY);
  };

  const sendPositionToServer = (x, y) => {
    axios.post('/joystick', { x, y })
      .then(response => {
        console.log('Server response:', response.data);
      })
      .catch(error => {
        console.error('Error sending position:', error);
      });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        width: 300,
        height: 300,
        backgroundColor: '#eee',
        borderRadius: '50%',
        position: 'relative',
        margin: '50px auto',
        userSelect: 'none',
      }}
    >
      <div
        ref={joystickRef}
        onMouseDown={handleMouseDown}
        style={{
          width: 50,
          height: 50,
          backgroundColor: '#333',
          borderRadius: '50%',
          position: 'absolute',
          top: `calc(50% + ${position.y}px - 25px)`,
          left: `calc(50% + ${position.x}px - 25px)`,
          cursor: 'grab',
        }}
      />
    </div>
  );
}

export default Joystick;
