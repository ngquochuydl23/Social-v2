import classNames from "classnames";
import styles from './storyArrowButton.module.scss'

interface ArrowButtonProps {
  children: React.ReactNode;
  className: string;
  disable?: boolean;
  onClick?: () => any;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  children, className, disable = false, onClick
}) => {
  if (!disable) {
    return (
      <div
        className={classNames(styles.arrowButon, className)}
        onClick={onClick}>
        {children}
      </div>
    );
  }
  return <div />;
}

export default ArrowButton;