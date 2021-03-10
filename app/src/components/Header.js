import React from "react";
// import rtLogo from '../media/rtcamp.png'
// import wpLogo from '../media/wordpress.png'

export default function Header() {
  return (
    <header className='header py-3' >
      <div className='container-xl d-flex justify-content-between'>
        {/* <img src={wpLogo} alt='wordpress logo' />
        <img src={rtLogo} alt='rtcamp logo' /> */}
        <h2>Calendar</h2>
        <h2>WordPress</h2>
      </div>
    </header>
  );
}
