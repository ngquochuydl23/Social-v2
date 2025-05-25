import React from "react";
import classNames from "classnames";
import styles from './baseDropDownItem.module.scss';
import Link from "next/link";

interface BaseDropDownItemProps {
  className?: string;
  onClick?: () => any;
  href?: string;
  children?: React.ReactNode
}

const BaseDropDownItem: React.FC<BaseDropDownItemProps> = ({
  onClick,
  href = "",
  className,
  children
}) => {

  const Item = () => {
    return (
      <li>
        <div
          className={classNames(styles.dropDown_Item, className)}
          onClick={Boolean(onClick) ? onClick : undefined}>
          {children}
        </div>
      </li>
    )
  }
  if (Boolean(href)) {
    return <Link
      className={styles.link}
      href={href}>
      <Item />
    </Link>
  }
  return <Item />
}

export default BaseDropDownItem;