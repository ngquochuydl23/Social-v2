import { PATH } from "@constants/path";
import AuthLayout from "@layouts/AuthLayout";
import { useRouter } from "next/router";
import { useState } from "react";
import { HttpResult } from "services/https/dtos";
import { signUpService } from "services/RegisterService";
import { ResponseSignUpDto } from "services/RegisterService/dtos";
import { RequestSignUp } from "services/RegisterService/dtos";
import FirstForm from "./components/FirstForm";
import SecondForm from "./components/SecondForm";
import ThirdForm from "./components/ThirdForm";
import { loginService } from "services/SessionService";
import { useSession } from "context/SessionHook";

const SignUpPage = () => {
  const router = useRouter();
  const { login } = useSession();
  const [signUpData, setData] = useState<RequestSignUp>({
    username: "",
    password: "",
    email: null,
    phoneNumber: null,
    lastName: "",
    firstName: "",
    birthday: "",
    gender: ""
  });

  const signUp = (formData: any) => {
    signUpService(formData)
      .then((res) => {
        loginService(formData.username, formData.password)
          .then((res) => {
            const token = res?.result?.token as any
            router.push(PATH.home);
            login(token);
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {

          })
      })
      .catch((err) => console.log(err.error))
  }
  const goToNextStep = (step: number) => {
    router.push(`/sign-up?step=${step}`, undefined, { shallow: true })
  }
  const notAvailableSecondStep = () => {
    if (!Boolean(signUpData.username) && !Boolean(signUpData.username)) {
      return true;
    }
    return false;
  }
  const checkAvailableThirdStep = () => {
    if (!Boolean(signUpData.phoneNumber) && !Boolean(signUpData.email)) {
      if (notAvailableSecondStep()) {
        goToNextStep(1);
      }
      goToNextStep(2);
    }
  }
  const SignUpForm = () => {
    switch (router.query.step) {
      case "2":
        if (notAvailableSecondStep()) {
          goToNextStep(1);
        }
        return (
          <SecondForm
            data={signUpData}
            onNext={(data: RequestSignUp) => {
              setData({ ...signUpData, ...data });
              goToNextStep(3);
            }}
          />
        );
      case "3":
        checkAvailableThirdStep();
        return (
          <ThirdForm
            data={signUpData}
            onNext={(data: RequestSignUp) => {
              signUp({ ...signUpData, ...data })
            }}
          />
        );
      default:
        return (
          <FirstForm
            data={signUpData}
            onNext={(data: RequestSignUp) => {
              setData({ ...signUpData, ...data });
              goToNextStep(2);
            }}
          />
        );
    }
  }

  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  )
}

export default SignUpPage;