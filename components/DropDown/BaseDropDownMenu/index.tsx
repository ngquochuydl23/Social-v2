import React, { useRef, useEffect } from "react";
import styles from './baseDropDown.module.scss';
import { CSSTransition } from 'react-transition-group';
import classNames from "classnames";

export interface BaseDropDownMenuProps {
  open?: boolean | undefined;
  children?: React.ReactNode;
  menuClassName?: string;
}

const BaseDropDownMenu: React.FC<BaseDropDownMenuProps> = ({ open, children, menuClassName }) => {

  const ref = useRef<any>(null);
  const [openDropDown, setOpenDropDown] = React.useState(false);

  useEffect(() => {
    setOpenDropDown(Boolean(open));
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenDropDown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return (
    <div
      className={classNames(styles.dropDownContainer, menuClassName)}
      ref={ref}>
      <CSSTransition
        in={openDropDown}
        timeout={500}
        classNames={styles.dropDownMenu}
        unmountOnExit>
        <div className={styles.dropDownMenu}>
          {children}
        </div>
      </CSSTransition>
    </div>
  )
}

export default BaseDropDownMenu;
