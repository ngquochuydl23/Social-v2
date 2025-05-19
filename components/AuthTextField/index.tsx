import classNames from 'classnames';
import React from 'react';
import styles from './authTextField.module.scss'
import { useIntl } from 'react-intl';

interface AuthTextFieldProps {
  className?: string;
  name?: string;
  placeholder?: string;
  enableRightButton?: boolean;
  rightButtonType?: string;
  rightIconToggleOn?: any;
  rightIconToggleOff?: any;
  error?: any;
  onChange?: (event: any) => any;
  value?: string;
  isSubmitting?: boolean;
  type?: string;
  onBlur?: (e: any) => any;
  disabled?: boolean;
  fieldTitle?: string;
  suggestion?: string;
  maxDate?: number | string | undefined;
}

const AuthTextField: React.FC<AuthTextFieldProps> = ({
  className,
  name,
  placeholder,
  enableRightButton = false,
  rightButtonType = "none",
  rightIconToggleOn,
  rightIconToggleOff,
  error,
  onChange,
  value,
  isSubmitting,
  type = "text",
  onBlur,
  disabled,
  fieldTitle,
  suggestion,
  maxDate
}) => {
  const [toggle, setToggle] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const intl = useIntl();

  const getTypeInput = (toggle: boolean) => {
    if (type === 'password' && !isSubmitting)
      return toggle ? 'text' : 'password'
    return type;
  }

  const getRightIcon = (toggle: boolean) => {
    switch (rightButtonType) {
      case "toggle":
        return toggle ? rightIconToggleOn : rightIconToggleOff
      default:
        return undefined
    }
  }

  return (
    <div className={classNames(styles.authTextField, className)}>
      {fieldTitle &&
        <p className={styles.titleField}>
          {intl.formatMessage({ id: fieldTitle })}
        </p>
      }
      <div
        className={classNames(
          styles.fieldContain,
          (isFocused && !isSubmitting) && styles.focusing,
          (Boolean(error) && !isSubmitting) && styles.onError
        )}
      >
        <input
          max={maxDate}
          className={classNames(
            styles.fieldInput,
            Boolean(getRightIcon(toggle)) && styles.hasRightIcon,
          )}
          name={name}
          value={value}
          type={getTypeInput(toggle)}
          placeholder={
            Boolean(placeholder)
              ? intl.formatMessage({ id: placeholder })
              : ''
          }
          onChange={event => {
            if (onChange)
              onChange(event);
          }}
          onBlur={(event) => {
            if (onBlur)
              onBlur(event);
            setIsFocused(false);
          }}
          onFocus={(event) => setIsFocused(true)}
          disabled={disabled}
        />
        {enableRightButton &&
          <div
            className={styles.rightIcon}
            onClick={() => {
              setIsFocused(true);
              if (!isSubmitting)
                setToggle(!toggle)
            }}>
            {getRightIcon(toggle)}
          </div>
        }
      </div>
      {(suggestion && !error) &&
        <p className={styles.suggestion}>
          {intl.formatMessage({ id: suggestion })}
        </p>
      }
      {Boolean(error) && !isSubmitting &&
        <p className={styles.errorText}>
          {intl.formatMessage({ id: error })}
        </p>
      }
    </div>
  )
}

export default AuthTextField;