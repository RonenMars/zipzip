import React from 'react';

interface MenuItemInterace {
  name: string;
  path: string;
  displaySeparator: boolean;
  onClick: (path: string) => void;
}
const MenuItem = ({ name, path, displaySeparator, onClick }: MenuItemInterace) => {
  return (
    <div>
      <div className="text-white text-3xl my-3 text-center cursor-pointer" onClick={() => onClick(path)}>
        {name}
      </div>
      {displaySeparator && <hr className="text-white" />}
    </div>
  );
};

export default MenuItem;
