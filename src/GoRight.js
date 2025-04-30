import React from 'react';

const GoRight = () => {
    const goRight = () => {
        fetch('/api/right')
            .then(res => res.json())
            .then(data => {
                console.log(data);
            });
    }

    return (
        <button onClick={goRight}>Go Right</button>
    );
};

export default GoRight;