import React, { KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface MenuItemInterace {
  name: string;
  menuItemAction: string;
  displaySeparator: boolean;
  onClick: (path: string) => void;
}
const MenuItem = ({ name, menuItemAction, displaySeparator, onClick }: MenuItemInterace) => {
  const { t } = useTranslation();

  const buttonize = (handlerFn: () => void) => {
    return {
      role: 'button',
      onClick: () => handlerFn(),
      onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === '13') handlerFn();
      },
    };
  };

  return (
    <div>
      <div
        className="text-white text-3xl my-3 text-center cursor-pointer"
        {...buttonize(() => onClick(menuItemAction))}
      >
        {t(name)}
      </div>
      {displaySeparator ? <hr className="text-white" /> : null}
    </div>
  );
};

export default MenuItem;
