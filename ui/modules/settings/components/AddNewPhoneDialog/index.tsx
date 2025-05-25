import { FilledButton } from '@components/Button';
import BaseDialog, {
  BaseDialogHeader,
  DialogProps
} from '@components/Dialogs/BaseDialog';
import { Form, Formik } from 'formik';
import styles from './addNewPhoneDialog.module.scss';
import { useIntl } from 'react-intl';
import * as Yup from 'yup';
import LabelPhoneField from '@components/LabelField/LabelPhoneField';

const AddNewPhoneDialog: React.FC<DialogProps> = ({
  open,
  onClose
}) => {

  const intl = useIntl();
  const scheme = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/[0-9]{8}/, "Please enter valid phone number")
      .required('Please enter password'),
  });

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      showBaseHeader={false}
      isPadding={false}>
      <div className={styles.addNewPhone}>
        <BaseDialogHeader
          textRightButton='Cancel'
          rightButtonClick={onClose}
          text='Add new phone number'
          onButtonClose={onClose} />
        <div className={styles.body}>
          <div className={styles.title}>
            Chúng tôi sẽ dùng số này trên tất cả các tài khoản của bạn trong Trung tâm tài khoản để cá nhân hóa trải nghiệm, chẳng hạn như kết nối mọi người và cải thiện quảng cáo trên các sản phẩm của chúng tôi.
          </div>
          <Formik
            validationSchema={scheme}
            initialValues={{
              phoneNumber: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              // setSubmitting(true);
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
                <LabelPhoneField
                  className={styles.formPhone}
                  textFieldProps={{
                    ...getFieldProps("phoneNumber"),
                    type: 'text',
                    label: 'Phone Number',
                    value: values.phoneNumber,
                    onBlur: handleBlur,
                    onChange: handleChange,
                    disabled: isSubmitting,
                    error: errors.phoneNumber ? true : false
                  }}
                  errorText={errors.phoneNumber} />
                <FilledButton
                  className={styles.formBtn}
                  text='Add new phone number'
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

export default AddNewPhoneDialog;