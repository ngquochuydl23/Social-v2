import BaseDropDownItem from '@components/DropDown/BaseDropDownMenu/BaseDropDownItem';
import IconWithFrame from '@components/IconWithFrame';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import styles from './uploadDDItem.module.scss'

interface UploadDDItemProps {
  text: string;
  children?: any;
  onClick?: () => any;
  href?: string;
  textClassName?: string;
}

const UploadDDItem: React.FC<UploadDDItemProps> = ({
  text, children, onClick, href, textClassName
}) => {
  const intl = useIntl();
  return (
    <BaseDropDownItem
      className={styles.uploadDDItem}
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
    </BaseDropDownItem>
  );
}

export default UploadDDItem;