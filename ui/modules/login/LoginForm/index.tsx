import * as Yup from "yup";
import { Formik, Form } from "formik";
import { FilledButton } from "@components/Button";
import styles from "./loginForm.module.scss";
import Link from "next/link";
import { PATH } from "@constants/path";
import { useIntl } from "react-intl";
import { loginService } from "services/SessionService";
import { useSession } from "context/SessionHook";
import { useState } from "react";
import GoogleAuthButton from "@components/Button/GoogleAuthButton";
import { LabelTextField } from "@components/LabelField";
import FacebookAuthButton from "@components/Button/FacebookAuthButton";

const LoginForm = () => {
  const intl = useIntl();
  const { login } = useSession();

  const [showFailedDialog, setShowFailedDialog] = useState<boolean>(false);
  const scheme = Yup.object().shape({
    password: Yup.string()
      .min(8, "The password must be at least 8 characters")
      .required("Please enter password"),
    username: Yup.string()
      .matches(/^[\d-\.a-z-_]+$/, "Please enter valid username")
      .required("Please enter username"),
  });

  const continueWithGoogle = (accessToken: string) => {
    // loginViaGoogle(accessToken)
    //   .then((res) => {
    //     const token = res?.result?.token as any;
    //     login(token);
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <div className={styles.loginForm}>
      <div className={styles.loginViaView}>
        <h1 className={styles.formTitle}>
          {intl.formatMessage({ id: "Login" })}
        </h1>
        {showFailedDialog && (
          <div className={styles.formLoginFailed}>
            <p>
              {`Incorrect username or password. `}
              <span>
                <Link href={PATH.ForgotPassword}>
                  {"Forgot your password ?"}
                </Link>
              </span>
            </p>
          </div>
        )}
        {/* <GoogleAuthButton
          onGetAccessToken={continueWithGoogle}
          onErr={(err) => {
            console.log(err);
          }}
        /> */}
        <FacebookAuthButton
          onGetUserInfo={(userInfo) => {
            console.log(userInfo);
          }}
          onErr={(err) => {
            console.log(err);
          }}
        />
      </div>
      <Formik
        validationSchema={scheme}
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          loginService(values.username, values.password)
            .then((res) => {
              const token = res?.result?.token as any;
              setShowFailedDialog(false);
              login(token);
            })
            .catch((err) => {
              console.log(err);
              setShowFailedDialog(true);
              setSubmitting(false);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          getFieldProps,
        }) => (
          <Form autoComplete="off" className={styles.formLayout}>
            <div className={styles.signInVia}>
              <div className={styles.stroke} />
              <p className={styles.orSignInWith}>
                {intl.formatMessage({ id: "Or sign in with" })}
              </p>
              <div className={styles.stroke} />
            </div>

            <LabelTextField
              className={styles.formUsername}
              textFieldProps={{
                ...getFieldProps("username"),
                type: "text",
                label: "User name",
                value: values.username,
                onBlur: handleBlur,
                onChange: handleChange,
                disabled: isSubmitting,
                error: errors.username ? true : false,
              }}
              errorText={errors.username}
            />
            <LabelTextField
              className={styles.formPassword}
              textFieldProps={{
                ...getFieldProps("password"),
                type: "password",
                label: "Password",
                onBlur: handleBlur,
                onChange: handleChange,
                disabled: isSubmitting,
                error: Boolean(errors.password),
              }}
              errorText={errors.password}
            />
            <FilledButton
              className={styles.formLoginButton}
              text="Login"
              type="submit"
              disabled={isSubmitting}
            />
            <Link
              className={styles.formForgotPassword}
              href={PATH.ForgotPassword}
            >
              {intl.formatMessage({ id: "Forgot Password?" })}
            </Link>
            <div className={styles.signInVia}>
              <div className={styles.stroke} />
              <p className={styles.orSignInWith}>
                {"\n" + intl.formatMessage({ id: "Or" }) + "\n"}
              </p>
              <div className={styles.stroke} />
            </div>
            <h3 className={styles.formSignUpText}>
              <p>
                Create new account?
                <span>
                  <Link className={styles.link} href={PATH.SignUp}>
                    Sign Up
                  </Link>
                </span>
              </p>
            </h3>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
