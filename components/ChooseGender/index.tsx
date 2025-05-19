import styles from './chooseGender.module.scss'
import { useIntl } from 'react-intl';
import { useEffect, useState } from 'react';
import { OutlineButton } from '@components/Button';
import classNames from 'classnames';
import { Gender } from '@constants/globals';

interface ChooseGenderProps {
  fieldTitle?: string;
  name?: string;
  onChange?: (name: string, value?: string) => any;
  error?: any;
  value?: string;
  isSubmitting?: boolean;
}

interface GenderButtonProps {
  textButton?: string;
  active?: boolean;
  onClick?: () => any;
  error?: any;
}

const GenderButton: React.FC<GenderButtonProps>
  = ({ textButton, active = false, onClick, error }) => {
    const intl = useIntl();
    return (
      <div className={styles.buttonContain}>
        <OutlineButton
          onClick={onClick}
          text={textButton!}
          type="button"
          textClassName={styles.textButton}
          className={classNames(
            styles.genderButton,
            active && styles.isActive,
            error && styles.error
          )}
        />
      </div>
    )
  }

const ChooseGender: React.FC<ChooseGenderProps> = ({
  fieldTitle,
  name,
  onChange,
  error,
  value = "",
  isSubmitting
}) => {
  const intl = useIntl();
  // 0 is unchoose
  // 1 is male
  // -1 is female
  const [gender, setGender] = useState(value);
  const [_error, set_error] = useState(error);
  useEffect(() => {
    if (onChange)
      onChange(name!, gender)
    set_error(null);
  }, [gender])

  useEffect(() => {
    setGender(value);
  }, [])

  useEffect(() => {
    set_error(error);
  }, [error])

  return (
    <div className={styles.chooseGender} onChange={(e) => console.log(e)}>
      {fieldTitle &&
        <p className={styles.titleField}>
          {intl.formatMessage({ id: fieldTitle })}
        </p>
      }
      <div className={styles.genderButtonGroup}>
        <GenderButton
          active={gender === Gender.Male}
          textButton={Gender.Male}
          error={_error}
          onClick={() => setGender(Gender.Male)} />
        <GenderButton
          active={gender === Gender.Female}
          textButton={Gender.Female}
          error={_error}
          onClick={() => setGender(Gender.Female)} />
      </div>
      {Boolean(_error) && !isSubmitting &&
        <p className={styles.errorText}>
          {intl.formatMessage({ id: _error })}
        </p>
      }
    </div>
  )
}

export default ChooseGender;