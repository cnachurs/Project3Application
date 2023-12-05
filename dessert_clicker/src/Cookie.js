import React, { useState } from 'react';
import cookieImage from './cookie.png'; // Import your cookie image

const Cookie = () => {
  const [cookies, setCookies] = useState(0);

  const handleClick = () => {
    setCookies(cookies + 1);
  };

  return (
    <div className="Cookie">
      <img src={cookieImage} alt="Cookie" onClick={handleClick} />
      <p>{cookies} cookies</p>
    </div>
  );
};

export default Cookie;
