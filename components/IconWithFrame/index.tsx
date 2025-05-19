import classNames from "classnames";
import styles from "./iconWithFrame.module.scss";

interface IconWithFrameProps {
  children: any;
  className?: string;
  onClick?: () => any;
  transparent?: boolean;
}

const IconWithFrame: React.FC<IconWithFrameProps> = ({
  children,
  onClick,
  className,
  transparent = false
}) => {
  return (
    <div
      className={classNames(
        styles.iconFrame,
        className,
        transparent ? styles.transparent : "",
      )}
      onClick={onClick}>
      {children}
    </div>
  )
}

export default IconWithFrame;