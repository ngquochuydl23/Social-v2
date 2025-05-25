import LoginPage from "modules/login";
import AuthLayout from "layouts/AuthLayout";
import LoginForm from "modules/login/LoginForm";

const Page = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

Page.theme = "light";
export default Page;
