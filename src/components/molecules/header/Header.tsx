import React, { useState } from 'react';
import { Button } from '@components/atoms';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSquareFull, faXmark } from '@fortawesome/pro-solid-svg-icons';
import { menuButton } from '@components/molecules/menu/animations/MenuAnimations';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { Menu } from '@components/molecules/menu/Menu';
import { HeaderInterface } from '@components/molecules/header/interface/HeaderInterface';

export const Header = ({ title }: HeaderInterface) => {
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
    <div className="flex justify-between flex-wrap">
      <Menu open={isMenuOpen} setOpen={setMenuOpen} />
      <Button classes={buttonClasses} fill={isMenuOpen} inverse onClick={toggleMenu}>
        <motion.div animate={isMenuOpen ? 'open' : 'closed'} variants={menuButton}>
          {isMenuOpen ? (
            <FontAwesomeIcon icon={faXmark} onClick={() => {}} {...menuProps} />
          ) : (
            <FontAwesomeIcon icon={faBars} onClick={() => {}} {...menuProps} />
          )}
        </motion.div>
      </Button>
      <h1>{title}</h1>
      <div className={buttonClasses.join(' ')} />
    </div>
  );
};
