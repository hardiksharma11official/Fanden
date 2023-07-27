import React from 'react';

const Pane = ({ title, subtitle, isActive, onClick, onClickDefault }) => {
  const activeClass = isActive ? 'active' : '';
  const isSmallScreen = window.innerWidth <= 800;

  const paneStyles = isActive
    ? {
      backgroundImage: `url(https://source.unsplash.com/featured/?${title})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: isSmallScreen ? '200%' : '100%', // Increase height for small screens
      width: isSmallScreen ? '100%' : '200%', // Increase width for larger screens
    }
    : {
      backgroundImage: `url(https://source.unsplash.com/featured/?${title}})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: isSmallScreen ? '100%' : '200%', // Increase height for small screens
    };

  return (
    <div
      className={`cursor-pointer duration-500 ease-in-out flex-grow m-2 min-h-14 h-full min-w-14 overflow-hidden pane relative rounded-3xl transition-all ${activeClass}`}
      onMouseEnter={onClick}
      onMouseLeave={onClickDefault}
      style={paneStyles}
    >
      <div className={`absolute bg-gradient-to-b bottom-0 duration-700 ease-in-out h-1/2 inset-x-0 shadow transition-all translate-y-1/2 z-20`} />
      <div className="absolute bottom-0 duration-700 ease-in-out flex label left-0 mb-2 ml-3 sm:mb-3 sm:ml-2 transition-all z-30">

        <div className="content flex flex-col justify-center leading-tight text-white whitespace-pre">
          <div className={`ease-in-out font-bold duration-700 ${activeClass ? 'opacity-0 relative transform translate-x-8' : ''}`}>
            {title}
          </div>
          <div className={`delay-100 duration-700 ease-in-out ${activeClass ? 'opacity-1' : 'opacity-0 relative transform translate-x-8'}`}>
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pane;
