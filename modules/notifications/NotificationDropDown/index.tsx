import NotificationView from "../NotificationView";
import BaseDropDownMenu, {
  BaseDropDownMenuProps,
} from "@components/DropDown/BaseDropDownMenu";

const NotificationDropDown = (props: BaseDropDownMenuProps) => {
  return (
    <BaseDropDownMenu {...props}>
      <NotificationView inDropDown />
    </BaseDropDownMenu>
  );
};

export default NotificationDropDown;
