import classNames from "classnames";
import styles from "./button.module.scss";
import { useIntl } from "react-intl";
import SocialV2Link from "@components/Social-v2-Link";

interface ButtonProps {
  leftIc?: any;
  className?: string;
  text: string;
  onClick?: () => any;
  disabled?: boolean;
  children?: React.ReactElement;
  type?: any;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  leftIc,
  className,
  text,
  onClick,
  disabled = false,
  children,
  type,
  href = undefined,
}) => {
  const intl = useIntl();
  const ButtonText = () => {
    if (leftIc) {
      return (
        <div className={styles.leftIc}>
          {leftIc} {intl.formatMessage({ id: text })}
        </div>
      );
    }
    return <>{intl.formatMessage({ id: text })}</>;
  };

  return (
    <button
      className={classNames(styles.button, className)}
      disabled={disabled}
      onClick={onClick}
      type={type || "button"}
    >
      {href ? (
        <SocialV2Link href={href}>
          {children ? children : <ButtonText />}
        </SocialV2Link>
      ) : children ? (
        children
      ) : (
        <ButtonText />
      )}
    </button>
  );
};

export const OutlineButton: React.FC<ButtonProps> = ({
  className,
  text,
  onClick,
  disabled,
  children,
  type,
  href,
  leftIc,
}) => {
  return (
    <Button
      className={classNames(styles.outline, className)}
      onClick={onClick}
      text={text}
      disabled={disabled}
      href={href}
      leftIc={leftIc}
      type={type}
      children={children}
    />
  );
};

export const FilledButton: React.FC<ButtonProps> = ({
  className,
  text,
  onClick,
  disabled,
  children,
  type,
  href,
  leftIc,
}) => {
  return (
    <Button
      className={classNames(styles.filled, className)}
      onClick={onClick}
      text={text}
      leftIc={leftIc}
      disabled={disabled}
      href={href}
      type={type}
      children={children}
    />
  );
};

export const TextButton: React.FC<ButtonProps> = ({
  className,
  text,
  onClick,
  disabled,
  children,
  type,
  href,
  leftIc,
}) => {
  return (
    <Button
      className={classNames(styles.text, className)}
      onClick={onClick}
      text={text}
      leftIc={leftIc}
      disabled={disabled}
      href={href}
      type={type}
      children={children}
    />
  );
};
