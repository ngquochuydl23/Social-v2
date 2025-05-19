import BaseDropDownItem from '@components/DropDown/BaseDropDownMenu/BaseDropDownItem';
import IconWithFrame from '@components/IconWithFrame';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import styles from './accountDDItem.module.scss'

interface AccountDDItemProps {
  text: string;
  children?: any;
  onClick?: () => any;
  href?: string;
  textClassName?: string;
  rightComponent?: React.ReactNode;
}

const AccountDDItem: React.FC<AccountDDItemProps> = ({
  text, children, onClick, href, textClassName, rightComponent
}) => {
  const intl = useIntl();
  return (
    <BaseDropDownItem
      className={styles.accountDDItem}
      href={href}
      onClick={onClick}>
      <div className={styles.insideContain}>
        <IconWithFrame
          className={styles.iconFrameDDItem}>
          {children}
        </IconWithFrame>
        <h4 className={classNames(styles.text, textClassName)}>
          {intl.formatMessage({ id: text })}
        </h4>
      </div>
      {rightComponent}
    </BaseDropDownItem>
  );
}

export default AccountDDItem;