import { Tabs, Tab, styled } from "@mui/material";
import ActivityHeader from "../components/ActivityHeader";
import ActivityLayout from "../components/ActivityLayout";
import { useState } from "react";
import ShareTabs from "./SharesTab";
import { LikeDto } from "services/LikeService/dtos";
import CommentList from "./CommentsTab";
import LikeList from "./LikesTab";

const InteractionTabs = styled(Tabs)({
  marginTop: '20px', 
  '@media (max-width: 600px)': {
    paddingLeft: '15px',
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
  backgroundColor: 'var(--BgPrimaryColor)'
});

const InteractionTab = styled((props: any) => <Tab disableRipple {...props} />)(
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
const Interaction = (like: LikeDto) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <ActivityLayout>
      <ActivityHeader
        title="Interaction"
        subtitle="View your likes, comments and other interactions"
      />
      <InteractionTabs
        sx={{

        }}
        value={activeTab}
        onChange={handleTabChange}>
        <InteractionTab label="Likes" />
        <InteractionTab label="Comments" />
        <InteractionTab label="Shares" />
      </InteractionTabs>
      {activeTab === 0 && <LikeList />}
      {activeTab === 1 && <CommentList />}
      {activeTab === 2 && <ShareTabs />}
    </ActivityLayout>
  );
};

export default Interaction;
