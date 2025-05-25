import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProfile } from "services/ProfileService";
import { ProfileDto } from "services/ProfileService/dtos";
import ReelsTab from "./tabs/ReelsTab";
import HomeTab from "./tabs/HomeTab";
import ImagesTab from "./tabs/ImagesTab";
import IntroTab from "./tabs/IntroTab";
import { ProtectedRoute } from "@components/Authentication";
import { AvatarWithStory } from "@components/Avatar";
import BaseContainer from "@components/BaseContainer";
import { AppBar, useScrollTrigger } from "@mui/material";
import { useTheme } from "next-themes";
import classNames from "classnames";
import { IcMobileBackDark, IcMobileBackLight } from "@assets/icons";
import styles from "./profile.module.scss";
import ProfileTabView from "./components/ProfileTabView";
import { isMobile } from "react-device-detect";
import Header from "@components/Header";
import ProfileInfo from "./components/ProfileInfo";
import ProfileSkeleton from "./components/ProfileSkeleton";
import { useSession } from "context/SessionHook";

const ProfileMobileAppBar = ({ profile }: { profile?: ProfileDto | null }) => {
  const { theme } = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 250,
    target: window ? window : undefined,
  });
  const router = useRouter();

  if (profile === null) {
    return null;
  }

  return (
    <AppBar
      color="transparent"
      elevation={0}
      sx={{
        zIndex: 9000,
        backgroundColor: trigger ? "var(--BgPrimaryColor)" : undefined,
        boxShadow: trigger ? "0px 1px 1px var(--Shadow)" : "none",
      }}
    >
      <BaseContainer>
        <div className={styles.profileHeader}>
          <div
            className={classNames(styles.navButton, trigger && styles.trigger)}
            onClick={() => {
              router.back();
            }}
          >
            {trigger && theme === "light" ? (
              <IcMobileBackLight height={30} width={20} />
            ) : (
              <IcMobileBackDark height={30} width={20} />
            )}
          </div>
          <div className={styles.navCenter}>
            {trigger && (
              <div className={styles.info}>
                <AvatarWithStory
                  avatarStoryCN={styles.avatar}
                  hasUnViewStories={true}
                  url={profile?.avatar}
                />
                <div className={styles.rightContain}>
                  <p className={styles.title}>{profile?.fullName}</p>
                  <p className={styles.subtitle}>@{profile?.userName}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </BaseContainer>
    </AppBar>
  );
};

const tabs = [
  { label: "Home", route: undefined },
  { label: "Introduction", route: "intro" },
  { label: "Images", route: "images" },
  { label: "Reels", route: "reels" },
];

const tab1s = {
  home: {
    label: "Home",
    route: "/",
    page: <HomeTab />,
  },
  intro: {
    label: "Introduction",
    route: "intro",
    page: <IntroTab />,
  },
  images: {
    label: "Images",
    route: "images",
    page: <ImagesTab />,
  },
  reels: {
    label: "Reels",
    route: "reels",
    page: <ReelsTab />,
  },
};

const ProfilePage = () => {
  const { query } = useRouter();
  const [profile, setProfile] = useState<ProfileDto | undefined | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { session } = useSession();

  useEffect(() => {
    setLoading(true);
    if (query && query.userName) {
      const username: any = query.userName !== 'me'
        ? query.userName
        : session?.user.userName || ""

      getProfile(username as string)
        .then((res) => setProfile(res.result))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [query]);

  return (
    <ProtectedRoute>
      <div className={styles.profileLayout}>
        {isMobile ? <ProfileMobileAppBar profile={profile} /> : <Header />}
        <div className={styles.profile}>
          <BaseContainer className={styles.container}>
            {loading ? (
              <ProfileSkeleton />
            ) : (
              profile && (
                <>
                  <ProfileInfo {...profile} />
                  <ProfileTabView tabs={tabs} />
                </>
              )
            )}
          </BaseContainer>
        </div>
        <div className={styles.subPageContain}>
          <BaseContainer className={styles.overwriteContainer}>
            <div className={styles.insideContainer}>
              <div className={styles.wrap}>
                {
                  tab1s[
                    (query && query.tab
                      ? query.tab
                      : "home") as keyof typeof tab1s
                  ].page
                }
              </div>
              {(!query || !query.tab) && !isMobile && (
                <div className={styles.rightSidebar}>abc</div>
              )}
            </div>
          </BaseContainer>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;
