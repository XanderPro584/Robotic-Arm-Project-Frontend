import React from 'react';

function GoHome() {
    function goHome() {
        fetch('/api/home')
          .then(res => res.json())
          .then(data => {
            console.log(data);
            alert(data.status || data.error);
          });
        }
    
    return (
        <>
            <button onClick={goHome}>Go to Home</button>
        </>
    );
};

export default GoHome;