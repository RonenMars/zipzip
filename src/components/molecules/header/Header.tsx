import React, { useState } from 'react';
import { Button } from '@components/atoms';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSquareFull, faXmark } from '@fortawesome/pro-solid-svg-icons';
import { menuButton } from '@components/molecules/menu/animations/MenuAnimations.ts';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { Menu } from '@components/molecules/menu/Menu.tsx';

export const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const menuProps = {
    mask: isMenuOpen ? undefined : faSquareFull,
    inverse: !isMenuOpen,
    style: { background: isMenuOpen ? 'transparent' : 'linear-gradient(#9c47fc, #356ad2)', color: '#fff' },
    size: 'xs' as SizeProp,
  };

  const buttonClasses = ['rounded-xl', 'w-14', 'h-14', 'z-40', 'relative'];

  return (
    <div>
      <Menu open={isMenuOpen} setOpen={setMenuOpen} />
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
