import React from 'react';

const GoRight = () => {
    const goRight = () => {
        fetch('/api/left')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert(data.status || data.error);
            });
    }

    return (
        <button onClick={goRight}>Go Right</button>
    );
};

export default GoRight;