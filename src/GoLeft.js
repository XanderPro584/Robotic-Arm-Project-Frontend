import React from 'react';

const GoLeft = () => {
    const goLeft = () => {
        fetch('/api/left')
            .then(res => res.json())
            .then(data => {
                console.log(data);
            });
    }

    return (
        <button onClick={goLeft}>Go Left</button>
    );
};

export default GoLeft;