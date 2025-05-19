import HomeLayout from "@layouts/HomeLayout";
import NotificationView from "../NotificationView";

const NotificationMobileTab = () => {
  return (
    <HomeLayout>
      <NotificationView inDropDown={false} />
    </HomeLayout>
  );
};

export default NotificationMobileTab;
