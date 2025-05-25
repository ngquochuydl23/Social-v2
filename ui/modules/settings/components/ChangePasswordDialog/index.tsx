import { IcHidePassword, IcShowPassword } from '@assets/icons';
import AuthTextField from '@components/AuthTextField';
import { FilledButton } from '@components/Button';
import BaseDialog, {
  BaseDialogHeader,
  DialogProps
} from '@components/Dialogs/BaseDialog';
import { Form, Formik } from 'formik';
import styles from './changePasswordDialog.module.scss';
import { useIntl } from 'react-intl';
import * as Yup from 'yup';
import { LabelTextField } from '@components/LabelField';

const ChangePasswordDialog: React.FC<DialogProps> = ({
  open,
  onClose
}) => {

  const intl = useIntl();
  const scheme = Yup.object().shape({
    oldPassword: Yup.string()
      .min(8, 'The password must be at least 8 characters')
      .required('Please enter password'),
    newPassword: Yup.string()
      .min(8, 'The password must be at least 8 characters')
      .required('Please enter password'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  });

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      showBaseHeader={false}
      isPadding={false}>
      <div className={styles.changePassword}>
        <BaseDialogHeader
          textRightButton='Cancel'
          rightButtonClick={onClose}
          text='Change Password'
          onButtonClose={onClose} />
        <div className={styles.body}>
          <div className={styles.title}>
            Bạn sẽ được đăng xuất khỏi tất cả các phiên (trừ phiên này) để bảo vệ tài khoản của bạn, phòng khi ai đó đang cố lấy quyền truy cập. <br />
            Mật khẩu của bạn phải có ít nhất 6 ký tự, bao gồm cả chữ số, chữ cái và ký tự đặc biệt (!$@%).
          </div>
          <Formik
            validationSchema={scheme}
            initialValues={{
              oldPassword: '',
              newPassword: '',
              confirmPassword: ""
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);

            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
              getFieldProps,
              handleBlur
            }) => (
              <Form className={styles.formLayout}>
                <LabelTextField
                  className={styles.formPassword}
                  textFieldProps={{
                    ...getFieldProps("oldPassword"),
                    type: 'password',
                    label: 'Old Password',
                    value: values.oldPassword,
                    onBlur: handleBlur,
                    onChange: handleChange,
                    disabled: isSubmitting,
                    error: errors.oldPassword ? true : false
                  }}
                  errorText={errors.oldPassword}
                />
                <LabelTextField
                  className={styles.formPassword}
                  textFieldProps={{
                    ...getFieldProps("newPassword"),
                    type: 'password',
                    label: 'New Password',
                    value: values.newPassword,
                    onBlur: handleBlur,
                    onChange: handleChange,
                    disabled: isSubmitting,
                    error: errors.newPassword ? true : false
                  }}
                  errorText={errors.newPassword}
                />
                <LabelTextField
                  className={styles.formPassword}
                  textFieldProps={{
                    ...getFieldProps("confirmPassword"),
                    type: 'password',
                    label: 'Confirm New Password',
                    value: values.confirmPassword,
                    onBlur: handleBlur,
                    onChange: handleChange,
                    disabled: isSubmitting,
                    error: errors.confirmPassword ? true : false
                  }}
                  errorText={errors.confirmPassword}
                />
                <FilledButton
                  className={styles.formChangePasswordButton}
                  text='Change Password'
                  type="submit"
                  disabled={isSubmitting}
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </BaseDialog>
  )
}

export default ChangePasswordDialog;