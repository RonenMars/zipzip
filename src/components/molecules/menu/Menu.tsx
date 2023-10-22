import React from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import MenuItem from '@components/molecules/menu/MenuItem.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuItems } from '@components/molecules/menu/consts/menuItems';
import { PersistentStorage } from '@utils/localStorage/localStorage.ts';

interface MenuInterface {
  open: boolean;
  setOpen: (newState: boolean) => void;
}
export const Menu = ({ open, setOpen }: MenuInterface) => {
  const location = useLocation();
  const navigate = useNavigate();
  const mainContainer = document.getElementById('root') || document.body;

  const onItemClick = (menuItemAction: string) => {
    if (menuItemAction !== 'logout') {
      if (menuItemAction === location.pathname) {
        setOpen(false);
      } else {
        navigate(menuItemAction);
      }
    } else {
      PersistentStorage.setItem('jwtToken', '');
      navigate('/');
    }
  };

  return createPortal(
    <AnimatePresence>
      <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
        {open ? (
          <div className="absolute w-full h-full bg-purple-100 opacity-90 z-30 top-0 right-0">
            <div className="absolute top-1/3 right-1/2 transform translate-x-1/2 translate-y-1/2">
              {menuItems.map(({ name, menuItemAction }, index) => (
                <MenuItem
                  displaySeparator={index < menuItems.length - 1}
                  key={`${menuItemAction}${index}`}
                  name={name}
                  onClick={onItemClick}
                  menuItemAction={menuItemAction}
                />
              ))}
            </div>
          </div>
        ) : null}
      </motion.div>
    </AnimatePresence>,
    mainContainer,
  );
};
