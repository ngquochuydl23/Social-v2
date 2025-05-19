import styles from './thirdForm.module.scss'
import AuthTextField from "@components/AuthTextField";
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { FilledButton } from "@components/Button";
import { useIntl } from 'react-intl';
import { BaseSignUpFormProps } from '../baseSignUpFormProps';
import ChooseGender from '@components/ChooseGender';

const ThirdForm: React.FC<BaseSignUpFormProps> = ({ onNext, data }) => {
  const intl = useIntl();
  const scheme = Yup
    .object()
    .shape({
      lastName: Yup.string()
        .required('Please enter your last name'),
      firstName: Yup.string()
        .required('Please enter your first name'),
      birthday: Yup.string()
        .required('Please choose your date of birth'),
      gender: Yup.string()
        .required('Please choose your gender'),
    });

  return (
    <div className={styles.thirdForm}>
      <Formik
        validationSchema={scheme}
        initialValues={{
          lastName: '',
          firstName: '',
          birthday: '',
          gender: ''
        }}
        onSubmit={(values, { setSubmitting }) => {
          onNext(values)
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setTouched
        }) => (
          <Form className={styles.formLayout}>
            <h1 className={styles.formTitle}>
              {intl.formatMessage({ id: "Welcome to Social" })}
            </h1>
            <div className={styles.formLastAndFirstName}>
              <AuthTextField
                className={styles.formLastName}
                fieldTitle="Last name"
                name='lastName'
                placeholder='Last name'
                onChange={handleChange}
                value={values.lastName}
                error={errors.lastName && touched.lastName && errors.lastName}
                isSubmitting={isSubmitting}
                disabled={isSubmitting}
              />
              <AuthTextField
                className={styles.formFirstName}
                fieldTitle="First name"
                name='firstName'
                placeholder='First name'
                onChange={handleChange}
                value={values.firstName}
                error={errors.firstName && touched.firstName && errors.firstName}
                isSubmitting={isSubmitting}
                disabled={isSubmitting}
              />
            </div>
            <AuthTextField
              className={styles.formBirthday}
              fieldTitle="Birthday"
              name='birthday'
              onChange={handleChange}
              suggestion={`Choose your date of birth. You can always make this private later`}
              value={values.birthday}
              error={errors.birthday && touched.birthday && errors.birthday}
              isSubmitting={isSubmitting}
              disabled={isSubmitting}
              type="date"
            />
            <ChooseGender
              fieldTitle='Gender'
              name='gender'
              value={values.gender}
              error={errors.gender && touched.gender && errors.gender}
              onChange={(name, value) => {
                setFieldValue(name, value)
              }}
            />
            <p className={styles.signUpPrivacy}>
              {intl.formatMessage({
                id: "By clicking Sign Up, you are indicating that you have to read acknowledge the"
              })}
              <span>{intl.formatMessage({ id: " Terms Of Service " })}</span>
              {intl.formatMessage({ id: "and" })}
              <span>{intl.formatMessage({ id: " Privacy Notice" })}</span>
            </p>
            <FilledButton
              className={styles.formNextButton}
              text='Sign Up'
              type="submit"
              disabled={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div >
  )
}

export default ThirdForm;