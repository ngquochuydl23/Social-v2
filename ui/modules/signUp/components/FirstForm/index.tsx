import styles from './firstForm.module.scss'
import AuthTextField from "@components/AuthTextField";
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { FilledButton } from "@components/Button";
import { useIntl } from 'react-intl';
import { IcHidePassword, IcShowPassword } from "@assets/icons";
import Link from 'next/link';
import { PATH } from '@constants/path';
import { BaseSignUpFormProps } from '../baseSignUpFormProps';

const FirstForm: React.FC<BaseSignUpFormProps> = ({ onNext, data }) => {
  const intl = useIntl();
  const scheme = Yup.object().shape({
    password: Yup.string()
      .min(8, 'The password must be at least 8 characters')
      .required('Please enter password'),
    username: Yup.string()
      .required('Please enter an username'),
  });

  return (
    <div className={styles.firstForm}>
      <Formik
        validationSchema={scheme}
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          onNext({ ...values })
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
            <AuthTextField
              className={styles.formUserName}
              fieldTitle="Username"
              suggestion="This is the name by which people will know you on Social. You always could change after this"
              name='username'
              placeholder='Enter your username'
              onChange={handleChange}
              value={values.username}
              error={
                errors.username
                && touched.username
                && errors.username
              }
              isSubmitting={isSubmitting}
              disabled={isSubmitting}
            />
            <AuthTextField
              className={styles.formPassword}
              name='password'
              type='password'
              fieldTitle="Password"
              placeholder="Enter your password"
              enableRightButton
              rightButtonType='toggle'
              rightIconToggleOff={<IcShowPassword />}
              rightIconToggleOn={<IcHidePassword />}
              onChange={handleChange}
              isSubmitting={isSubmitting}
              value={values.password}
              error={errors.password && touched.password && errors.password}
              disabled={isSubmitting}
            />
            <FilledButton
              className={styles.formNextButton}
              text='Next'
              type="submit"
              disabled={isSubmitting}
            />
            <p className={styles.signIn}>
              {intl.formatMessage({ id: 'You already have an account?' })}
              <Link href={PATH.Login}>
                <span> {intl.formatMessage({ id: 'Sign In' })}</span>
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div >
  )
}

export default FirstForm;