import React, { useState, useEffect } from 'react';

const Coordinates = () => {
    const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('/api/position')
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setPosition(data);
                })
                .catch(err => console.error('Failed to fetch position', err));
                }, 1000); // Fetch every second

        return () => clearInterval(interval); // Cleanup on unmount
}, []);


    return (
        <>
            <h3>Current Position</h3>
            <p>X: {position.x}</p>
            <p>Y: {position.y}</p>
            <p>Z: {position.z}</p>
        </>    
    );
};

export default Coordinates;