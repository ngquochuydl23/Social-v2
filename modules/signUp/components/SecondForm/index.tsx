import styles from './secondForm.module.scss'
import AuthTextField from "@components/AuthTextField";
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { FilledButton } from "@components/Button";
import { useIntl } from 'react-intl';
import { IcEmailSwitching, IcPhoneSwitching } from "@assets/icons";
import { BaseSignUpFormProps } from '../baseSignUpFormProps';
import { useEffect, useState } from 'react';

const SecondForm: React.FC<BaseSignUpFormProps> = ({ onNext, data }) => {
  const intl = useIntl();
  const [usePhoneNumber, setUsePhoneNumber] = useState(false);
  useEffect(() => {
    if (!Boolean(data.email) && Boolean(data.phoneNumber))
      setUsePhoneNumber(false);

    if (Boolean(data.email))
      setUsePhoneNumber(false);

    if (Boolean(data.phoneNumber))
      setUsePhoneNumber(true);
  }, [data])

  const scheme = Yup
    .object()
    .shape(usePhoneNumber
      ? {
        phoneNumber: Yup.string()
          .min(8, 'The password must be at least 8 characters')
          .required('Please enter password')
      }
      : {
        email: Yup.string()
          .email('An invalid email address')
          .required('Please enter an email')
      });

  return (
    <div className={styles.secondForm}>
      <Formik
        validationSchema={scheme}
        initialValues={{
          email: null,
          phoneNumber: null,
        }}
        onSubmit={(values, { setSubmitting }) => {
          if (usePhoneNumber)
            values.email = null
          else
            values.phoneNumber = null
          onNext(values)
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Form className={styles.formLayout}>
            <h1 className={styles.formTitle}>
              {intl.formatMessage({ id: "Welcome to Social" })}
            </h1>
            {usePhoneNumber
              ? (<AuthTextField
                className={styles.formPhone}
                type="tel"
                fieldTitle="Phone Number"
                suggestion="You will need to verify that you own this phone number."
                name='phoneNumber'
                placeholder='Enter your phone number'
                onChange={handleChange}
                value={values.phoneNumber || ""}
                error={errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
                isSubmitting={isSubmitting}
                disabled={isSubmitting}
              />)
              : (<AuthTextField
                className={styles.formEmail}
                type="email"
                fieldTitle="Email"
                suggestion="You will need to verify that you own this email account."
                name='email'
                placeholder='Enter your email'
                onChange={handleChange}
                value={values.email || ""}
                error={errors.email && touched.email && errors.email}
                isSubmitting={isSubmitting}
                disabled={isSubmitting}
              />)
            }
            <div
              className={styles.switchingButton}
              onClick={() => setUsePhoneNumber(!usePhoneNumber)}>
              {usePhoneNumber ? <IcEmailSwitching /> : <IcPhoneSwitching />}
              <p>
                {intl.formatMessage({
                  id: usePhoneNumber
                    ? "Using email address instead"
                    : "Using phone number instead"
                })}
              </p>
            </div>
            <FilledButton
              className={styles.formNextButton}
              text='Next'
              type="submit"
              disabled={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div >
  )
}

export default SecondForm;