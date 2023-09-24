import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@components/atoms';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSquareFull, faXmark } from '@fortawesome/pro-solid-svg-icons';
import { menuButton } from '@components/molecules/menu/animations/MenuAnimations';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import MenuItem from '@components/molecules/menu/MenuItem';
import { useLocation, useNavigate } from 'react-router-dom';

export const Menu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const menuProps = {
    mask: isMenuOpen ? undefined : faSquareFull,
    inverse: !isMenuOpen,
    style: { background: isMenuOpen ? 'transparent' : 'linear-gradient(#9c47fc, #356ad2)', color: '#fff' },
    size: 'xs' as SizeProp,
  };

  const mainContainer = document.getElementById('root') || document.body;

  const buttonClasses = ['rounded-xl', 'w-14', 'h-14', 'z-40', 'relative'];

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
      setMenuOpen(false);
    } else {
      navigate(path);
    }
  };

  const Menu = () => {
    return createPortal(
      <AnimatePresence>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {isMenuOpen && (
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

  return (
    <div>
      <Menu />
      <Button classes={buttonClasses} inverse fill={isMenuOpen} onClick={toggleMenu}>
        <motion.div variants={menuButton} animate={isMenuOpen ? 'open' : 'closed'}>
          {isMenuOpen ? (
            <FontAwesomeIcon icon={faXmark} onClick={() => {}} {...menuProps} />
          ) : (
            <FontAwesomeIcon icon={faBars} onClick={() => {}} {...menuProps} />
          )}
        </motion.div>
      </Button>
    </div>
  );
};
