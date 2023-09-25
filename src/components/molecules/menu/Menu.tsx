import React from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import MenuItem from '@components/molecules/menu/MenuItem.tsx';
import { useLocation, useNavigate } from 'react-router-dom';

interface MenuInterface {
  open: boolean;
  setOpen: (newState: boolean) => void;
}
export const Menu = ({ open, setOpen }: MenuInterface) => {
  const location = useLocation();
  const navigate = useNavigate();
  const mainContainer = document.getElementById('root') || document.body;

  const menuItems = [
    {
      name: 'דף הבית',
      path: '/app',
    },
    {
      name: 'אודות',
      path: '/about',
    },
    {
      name: 'צור קשר',
      path: '/contact',
    },
  ];

  const onItemClick = (path: string) => {
    if (path === location.pathname) {
      setOpen(false);
    } else {
      navigate(path);
    }
  };

  return createPortal(
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {open && (
          <div className={`absolute w-full h-full bg-purple-100 opacity-90 z-30 top-0 right-0`}>
            <div className="absolute top-1/3 right-1/2 transform translate-x-1/2 translate-y-1/2">
              {menuItems.map(({ name, path }, index) => (
                <MenuItem
                  name={name}
                  path={path}
                  key={`${path}${index}`}
                  displaySeparator={index < menuItems.length - 1}
                  onClick={onItemClick}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>,
    mainContainer,
  );
};
