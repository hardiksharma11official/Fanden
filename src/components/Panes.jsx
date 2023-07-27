import React, {useState } from 'react';
import Pane from './Pane'; 

const Panes = ({panesData}) => {
  const [activePane, setActivePane] = useState(0);

  const handlePaneClick = (index) => {
    setActivePane(index);
  };
  const handlePaneClickDefault = () => {
    setActivePane(0);
  };

  return (
    <div className="antialiased flex flex-col font-sans h-[80vh] items-stretch justify-center p-2 sm:flex-row sm:items-center">
      <div className="flex flex-grow items-stretch min-w-md w-full flex-col sm:flex-row h-full sm:overflow-hidden ">
        {panesData.map((pane, index) => (
          <Pane
            key={index}
            title={pane.title}
            subtitle={pane.subtitle}
            isActive={activePane === index}
            onClick={() => handlePaneClick(index)}
            onClickDefault={() => handlePaneClickDefault()}
          />
        ))}
      </div>
    </div>
  );
};

export default Panes;
