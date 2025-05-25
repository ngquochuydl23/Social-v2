import * as React from 'react';
import { styled } from '@mui/material/styles';
import _ from 'lodash';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';;
import { useRouter } from "next/router";
import { useIntl } from 'react-intl';

interface StyledTabProps {
  onClick: () => any;
  label: string;
}

const ProfileTabs = styled(Tabs)({
  // borderBottom: '1px solid var(--Shadow)',
  paddingLeft: '30px',
  '@media (max-width: 600px)': {
    paddingLeft: '15px',
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
  backgroundColor: 'var(--BgPrimaryColor)'
});

const ProfileTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    zIndex: 0,
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
    },
    padding: '0px',
    fontFamily: 'SVN-PoppinsRegular',
    fontSize: '14px',
    fontWeight: 500,
    marginRight: theme.spacing(2),
    color: 'var(--TextSubColor)',
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&.Mui-selected': {
      color: '#1890ff',
      fontFamily: 'SVN-PoppinsMedium',
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  }),
);

interface ItemProfileTabViewProps {
  label: string;
  route?: string;
}

interface ProfileTabViewProps {
  tabs: Array<ItemProfileTabViewProps>;
}

const ProfileTabView: React.FC<ProfileTabViewProps> = ({ tabs }) => {
  const intl = useIntl();
  const router = useRouter();
  const { query } = router;

  const getTabIndex = () => {
    switch (query.tab) {
      case "intro":
        return 1;
      case "images":
        return 2;
      case "reels":
        return 3;
      default:
        return 0;
    }
  }

  const push = (tab?: string) => {
    if (!Boolean(tab)) {
      router.push(`/profile/${query.userName}`, undefined, { shallow: true })
      return;
    }
    router.push(`/profile/${query.userName}?tab=${tab}`, undefined, { shallow: true })
  }

  return (
    <ProfileTabs value={getTabIndex()}>
      {_.map(tabs, (tab: ItemProfileTabViewProps) => (
        <ProfileTab
          label={intl.formatMessage({ id: tab.label })}
          onClick={() => push(tab.route)}
        />
      ))}
    </ProfileTabs>
  )
}

export default ProfileTabView;