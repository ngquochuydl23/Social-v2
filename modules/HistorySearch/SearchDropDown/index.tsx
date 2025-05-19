import BaseDropDownMenu, { BaseDropDownMenuProps } from "@components/DropDown/BaseDropDownMenu";
import HisorySearchView from "../HisorySearchView";
import styles from './searchDropDown.module.scss'

const SearchDropDown = (props: BaseDropDownMenuProps) => {
  return (
    <BaseDropDownMenu {...props} menuClassName={styles.searchDropDown}>
      <HisorySearchView />
    </BaseDropDownMenu>
  );
};

export default SearchDropDown;
