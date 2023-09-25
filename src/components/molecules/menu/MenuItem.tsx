import React from 'react';
import { useTranslation } from 'react-i18next';

interface MenuItemInterace {
  name: string;
  path: (() => void) | string;
  displaySeparator: boolean;
  onClick: (path: string | (() => void)) => void;
}
const MenuItem = ({ name, path, displaySeparator, onClick }: MenuItemInterace) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="text-white text-3xl my-3 text-center cursor-pointer" onClick={() => onClick(path)}>
        {t(name)}
      </div>
      {displaySeparator && <hr className="text-white" />}
    </div>
  );
};

export default MenuItem;
